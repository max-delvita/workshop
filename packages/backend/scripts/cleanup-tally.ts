#!/usr/bin/env node
/**
 * Script to clean up all Tally data from Convex database
 *
 * Usage:
 *   cd packages/backend
 *   npx tsx scripts/cleanup-tally.ts
 */

import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";

const CONVEX_URL = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL;
const FORM_ID = process.env.TALLY_FORM_ID || "wor9ON";

async function main() {
	if (!CONVEX_URL) {
		console.error("Error: CONVEX_URL or NEXT_PUBLIC_CONVEX_URL environment variable is required");
		process.exit(1);
	}

	console.log(`Connecting to Convex at: ${CONVEX_URL}`);
	console.log(`Form ID: ${FORM_ID}`);

	const client = new ConvexHttpClient(CONVEX_URL);

	console.log("\nCleaning up all Tally data...");

	try {
		const result = await client.mutation(api.tally.clearAllTallyData, {
			formId: FORM_ID,
		});

		console.log("\n✓ Cleanup completed successfully!");
		console.log(`  - Deleted ${result.deletedSubmissions} submissions`);
		console.log(`  - Deleted ${result.deletedAnswers} answers`);
	} catch (error) {
		console.error("\n✗ Cleanup failed:");
		console.error(error);
		process.exit(1);
	}
}

main();
