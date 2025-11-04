import "server-only";

const DEFAULT_TALLY_API_BASE = "https://api.tally.so";
const DEFAULT_TALLY_FORM_ID = "wor9ON";

type UnknownRecord = Record<string, unknown>;

interface TallyQuestionField {
	uuid?: string;
	type?: string;
	questionType?: string;
	title?: string;
}

interface TallyQuestion {
	id: string;
	title?: string;
	type?: string;
	fields?: TallyQuestionField[];
}

interface TallyResponse {
	id: string;
	questionId: string;
	answer?: unknown;
	value?: unknown;
}

interface TallySubmission {
	id: string;
	formId: string;
	isCompleted?: boolean;
	submittedAt?: string;
	createdAt?: string;
	updatedAt?: string;
	responses?: TallyResponse[];
}

interface TallySubmissionsResponse {
	page?: number;
	limit?: number;
	hasMore?: boolean;
	questions?: TallyQuestion[];
	submissions?: TallySubmission[];
}

export interface NormalizedTallyAnswer {
	key: string;
	label: string;
	type: string;
	value: string | number | string[] | boolean | null;
}

export interface NormalizedTallyResponse {
	id: string;
	formId?: string;
	submittedAt?: string;
	completed?: boolean;
	answers: NormalizedTallyAnswer[];
}

export class TallyApiError extends Error {
	constructor(message: string, public status: number) {
		super(message);
		this.name = "TallyApiError";
	}
}

function getApiKey() {
	const apiKey = process.env.TALLY_API_KEY;

	if (!apiKey) {
		throw new Error("Missing TALLY_API_KEY environment variable.");
	}

	return apiKey;
}

function getBaseUrl() {
	return process.env.TALLY_API_BASE ?? DEFAULT_TALLY_API_BASE;
}

function getFormId(override?: string) {
	return override ?? process.env.TALLY_FORM_ID ?? DEFAULT_TALLY_FORM_ID;
}

function extractQuestionMetadata(question: TallyQuestion | undefined) {
	if (!question) {
		return {
			label: "Unknown question",
			type: "text",
		};
	}

	const primaryField = question.fields?.[0];

	return {
		label: primaryField?.title ?? question.title ?? question.id,
		type: primaryField?.questionType ?? question.type ?? "text",
	};
}

function normalizeAnswer(
	response: TallyResponse,
	question: TallyQuestion | undefined,
): NormalizedTallyAnswer | null {
	const key = response.questionId ?? response.id;

	if (!key) {
		return null;
	}

	const { label, type } = extractQuestionMetadata(question);
	const rawValue = response.answer ?? response.value ?? null;
	const value = coerceValue(rawValue);

	return {
		key,
		label,
		type,
		value,
	};
}

function coerceValue(raw: unknown): string | number | string[] | boolean | null {
	if (raw === null || raw === undefined) {
		return null;
	}

	if (typeof raw === "string" || typeof raw === "number" || typeof raw === "boolean") {
		return raw;
	}

	if (Array.isArray(raw)) {
		return raw
			.map((entry) => {
				if (entry === null || entry === undefined) {
					return null;
				}
				if (typeof entry === "string") {
					return entry;
				}
				if (typeof entry === "number" || typeof entry === "boolean") {
					return String(entry);
				}
				if (typeof entry === "object" && entry !== null) {
					if ("label" in entry && typeof (entry as UnknownRecord).label === "string") {
						return String((entry as UnknownRecord).label);
					}
					if ("text" in entry && typeof (entry as UnknownRecord).text === "string") {
						return String((entry as UnknownRecord).text);
					}
				}
				return JSON.stringify(entry);
			})
			.filter((entry): entry is string => Boolean(entry));
	}

	if (typeof raw === "object") {
		const record = raw as UnknownRecord;
		if (typeof record.text === "string") {
			return record.text;
		}
		if (typeof record.label === "string") {
			return record.label;
		}
		if (typeof record.value === "string" || typeof record.value === "number" || typeof record.value === "boolean") {
			return record.value as string | number | boolean;
		}
	}

	return JSON.stringify(raw);
}

function normalizeSubmission(
	submission: TallySubmission,
	questionMap: Map<string, TallyQuestion>,
): NormalizedTallyResponse {
	const answers =
		submission.responses
			?.map((response) => normalizeAnswer(response, questionMap.get(response.questionId)))
			.filter((answer): answer is NormalizedTallyAnswer => Boolean(answer)) ?? [];

	return {
		id: submission.id,
		formId: submission.formId,
		submittedAt: submission.submittedAt ?? submission.updatedAt ?? submission.createdAt,
		completed: submission.isCompleted,
		answers,
	};
}

async function safeParseError(response: Response) {
	try {
		const data = (await response.json()) as UnknownRecord;
		if (typeof data.message === "string") {
			return data.message;
		}

		if (typeof data.error === "string") {
			return data.error;
		}

		return JSON.stringify(data);
	} catch {
		return response.statusText || "Unknown error";
	}
}

export interface TallyFetchOptions {
	formId?: string;
	startPage?: number;
}

export async function fetchFormResponses(options: TallyFetchOptions = {}) {
	const apiKey = getApiKey();
	const baseUrl = getBaseUrl();
	const formId = getFormId(options.formId);

	const results: NormalizedTallyResponse[] = [];
	const questionMap = new Map<string, TallyQuestion>();

	let page = options.startPage ?? 1;
	let hasMore = true;

	while (hasMore) {
		const searchParams = new URLSearchParams({
			page: String(page),
		});

		const response = await fetch(
			`${baseUrl}/forms/${formId}/submissions?${searchParams.toString()}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${apiKey}`,
					Accept: "application/json",
				},
				cache: "no-store",
			},
		);

		if (!response.ok) {
			const errorMessage = await safeParseError(response);
			throw new TallyApiError(
				`Failed to fetch Tally responses (status ${response.status}): ${errorMessage}`,
				response.status,
			);
		}

		const payload = (await response.json()) as TallySubmissionsResponse;

		payload.questions?.forEach((question) => {
			questionMap.set(question.id, question);
		});

		payload.submissions?.forEach((submission) => {
			results.push(normalizeSubmission(submission, questionMap));
		});

		if (payload.hasMore) {
			page += 1;
		} else {
			hasMore = false;
		}
	}

	return results;
}
