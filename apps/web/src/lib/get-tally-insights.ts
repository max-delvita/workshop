import type { AggregatedTallyData } from "./tally-analytics";
import { aggregateTallyResponses } from "./tally-analytics";
import { fetchFormResponses } from "./tally";
import { generateTallySummary } from "./tally-summary";
import { persistTallySubmissions } from "./persist-tally";

export type TallyInsightsResult =
	| {
			kind: "success";
			aggregated: AggregatedTallyData;
			summary: string;
			model?: string;
	  }
	| {
			kind: "error";
			message: string;
	  };

export async function getTallyInsights(): Promise<TallyInsightsResult> {
	try {
		const responses = await fetchFormResponses();

		// Persist to Convex and wait for completion
		try {
			const persistResult = await persistTallySubmissions(responses);
			if (persistResult) {
				console.log(
					`Successfully synced ${persistResult.total} submissions to Convex (${persistResult.inserted} new, ${persistResult.updated} updated, ${persistResult.skipped} skipped)`
				);
			}
		} catch (convexError) {
			// Log but don't fail the page if Convex sync fails
			console.error("Failed to sync to Convex, but continuing with page render:", convexError);
		}

		const aggregated = aggregateTallyResponses(responses);
		const { summary, model } = await generateTallySummary(aggregated);

		return {
			kind: "success",
			aggregated,
			summary,
			model,
		};
	} catch (error) {
		console.error("Unable to load Tally insights.", error);
		return {
			kind: "error",
			message:
				error instanceof Error
					? error.message
					: "Unexpected error encountered while loading Tally responses.",
		};
	}
}
