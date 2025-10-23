import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, ExternalLink, AlertCircle } from "lucide-react";
import { toolsData } from "@/lib/tools-data";

export function generateStaticParams() {
	return Object.keys(toolsData).map((id) => ({
		id,
	}));
}

export default function ToolPage({ params }: { params: { id: string } }) {
	const tool = toolsData[params.id];

	if (!tool) {
		notFound();
	}

	return (
		<div className="container mx-auto max-w-4xl px-4 py-8">
			{/* Back Button */}
			<div className="mb-6">
				<Button asChild variant="ghost" size="sm">
					<Link href="/tools">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Tools
					</Link>
				</Button>
			</div>

			{/* Header */}
			<div className="mb-8">
				<h1 className="mb-3 text-4xl font-bold tracking-tight">{tool.name}</h1>
				<p className="mb-4 text-lg text-muted-foreground">{tool.description}</p>
				<Button asChild variant="outline">
					<a href={tool.officialSite} target="_blank" rel="noopener noreferrer">
						Official Website
						<ExternalLink className="ml-2 h-4 w-4" />
					</a>
				</Button>
			</div>

			{/* Prerequisites */}
			{tool.prerequisites && tool.prerequisites.length > 0 && (
				<Card className="mb-8">
					<CardHeader>
						<CardTitle>Prerequisites</CardTitle>
						<CardDescription>Make sure you have these before starting</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className="space-y-2">
							{tool.prerequisites.map((prereq, index) => (
								<li key={index} className="flex items-start gap-2">
									<CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
									<span>{prereq}</span>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			)}

			{/* Installation Steps */}
			<div className="mb-8">
				<h2 className="mb-4 text-2xl font-bold">Installation Steps</h2>
				<div className="space-y-6">
					{tool.steps.map((step, index) => (
						<Card key={index}>
							<CardHeader>
								<CardTitle className="flex items-center gap-3">
									<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
										{index + 1}
									</span>
									{step.title}
								</CardTitle>
								{step.description && <CardDescription>{step.description}</CardDescription>}
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="leading-relaxed">{step.content}</p>

								{step.codeBlock && (
									<div className="overflow-x-auto rounded-md border bg-muted p-4">
										<pre className="text-sm">
											<code className="language-{step.codeBlock.language}">
												{step.codeBlock.code}
											</code>
										</pre>
									</div>
								)}

								{step.note && (
									<div className="flex items-start gap-2 rounded-md border border-blue-200 bg-blue-50 p-3 dark:border-blue-900 dark:bg-blue-950">
										<AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
										<p className="text-sm text-blue-900 dark:text-blue-100">{step.note}</p>
									</div>
								)}
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Troubleshooting */}
			{tool.troubleshooting && tool.troubleshooting.length > 0 && (
				<Card className="mb-8">
					<CardHeader>
						<CardTitle>Troubleshooting</CardTitle>
						<CardDescription>Common issues and solutions</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{tool.troubleshooting.map((item, index) => (
								<div key={index} className="space-y-2">
									<h4 className="font-semibold text-destructive">Issue: {item.issue}</h4>
									<p className="text-sm leading-relaxed text-muted-foreground">
										<strong>Solution:</strong> {item.solution}
									</p>
									{index < tool.troubleshooting!.length - 1 && <hr className="my-4" />}
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Next Steps */}
			{tool.nextSteps && tool.nextSteps.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle>Next Steps</CardTitle>
						<CardDescription>What to do after installation</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className="space-y-2">
							{tool.nextSteps.map((step, index) => (
								<li key={index} className="flex items-start gap-2">
									<CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
									<span>{step}</span>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			)}

			{/* Footer CTA */}
			<div className="mt-12 rounded-lg border bg-muted/50 p-6 text-center">
				<h3 className="mb-2 text-xl font-bold">Ready for the Workshop?</h3>
				<p className="mb-4 text-muted-foreground">
					Once you've completed this setup, check out the other tools.
				</p>
				<Button asChild>
					<Link href="/tools">View All Tools</Link>
				</Button>
			</div>
		</div>
	);
}
