"use node";
// @ts-nocheck

import { action } from "./_generated/server";
import { v } from "convex/values";
import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { internal } from "./_generated/api";

// Action to analyze connection between two participants using Vercel AI SDK
export const analyzeConnection = action({
	args: {
		participant1Id: v.id("participants"),
		participant2Id: v.id("participants"),
	},
	handler: async (ctx, args) => {
		// Get participant data
		const participant1 = await ctx.runQuery(internal.participants.getById, {
			id: args.participant1Id,
		});
		const participant2 = await ctx.runQuery(internal.participants.getById, {
			id: args.participant2Id,
		});

		if (!participant1 || !participant2) {
			throw new Error("One or both participants not found");
		}

		try {
			// Use Vercel AI SDK with Anthropic provider
			const result = await generateText({
				model: anthropic("claude-sonnet-4-20250514"),
				system: `You are a professional networking analyst. Your task is to analyze LinkedIn profiles and identify:
1. Common connections and mutual contacts
2. Shared interests, skills, or professional backgrounds
3. Potential collaboration opportunities
4. Conversation starters and networking recommendations
5. Common groups, companies, or educational institutions

Be specific, actionable, and focus on creating meaningful professional connections.`,
				prompt: `Analyze the LinkedIn profiles for these two professionals and provide a detailed connection analysis:

Person 1:
- Name: ${participant1.firstName} ${participant1.lastName}
- LinkedIn: ${participant1.linkedinProfile}

Person 2:
- Name: ${participant2.firstName} ${participant2.lastName}
- LinkedIn: ${participant2.linkedinProfile}

Please provide:
1. A list of commonalities (shared connections, interests, background, etc.)
2. Specific recommendations for how they can connect meaningfully
3. Suggested conversation starters based on their profiles

Format your response as JSON with these keys:
{
  "commonalities": ["list", "of", "common", "points"],
  "recommendations": "detailed recommendations paragraph",
  "conversationStarters": ["starter 1", "starter 2", "starter 3"]
}`,
			});

			const response = result.text;

			// Parse the AI response
			let analysisData;
			try {
				// Try to extract JSON from the response
				const jsonMatch = response.match(/\{[\s\S]*\}/);
				if (jsonMatch) {
					analysisData = JSON.parse(jsonMatch[0]);
				} else {
					// Fallback if no JSON found
					analysisData = {
						commonalities: ["Unable to extract specific commonalities"],
						recommendations: response,
						conversationStarters: [],
					};
				}
			} catch (parseError) {
				console.error("Failed to parse AI response:", parseError);
				analysisData = {
					commonalities: ["Analysis completed"],
					recommendations: response,
					conversationStarters: [],
				};
			}

			// Save the analysis to database
			const connectionId = await ctx.runMutation(internal.connections.insertConnection, {
				participant1Id: args.participant1Id,
				participant2Id: args.participant2Id,
				analysis: response,
				commonalities: analysisData.commonalities,
				recommendations: analysisData.recommendations,
				createdAt: Date.now(),
			});

			return {
				success: true,
				connectionId,
				analysis: response,
				commonalities: analysisData.commonalities,
				recommendations: analysisData.recommendations,
				conversationStarters: analysisData.conversationStarters || [],
			};
		} catch (error) {
			console.error("Error analyzing connection:", error);
			throw new Error(
				`Failed to analyze connection: ${error instanceof Error ? error.message : "Unknown error"}`
			);
		}
	},
});
