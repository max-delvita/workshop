import { cache } from "react";

import type { AggregatedTallyData } from "./tally-analytics";
import { aggregateTallyResponses } from "./tally-analytics";
import { fetchFormResponses } from "./tally";
import { generateTallySummary } from "./tally-summary";

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

async function buildInsights(): Promise<TallyInsightsResult> {
	try {
		const responses = await fetchFormResponses();
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

export const getTallyInsights = cache(buildInsights);
