#!/usr/bin/env node
/**
 * Script to check statistics about Tally data in Convex database
 *
 * Usage:
 *   cd packages/backend
 *   npx tsx scripts/check-tally-stats.ts
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
	console.log(`Form ID: ${FORM_ID}\n`);

	const client = new ConvexHttpClient(CONVEX_URL);

	try {
		// Get all submissions with their answers
		const results = await client.query(api.tally.getRecentSummaries, {
			formId: FORM_ID,
			limit: 1000, // Get all
		});

		console.log(`📊 Database Statistics:`);
		console.log(`  Total submissions: ${results.length}`);

		let totalAnswers = 0;
		let minAnswers = Infinity;
		let maxAnswers = 0;
		const answerCounts: { [key: number]: number } = {};

		// Count unique questions
		const uniqueQuestions = new Set<string>();

		for (const result of results) {
			const answerCount = result.answers.length;
			totalAnswers += answerCount;
			minAnswers = Math.min(minAnswers, answerCount);
			maxAnswers = Math.max(maxAnswers, answerCount);
			answerCounts[answerCount] = (answerCounts[answerCount] || 0) + 1;

			// Track unique questions
			result.answers.forEach(answer => {
				uniqueQuestions.add(answer.questionId);
			});
		}

		console.log(`  Total answers: ${totalAnswers}`);
		console.log(`  Average answers per submission: ${(totalAnswers / results.length).toFixed(2)}`);
		console.log(`  Min answers in a submission: ${minAnswers}`);
		console.log(`  Max answers in a submission: ${maxAnswers}`);
		console.log(`  Unique questions: ${uniqueQuestions.size}\n`);

		console.log(`📈 Distribution of answers per submission:`);
		Object.keys(answerCounts)
			.map(Number)
			.sort((a, b) => a - b)
			.forEach(count => {
				const submissions = answerCounts[count];
				const bar = "█".repeat(Math.ceil(submissions / 2));
				console.log(`  ${count} answers: ${bar} (${submissions} submissions)`);
			});

		// Show question labels
		console.log(`\n📝 Questions being stored:`);
		const questionLabels = new Map<string, string>();
		for (const result of results) {
			for (const answer of result.answers) {
				if (!questionLabels.has(answer.questionId)) {
					questionLabels.set(answer.questionId, answer.label);
				}
			}
		}

		Array.from(questionLabels.entries()).forEach(([id, label]) => {
			console.log(`  - ${label} (${id})`);
		});

	} catch (error) {
		console.error("\n✗ Failed to fetch stats:");
		console.error(error);
		process.exit(1);
	}
}

main();
