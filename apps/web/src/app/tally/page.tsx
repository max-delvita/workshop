import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTallyInsights } from "@/lib/get-tally-insights";
import { ChatWidget } from "@/components/chat-widget";
import { fetchQuery } from "convex/nextjs";
import { api } from "@workshop/backend/convex/_generated/api";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
	dateStyle: "medium",
	timeStyle: "short",
});

const BAR_COLORS = [
	"bg-purple-500",
	"bg-blue-500",
	"bg-pink-500",
	"bg-amber-500",
	"bg-emerald-500",
] as const;

const DEFAULT_FORM_ID = "wor9ON";

export const revalidate = 300;

export const metadata = {
	title: "Tally Insights | Workshop",
	description: "Aggregated responses and AI commentary from the workshop Tally form.",
};

function formatDate(iso?: string) {
	if (!iso) {
		return "Not yet submitted";
	}

	try {
		return dateFormatter.format(new Date(iso));
	} catch {
		return iso;
	}
}

export default async function TallyPage() {
	const insights = await getTallyInsights();

	// Fetch chat data for the AI interface - fallback to empty if Convex is unavailable
	const formId = process.env.TALLY_FORM_ID ?? DEFAULT_FORM_ID;
	let chatData: Array<{ question: string; answer: string; type: string; submissionId: string }> = [];

	try {
		chatData = await fetchQuery(api.tally.getAllAnswersForChat, { formId });
	} catch (error) {
		console.error("Failed to fetch chat data from Convex, chat will be unavailable:", error);
	}

	if (insights.kind === "error") {
		return (
			<div className="container mx-auto max-w-6xl px-4 py-12">
				<div className="mx-auto max-w-2xl text-center">
					<h1 className="text-4xl font-bold tracking-tight">Tally Insights</h1>
					<p className="mt-4 text-muted-foreground">
						We ran into an issue loading the latest responses: {insights.message}
					</p>
					<p className="mt-2 text-muted-foreground">
						Verify your Tally API credentials and try again.
					</p>
				</div>
			</div>
		);
	}

	const { aggregated, summary, model } = insights;
	const { totals, questions } = aggregated;

	return (
		<div className="container mx-auto max-w-6xl px-4 py-12">
			<header className="mb-10 space-y-4 text-center">
				<h1 className="text-4xl font-bold tracking-tight">Tally Insights</h1>
				<p className="text-muted-foreground">
					Live snapshot of submissions for form <code className="rounded bg-muted px-2 py-1 text-sm">wor9ON</code>.
				</p>
			</header>

			<section className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle>Total submissions</CardTitle>
						<CardDescription>All completed responses pulled from the Tally API.</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-4xl font-semibold">{totals.submissions}</p>
						<p className="text-sm text-muted-foreground">
							{totals.completedSubmissions} marked complete
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Tracked questions</CardTitle>
						<CardDescription>Distinct prompts answered across responses.</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-4xl font-semibold">{totals.questionCount}</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Latest submission</CardTitle>
						<CardDescription>UTC timestamp of the most recent response.</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-lg font-medium">{formatDate(totals.lastSubmittedAt)}</p>
					</CardContent>
				</Card>
			</section>

			<section className="mt-10">
				<Card>
					<CardHeader>
						<CardTitle>AI Commentary</CardTitle>
						<CardDescription>
							Summary generated with the Vercel AI SDK{model ? ` (${model})` : ""}.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-lg leading-relaxed text-foreground">{summary}</p>
					</CardContent>
				</Card>
			</section>

			<section className="mt-10 space-y-6">
				<h2 className="text-2xl font-semibold">Question breakdown</h2>

				{questions.length === 0 ? (
					<Card>
						<CardHeader>
							<CardTitle>No responses yet</CardTitle>
							<CardDescription>
								Submit the form to see per-question trends and insights.
							</CardDescription>
						</CardHeader>
					</Card>
				) : (
					questions.map((question) => (
						<Card key={question.key}>
							<CardHeader>
								<CardTitle>{question.label}</CardTitle>
								<CardDescription>
									Answered {question.responseCount} time{question.responseCount === 1 ? "" : "s"}
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								{question.numericSummary && (
									<div>
										<p className="text-sm text-muted-foreground">Numeric summary</p>
										<ul className="mt-1 text-sm">
											<li>Average: <span className="font-medium">{question.numericSummary.average}</span></li>
											<li>Range: <span className="font-medium">{question.numericSummary.min}</span> – <span className="font-medium">{question.numericSummary.max}</span></li>
										</ul>
									</div>
								)}

								{question.topChoices && (
									<div>
										<p className="text-sm text-muted-foreground">Top selections</p>
										<div className="mt-2 space-y-3">
											{question.topChoices.map((choice, index) => {
												const color = BAR_COLORS[index % BAR_COLORS.length];
												const width = choice.percentage > 0 ? Math.max(choice.percentage, 4) : 0;

												return (
													<div key={choice.value}>
														<div className="flex items-center justify-between text-sm font-medium">
															<span>{choice.value}</span>
															<span className="text-muted-foreground">
																{choice.count} · {choice.percentage}%
															</span>
														</div>
														<div className="mt-1 h-2 rounded-full bg-muted">
															<div
																className={`h-full rounded-full ${color}`}
																style={{ width: `${width}%` }}
															/>
														</div>
													</div>
												);
											})}
										</div>
									</div>
								)}

								{question.booleanBreakdown && (
									<div>
										<p className="text-sm text-muted-foreground">Boolean breakdown</p>
										<div className="mt-2 space-y-3">
											{question.booleanBreakdown.map((entry, index) => {
												const color = BAR_COLORS[index % BAR_COLORS.length];
												const width = entry.percentage > 0 ? Math.max(entry.percentage, 4) : 0;

												return (
													<div key={entry.value}>
														<div className="flex items-center justify-between text-sm font-medium">
															<span>{entry.value}</span>
															<span className="text-muted-foreground">
																{entry.count} · {entry.percentage}%
															</span>
														</div>
														<div className="mt-1 h-2 rounded-full bg-muted">
															<div
																className={`h-full rounded-full ${color}`}
																style={{ width: `${width}%` }}
															/>
														</div>
													</div>
												);
											})}
										</div>
									</div>
								)}

								{question.textSamples && (
									<div>
										<p className="text-sm text-muted-foreground">Sample responses</p>
										<ul className="mt-1 space-y-2 text-sm">
											{question.textSamples.map((sample, index) => (
												<li key={`${question.key}-sample-${index}`} className="rounded border bg-muted/40 px-3 py-2">
													{sample}
												</li>
											))}
										</ul>
									</div>
								)}
							</CardContent>
						</Card>
					))
				)}
			</section>

			<footer className="mt-12 text-center text-xs text-muted-foreground">
				Data refreshes every 5 minutes. Re-run the page to pick up latest submissions.
			</footer>

			<ChatWidget chatData={chatData} />
		</div>
	);
}
