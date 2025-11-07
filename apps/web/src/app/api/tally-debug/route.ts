import { NextResponse } from "next/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "@workshop/backend/convex/_generated/api";

const DEFAULT_FORM_ID = "wor9ON";

export async function GET() {
	try {
		const formId = process.env.TALLY_FORM_ID ?? DEFAULT_FORM_ID;

		// Fetch recent submissions with answers
		const results = await fetchQuery(api.tally.getRecentSummaries, {
			formId,
			limit: 100,
		});

		// Collect unique questions
		const questionMap = new Map<string, { label: string; type: string; count: number }>();

		for (const result of results) {
			for (const answer of result.answers) {
				const existing = questionMap.get(answer.questionId);
				if (existing) {
					existing.count++;
				} else {
					questionMap.set(answer.questionId, {
						label: answer.label,
						type: answer.type,
						count: 1,
					});
				}
			}
		}

		// Format for display
		const questions = Array.from(questionMap.entries()).map(([id, data]) => ({
			id,
			label: data.label,
			type: data.type,
			responseCount: data.count,
		}));

		return NextResponse.json({
			totalSubmissions: results.length,
			totalAnswers: results.reduce((sum, r) => sum + r.answers.length, 0),
			questions,
		});
	} catch (error) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : "Unknown error" },
			{ status: 500 }
		);
	}
}
