import { NextResponse } from "next/server";
import { fetchMutation } from "convex/nextjs";
import { api } from "@workshop/backend/convex/_generated/api";

const DEFAULT_FORM_ID = "wor9ON";

export async function POST() {
	try {
		const formId = process.env.TALLY_FORM_ID ?? DEFAULT_FORM_ID;

		const result = await fetchMutation(api.tally.clearAllTallyData, { formId });

		return NextResponse.json({
			success: true,
			deletedSubmissions: result.deletedSubmissions,
			deletedAnswers: result.deletedAnswers,
		});
	} catch (error) {
		console.error("Failed to clear Tally data:", error);
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : "Unknown error" },
			{ status: 500 }
		);
	}
}
