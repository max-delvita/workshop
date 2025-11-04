import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const answerValueSchema = {
	valueString: v.optional(v.string()),
	valueNumber: v.optional(v.number()),
	valueBoolean: v.optional(v.boolean()),
	valueList: v.optional(v.array(v.string())),
};

export const syncSubmissions = mutation({
	args: {
		formId: v.string(),
		submissions: v.array(
			v.object({
				submissionId: v.string(),
				submittedAt: v.optional(v.number()),
				completed: v.optional(v.boolean()),
				answers: v.array(
					v.object({
						questionId: v.string(),
						label: v.string(),
						type: v.string(),
						...answerValueSchema,
					}),
				),
			}),
		),
	},
	handler: async (ctx, args) => {
		let upserts = 0;
		let inserts = 0;

		for (const submission of args.submissions) {
			const existing = await ctx.db
				.query("tallySubmissions")
				.withIndex("by_form_submission", (q) =>
					q.eq("formId", args.formId).eq("submissionId", submission.submissionId),
				)
				.unique();

			const submittedAtMs = submission.submittedAt ?? null;
			const completed = submission.completed ?? false;
			const payload = {
				formId: args.formId,
				submissionId: submission.submissionId,
				submittedAt: submittedAtMs === null ? undefined : submittedAtMs,
				completed,
				syncedAt: Date.now(),
			};

			let submissionId = existing?._id;

			if (existing) {
				await ctx.db.patch(existing._id, payload);
				upserts += 1;

				const existingAnswers = await ctx.db
					.query("tallyAnswers")
					.withIndex("by_submission", (q) => q.eq("submissionId", existing._id))
					.collect();

				await Promise.all(existingAnswers.map((answer) => ctx.db.delete(answer._id)));
			} else {
				submissionId = await ctx.db.insert("tallySubmissions", payload);
				inserts += 1;
			}

			for (const answer of submission.answers) {
				if (!submissionId) continue;
				await ctx.db.insert("tallyAnswers", {
					submissionId,
					questionId: answer.questionId,
					label: answer.label,
					type: answer.type,
					valueString: answer.valueString,
					valueNumber: answer.valueNumber,
					valueBoolean: answer.valueBoolean,
					valueList: answer.valueList,
				});
			}
		}

		return {
			total: args.submissions.length,
			inserted: inserts,
			updated: upserts,
		};
	},
});

export const getRecentSummaries = query({
	args: {
		formId: v.string(),
		limit: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		const limit = args.limit ?? 10;
		const submissions = await ctx.db
			.query("tallySubmissions")
			.withIndex("by_form_synced", (q) => q.eq("formId", args.formId))
			.order("desc")
			.take(limit);

		const results = [];

		for (const submission of submissions) {
			const answers = await ctx.db
				.query("tallyAnswers")
				.withIndex("by_submission", (q) => q.eq("submissionId", submission._id))
				.collect();

			results.push({
				submission,
				answers,
			});
		}

		return results;
	},
});
