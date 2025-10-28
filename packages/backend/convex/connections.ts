import { query, mutation, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";

// Query to get all participants
export const getAll = query({
	handler: async (ctx) => {
		return await ctx.db.query("participants").collect();
	},
});

// Query to get a specific connection analysis
export const getConnectionAnalysis = query({
	args: {
		participant1Id: v.id("participants"),
		participant2Id: v.id("participants"),
	},
	handler: async (ctx, args) => {
		// Try to find existing analysis in either direction
		const connection = await ctx.db
			.query("connections")
			.filter((q) =>
				q.or(
					q.and(
						q.eq(q.field("participant1Id"), args.participant1Id),
						q.eq(q.field("participant2Id"), args.participant2Id)
					),
					q.and(
						q.eq(q.field("participant1Id"), args.participant2Id),
						q.eq(q.field("participant2Id"), args.participant1Id)
					)
				)
			)
			.first();

		return connection;
	},
});

// Mutation to create a connection record
export const insertConnection = mutation({
	args: {
		participant1Id: v.id("participants"),
		participant2Id: v.id("participants"),
		analysis: v.string(),
		commonalities: v.array(v.string()),
		recommendations: v.string(),
		createdAt: v.number(),
	},
	handler: async (ctx, args) => {
		const connectionId = await ctx.db.insert("connections", {
			participant1Id: args.participant1Id,
			participant2Id: args.participant2Id,
			analysis: args.analysis,
			commonalities: args.commonalities,
			recommendations: args.recommendations,
			createdAt: args.createdAt,
		});
		return connectionId;
	},
});

// Internal version of insertConnection for use in actions
export const insertConnectionInternal = internalMutation({
	args: {
		participant1Id: v.id("participants"),
		participant2Id: v.id("participants"),
		analysis: v.string(),
		commonalities: v.array(v.string()),
		recommendations: v.string(),
		createdAt: v.number(),
	},
	handler: async (ctx, args) => {
		const connectionId = await ctx.db.insert("connections", {
			participant1Id: args.participant1Id,
			participant2Id: args.participant2Id,
			analysis: args.analysis,
			commonalities: args.commonalities,
			recommendations: args.recommendations,
			createdAt: args.createdAt,
		});
		return connectionId;
	},
});
