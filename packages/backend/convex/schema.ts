import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	todos: defineTable({
		text: v.string(),
		completed: v.boolean(),
	}),
	participants: defineTable({
		firstName: v.string(),
		lastName: v.string(),
		linkedinImage: v.string(),
		email: v.string(),
		linkedinProfile: v.string(),
	}),
	connections: defineTable({
		participant1Id: v.id("participants"),
		participant2Id: v.id("participants"),
		analysis: v.string(),
		commonalities: v.array(v.string()),
		recommendations: v.string(),
		createdAt: v.number(),
	}),
});
