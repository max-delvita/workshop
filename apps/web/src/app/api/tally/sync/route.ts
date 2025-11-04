import { NextResponse } from "next/server";

import { aggregateTallyResponses } from "@/lib/tally-analytics";
import { fetchFormResponses } from "@/lib/tally";
import { persistTallySubmissions } from "@/lib/persist-tally";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
	const secret = process.env.TALLY_SYNC_TOKEN;

	if (secret) {
		const authHeader = request.headers.get("authorization") ?? "";
		const token = authHeader.replace(/^Bearer\s+/i, "").trim();

		if (token !== secret) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}
	}

		try {
			const responses = await fetchFormResponses();
			const persisted = await persistTallySubmissions(responses);
			const aggregated = aggregateTallyResponses(responses);

			if (!persisted) {
				return NextResponse.json(
					{
						ok: false,
						error:
							"Persist step skipped. Ensure NEXT_PUBLIC_CONVEX_URL (or CONVEX_URL) is set and Convex is reachable.",
						totals: aggregated.totals,
					},
					{ status: 500 },
				);
			}

			return NextResponse.json({
				ok: true,
				persisted,
				totals: aggregated.totals,
			});
	} catch (error) {
		console.error("[tally.sync] failed to backfill submissions", error);
		return NextResponse.json(
			{
				ok: false,
				error:
					error instanceof Error
						? error.message
						: "Unexpected error while syncing Tally submissions.",
			},
			{ status: 500 },
		);
	}
}
