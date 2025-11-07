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
	tallySubmissions: defineTable({
		formId: v.string(),
		submissionId: v.string(),
		submittedAt: v.optional(v.number()),
		completed: v.boolean(),
		syncedAt: v.number(),
		respondentName: v.optional(v.string()),
		respondentLinkedIn: v.optional(v.string()),
	})
		.index("by_form_submission", ["formId", "submissionId"])
		.index("by_form_synced", ["formId", "syncedAt"]),
	tallyAnswers: defineTable({
		submissionId: v.id("tallySubmissions"),
		questionId: v.string(),
		label: v.string(),
		type: v.string(),
		valueString: v.optional(v.string()),
		valueNumber: v.optional(v.number()),
		valueBoolean: v.optional(v.boolean()),
		valueList: v.optional(v.array(v.string())),
	}).index("by_submission", ["submissionId"]).index("by_question", ["questionId"]),
});
