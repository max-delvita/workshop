import { NextResponse } from "next/server";
import { fetchFormResponses } from "@/lib/tally";

export async function GET() {
	try {
		// Fetch directly from Tally API
		const responses = await fetchFormResponses();

		if (responses.length === 0) {
			return NextResponse.json({ message: "No submissions found" });
		}

		// Collect unique questions from all responses
		const questionMap = new Map<string, { label: string; type: string; count: number }>();

		for (const response of responses) {
			for (const answer of response.answers) {
				const existing = questionMap.get(answer.key);
				if (existing) {
					existing.count++;
				} else {
					questionMap.set(answer.key, {
						label: answer.label,
						type: answer.type,
						count: 1,
					});
				}
			}
		}

		// Format for easy reading
		const questions = Array.from(questionMap.entries()).map(([id, data]) => ({
			id,
			label: data.label,
			type: data.type,
			responseCount: data.count,
		}));

		return NextResponse.json({
			totalSubmissions: responses.length,
			questions: questions.sort((a, b) => b.responseCount - a.responseCount),
		});
	} catch (error) {
		console.error("Failed to fetch Tally questions:", error);
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : "Unknown error" },
			{ status: 500 }
		);
	}
}
