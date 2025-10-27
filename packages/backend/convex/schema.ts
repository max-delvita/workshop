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
});
