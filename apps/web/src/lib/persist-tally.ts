import { fetchMutation } from "convex/nextjs";
import { api } from "@workshop/backend/convex/_generated/api";

import { EXCLUDED_QUESTION_KEYS } from "./tally-analytics";
import type { NormalizedTallyAnswer, NormalizedTallyResponse } from "./tally";

const DEFAULT_FORM_ID = "wor9ON";

type StoredAnswer = {
	questionId: string;
	label: string;
	type: string;
	valueString?: string;
	valueNumber?: number;
	valueBoolean?: boolean;
	valueList?: string[];
};

function toStoredAnswer(answer: NormalizedTallyAnswer): StoredAnswer | null {
	if (EXCLUDED_QUESTION_KEYS.has(answer.key)) {
		return null;
	}

	const base = {
		questionId: answer.key,
		label: answer.label,
		type: answer.type,
	};

	const value = answer.value;

	if (value === null || value === undefined) {
		return base;
	}

	if (typeof value === "string") {
		return {
			...base,
			valueString: value,
		};
	}

	if (typeof value === "number") {
		return {
			...base,
			valueNumber: value,
		};
	}

	if (typeof value === "boolean") {
		return {
			...base,
			valueBoolean: value,
		};
	}

	if (Array.isArray(value)) {
		return {
			...base,
			valueList: value.map((entry) => String(entry)),
		};
	}

	return {
		...base,
		valueString: JSON.stringify(value),
	};
}

function serializeSubmission(submission: NormalizedTallyResponse) {
	const timestamp = submission.submittedAt ? Date.parse(submission.submittedAt) : undefined;
	const submittedAt = typeof timestamp === "number" && !Number.isNaN(timestamp) ? timestamp : undefined;

	return {
		submissionId: submission.id,
		submittedAt,
		completed: submission.completed ?? false,
		answers: submission.answers
			.map(toStoredAnswer)
			.filter((answer): answer is StoredAnswer => Boolean(answer)),
	};
}

export async function persistTallySubmissions(responses: NormalizedTallyResponse[]) {
	if (responses.length === 0) {
		return null;
	}

	const formId = process.env.TALLY_FORM_ID ?? DEFAULT_FORM_ID;
	const convexUrl =
		process.env.CONVEX_URL ??
		process.env.NEXT_PUBLIC_CONVEX_URL ??
		process.env.NEXT_PUBLIC_CONVEX_DEPLOYMENT ?? // legacy
		process.env.CONVEX_DEPLOYMENT;

	if (!convexUrl) {
		console.warn(
			"[persistTallySubmissions] Missing Convex deployment URL. Set NEXT_PUBLIC_CONVEX_URL or CONVEX_URL.",
		);
		return null;
	}

	try {
		return await fetchMutation(
			api.tally.syncSubmissions,
			{
				formId,
				submissions: responses.map(serializeSubmission),
			},
			{ url: convexUrl },
		);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : JSON.stringify(error, null, 2);
		console.error("Failed to persist Tally submissions to Convex.", message);
		throw new Error(
			`Failed to persist Tally submissions to Convex: ${message}. Ensure the Convex deployment is running and includes the latest schema (run "cd packages/backend && npx convex push").`,
		);
	}
}
