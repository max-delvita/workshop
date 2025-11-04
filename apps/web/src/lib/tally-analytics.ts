import type { NormalizedTallyAnswer, NormalizedTallyResponse } from "./tally";

interface ChoiceStatistic {
	value: string;
	count: number;
	percentage: number;
}

interface NumericAccumulator {
	values: number[];
}

interface QuestionAccumulator {
	label: string;
	type: string;
	responseCount: number;
	choiceCounts: Map<string, number>;
	numeric: NumericAccumulator;
	textSamples: string[];
	booleanCounts: Map<string, number>;
}

export interface QuestionInsight {
	key: string;
	label: string;
	type: string;
	responseCount: number;
	topChoices?: ChoiceStatistic[];
	numericSummary?: {
		average: number;
		min: number;
		max: number;
	};
	booleanBreakdown?: ChoiceStatistic[];
	textSamples?: string[];
}

export interface AggregatedTallyData {
	totals: {
		submissions: number;
		completedSubmissions: number;
		lastSubmittedAt?: string;
		questionCount: number;
	};
	questions: QuestionInsight[];
}

const TEXT_SAMPLE_LIMIT = 3;
export const EXCLUDED_QUESTION_KEYS = new Set(["Wz0E5Q", "QV0WQX", "7xZL1R"]);

function isChoiceType(type: string) {
	const normalized = type.toLowerCase();
	return normalized.includes("choice") || normalized.includes("select") || normalized.includes("dropdown") || normalized.includes("checkbox") || normalized.includes("radio");
}

function isNumericType(type: string) {
	const normalized = type.toLowerCase();
	return normalized.includes("number") || normalized.includes("rating") || normalized.includes("score") || normalized.includes("scale");
}

function handleAnswer(accumulator: QuestionAccumulator, answer: NormalizedTallyAnswer) {
	const { value } = answer;

	accumulator.responseCount += 1;

	if (value === null || value === undefined) {
		return;
	}

	if (typeof value === "number") {
		accumulator.numeric.values.push(value);
		return;
	}

	if (typeof value === "boolean") {
		const key = value ? "Yes" : "No";
		const count = accumulator.booleanCounts.get(key) ?? 0;
		accumulator.booleanCounts.set(key, count + 1);
		return;
	}

	if (Array.isArray(value)) {
		for (const entry of value) {
			const normalized = (typeof entry === "string" ? entry : String(entry)).trim();
			if (!normalized) {
				continue;
			}
			const count = accumulator.choiceCounts.get(normalized) ?? 0;
			accumulator.choiceCounts.set(normalized, count + 1);
		}
		return;
	}

	if (typeof value === "string") {
		const trimmed = value.trim();
		const questionType = accumulator.type.toLowerCase();

		if (trimmed.length === 0) {
			return;
		}

		const numericCandidate = Number(trimmed);
		const shouldTreatAsNumeric =
			!Number.isNaN(numericCandidate) &&
			(trimmed === numericCandidate.toString() || isNumericType(questionType));

		if (shouldTreatAsNumeric) {
			accumulator.numeric.values.push(numericCandidate);
			return;
		}

		if (accumulator.textSamples.length < TEXT_SAMPLE_LIMIT) {
			accumulator.textSamples.push(trimmed);
		}

		if (isChoiceType(questionType)) {
			const count = accumulator.choiceCounts.get(trimmed) ?? 0;
			accumulator.choiceCounts.set(trimmed, count + 1);
		}
	}
}

function buildQuestionInsights(map: Map<string, QuestionAccumulator>): QuestionInsight[] {
	const insights: QuestionInsight[] = [];

	for (const [key, accumulator] of map) {
		const choiceCounts = Array.from(accumulator.choiceCounts.entries())
			.map(([value, count]) => ({
				value,
				count,
				percentage: normalizePercentage(count, accumulator.responseCount),
			}))
			.sort((a, b) => b.count - a.count)
			.slice(0, 5);

		const booleanBreakdown = Array.from(accumulator.booleanCounts.entries())
			.map(([value, count]) => ({
				value,
				count,
				percentage: normalizePercentage(count, accumulator.responseCount),
			}))
			.sort((a, b) => b.count - a.count);

		const numericValues = accumulator.numeric.values;
		const numericSummary =
			numericValues.length > 0
				? {
						average: Number(
							(numericValues.reduce((total, current) => total + current, 0) / numericValues.length).toFixed(2),
						),
						min: Math.min(...numericValues),
						max: Math.max(...numericValues),
					}
				: undefined;

		insights.push({
			key,
			label: accumulator.label,
			type: accumulator.type,
			responseCount: accumulator.responseCount,
			topChoices: choiceCounts.length > 0 ? choiceCounts : undefined,
			booleanBreakdown: booleanBreakdown.length > 0 ? booleanBreakdown : undefined,
			numericSummary,
			textSamples: accumulator.textSamples.length > 0 ? accumulator.textSamples : undefined,
		});
	}

	return insights.sort((a, b) => a.label.localeCompare(b.label));
}

export function aggregateTallyResponses(responses: NormalizedTallyResponse[]): AggregatedTallyData {
	const questionMap = new Map<string, QuestionAccumulator>();
	let lastSubmittedAt: string | undefined;
	let completedSubmissions = 0;

	for (const response of responses) {
		if (response.completed) {
			completedSubmissions += 1;
		}

		if (response.submittedAt) {
			if (!lastSubmittedAt || new Date(response.submittedAt) > new Date(lastSubmittedAt)) {
				lastSubmittedAt = response.submittedAt;
			}
		}

		for (const answer of response.answers) {
			if (EXCLUDED_QUESTION_KEYS.has(answer.key)) {
				continue;
			}

			const existing = questionMap.get(answer.key);

			const accumulator =
				existing ??
				{
					label: answer.label,
					type: answer.type,
					responseCount: 0,
					choiceCounts: new Map<string, number>(),
					numeric: { values: [] },
					textSamples: [],
					booleanCounts: new Map<string, number>(),
				};

			handleAnswer(accumulator, answer);
			questionMap.set(answer.key, accumulator);
		}
	}

	return {
		totals: {
			submissions: responses.length,
			completedSubmissions,
			lastSubmittedAt,
			questionCount: questionMap.size,
		},
		questions: buildQuestionInsights(questionMap),
	};
}

function normalizePercentage(count: number, total: number) {
	if (total <= 0) {
		return 0;
	}

	return Number(((count / total) * 100).toFixed(1));
}
