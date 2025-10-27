import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
	handler: async (ctx) => {
		return await ctx.db.query("participants").collect();
	},
});

export const create = mutation({
	args: {
		firstName: v.string(),
		lastName: v.string(),
		linkedinImage: v.string(),
		email: v.string(),
		linkedinProfile: v.string(),
	},
	handler: async (ctx, args) => {
		const newParticipantId = await ctx.db.insert("participants", {
			firstName: args.firstName,
			lastName: args.lastName,
			linkedinImage: args.linkedinImage,
			email: args.email,
			linkedinProfile: args.linkedinProfile,
		});
		return await ctx.db.get(newParticipantId);
	},
});

export const update = mutation({
	args: {
		id: v.id("participants"),
		firstName: v.optional(v.string()),
		lastName: v.optional(v.string()),
		linkedinImage: v.optional(v.string()),
		email: v.optional(v.string()),
		linkedinProfile: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const { id, ...updates } = args;
		await ctx.db.patch(id, updates);
		return await ctx.db.get(id);
	},
});

export const deleteParticipant = mutation({
	args: {
		id: v.id("participants"),
	},
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id);
		return { success: true };
	},
});
