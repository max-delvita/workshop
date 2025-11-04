import "server-only";

import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

import type { AggregatedTallyData } from "./tally-analytics";

const DEFAULT_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

export interface SummaryResult {
	summary: string;
	model?: string;
}

function sanitizeInsights(insights: AggregatedTallyData) {
	return {
		totals: insights.totals,
		topQuestions: insights.questions.slice(0, 5).map((question) => ({
			label: question.label,
			responseCount: question.responseCount,
			topChoices: question.topChoices?.slice(0, 3),
			numericSummary: question.numericSummary,
			textHighlights: question.textSamples?.slice(0, 2),
		})),
	};
}

export async function generateTallySummary(insights: AggregatedTallyData): Promise<SummaryResult> {
	const apiKey = process.env.OPENAI_API_KEY;

	if (!apiKey) {
		return {
			summary: "Set OPENAI_API_KEY to enable AI-powered commentary.",
		};
	}

	const openai = createOpenAI({
		apiKey,
	});

	try {
		const { text } = await generateText({
			model: openai(DEFAULT_MODEL),
			temperature: 0.3,
			maxOutputTokens: 320,
			prompt: [
				"You are an analyst summarizing workshop registration responses.",
				"Craft a short, upbeat commentary (2-3 sentences) highlighting notable trends, recurring themes, or surprises.",
				"Avoid repeating raw numbers; interpret them instead.",
				"Data:",
				JSON.stringify(sanitizeInsights(insights)),
			].join("\n"),
		});

		return {
			summary: text.trim() || "Insight summary unavailable.",
			model: DEFAULT_MODEL,
		};
	} catch (error) {
		console.error("Failed to generate AI summary for Tally form.", error);
		return {
			summary: "Insight summary unavailable due to an AI service error.",
		};
	}
}
