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
			// Fetch LinkedIn profile data using our LinkedIn Agent Service
			const linkedinAgentUrl = process.env.LINKEDIN_AGENT_URL || 'http://localhost:3002';

			console.log("Fetching LinkedIn profiles via LinkedIn Agent Service...");

			// Call the LinkedIn Agent Service to fetch profiles
			const agentResponse = await fetch(`${linkedinAgentUrl}/fetch-profiles`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					profileUrls: [
						participant1.linkedinProfile,
						participant2.linkedinProfile
					]
				})
			});

			if (!agentResponse.ok) {
				const errorText = await agentResponse.text();
				throw new Error(`LinkedIn Agent Service error (${agentResponse.status}): ${errorText}`);
			}

			const { success, profiles } = await agentResponse.json();

			if (!success || !profiles || profiles.length !== 2) {
				throw new Error("Failed to fetch both LinkedIn profiles from agent service");
			}

			const [profile1Data, profile2Data] = profiles;

			if (!profile1Data || !profile2Data) {
				throw new Error("One or both profiles returned null from agent service");
			}

			console.log("LinkedIn profiles fetched successfully via agent service");

			// Format profile data for AI analysis
			const formatProfile = (profile: any) => {
				return `
Name: ${profile.full_name || 'Unknown'}
Headline: ${profile.headline || 'N/A'}
Location: ${profile.city ? `${profile.city}, ${profile.country}` : 'N/A'}
Summary: ${profile.summary || 'N/A'}

Experience:
${profile.experiences?.map((exp: any) => `- ${exp.title} at ${exp.company} (${exp.starts_at?.year || 'N/A'} - ${exp.ends_at?.year || 'Present'})`).join('\n') || 'N/A'}

Education:
${profile.education?.map((edu: any) => `- ${edu.degree_name || 'Degree'} in ${edu.field_of_study || 'N/A'} from ${edu.school} (${edu.starts_at?.year || 'N/A'} - ${edu.ends_at?.year || 'N/A'})`).join('\n') || 'N/A'}

Skills:
${profile.skills?.join(', ') || 'N/A'}

Languages:
${profile.languages?.join(', ') || 'N/A'}

Certifications:
${profile.accomplishment_courses?.map((cert: any) => cert.name).join(', ') || 'N/A'}
`;
			};

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
				prompt: `Analyze these two LinkedIn profiles and provide a detailed connection analysis:

===== PERSON 1 =====
${formatProfile(profile1Data)}

===== PERSON 2 =====
${formatProfile(profile2Data)}

Please provide:
1. A list of commonalities (shared connections, interests, background, skills, education, location, etc.)
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
