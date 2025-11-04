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

		// Fire-and-forget sync to Convex; failure is logged but shouldn't break the page.
		void persistTallySubmissions(responses);

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
