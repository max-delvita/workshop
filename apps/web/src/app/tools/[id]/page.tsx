import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, ExternalLink, AlertCircle, Play } from "lucide-react";
import { toolsData } from "@/lib/tools-data";
import { VideoModal } from "@/components/video-modal";

export function generateStaticParams() {
	return Object.keys(toolsData).map((id) => ({
		id,
	}));
}

export default async function ToolPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const tool = toolsData[id];

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
				<div className="flex flex-col sm:flex-row gap-6 items-start mb-4">
					<div className="flex-1">
						<h1 className="mb-3 text-4xl font-bold tracking-tight">{tool.name}</h1>
						<p className="mb-4 text-lg text-muted-foreground">{tool.description}</p>
						<Button asChild variant="outline">
							<a href={tool.officialSite} target="_blank" rel="noopener noreferrer">
								Official Website
								<ExternalLink className="ml-2 h-4 w-4" />
							</a>
						</Button>
					</div>

					{/* Video Tutorial */}
					{tool.videoEmbedUrl && (
						<div className="shrink-0">
							<VideoModal embedUrl={tool.videoEmbedUrl}>
								<button className="group relative overflow-hidden rounded-lg border-2 border-purple-500 bg-gradient-to-br from-purple-600 to-purple-400 transition-all hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-56">
									<div className="relative z-10 flex flex-col items-center justify-center text-white p-6">
										<div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all group-hover:scale-110 group-hover:bg-white/30">
											<Play className="h-6 w-6 fill-white" />
										</div>
										<h3 className="text-sm font-bold">Watch Setup Video</h3>
										<p className="mt-0.5 text-xs text-purple-100">Quick tutorial</p>
									</div>
									<div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/10" />
								</button>
							</VideoModal>
						</div>
					)}
				</div>
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

								{step.image && (
									<div className="overflow-hidden rounded-lg border bg-muted">
										<img
											src={step.image.src}
											alt={step.image.alt}
											className="w-full h-auto"
										/>
									</div>
								)}

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
