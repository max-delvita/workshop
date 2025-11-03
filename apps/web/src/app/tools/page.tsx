import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, Zap, Container, Database, Code, Github, Layers, Play } from "lucide-react";
import { VideoModal } from "@/components/video-modal";

const tools = [
	{
		id: "warp-ai",
		name: "Warp AI",
		description: "Modern terminal with AI command suggestions, intelligent completions, and collaborative features.",
		icon: Zap,
		setupType: "installation",
		color: "text-blue-500",
	},
	{
		id: "claude-code",
		name: "Claude Code",
		description: "AI-powered coding assistant that helps you write, understand, and debug code with natural language interactions.",
		icon: Terminal,
		setupType: "installation",
		color: "text-orange-500",
	},
	{
		id: "github",
		name: "GitHub",
		description: "Version control and collaboration platform for managing code repositories and project workflows.",
		icon: Github,
		setupType: "signup",
		color: "text-gray-800 dark:text-gray-200",
	},
	{
		id: "docker",
		name: "Docker",
		description: "Containerization platform for building, shipping, and running applications in isolated environments.",
		icon: Container,
		setupType: "installation",
		color: "text-sky-500",
	},
	{
		id: "convex",
		name: "Convex",
		description: "Full-featured backend with cloud functions, database, and real-time sync engine that keeps your frontend updated automatically.",
		icon: Database,
		setupType: "installation",
		color: "text-purple-500",
	},
	{
		id: "bmad-method",
		name: "Agile AI-driven Development",
		description: "Universal AI Agent Framework for Agentic Agile Driven Development with specialized collaborative agents.",
		icon: Layers,
		setupType: "installation",
		color: "text-green-500",
	},
];

export default function ToolsPage() {
	return (
		<div className="container mx-auto max-w-7xl px-4 py-10">
			<div className="mb-12">
				<h1 className="mb-6 text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Pre-Workshop Tools</h1>
				<p className="text-xl text-muted-foreground">
					Install and configure these tools before the workshop to get the most out of our hands-on session.
					Click on each tool for detailed setup instructions.
				</p>
			</div>

			<div className="mb-12 rounded-lg border-2 border-purple-500 bg-purple-50/50 dark:bg-purple-950/10 p-6">
				<h2 className="mb-3 text-xl font-bold">⏰ Complete Setup Before November 8</h2>
				<p className="text-base text-muted-foreground">
					Some tools may take time to download and install. Please complete the setup at least a day before
					the workshop so we can troubleshoot any issues.
				</p>
			</div>

			{/* Introduction and First Setup Steps */}
			<Card className="mb-12 border-2 border-purple-500">
				<CardHeader>
					<div className="flex flex-col sm:flex-row gap-6 items-start">
						<div className="flex-1">
							<CardTitle className="text-2xl">Introduction and First Setup Steps</CardTitle>
							<CardDescription>Complete these foundational steps before installing individual tools</CardDescription>
						</div>

						{/* Video Tutorial */}
						<div className="shrink-0">
							<VideoModal embedUrl="https://supercut.ai/embed/e46912d3-4a42-4466-82c6-a886c5e16e2d/iRGuyGZnlZ98_MAreC3iPp?embed=sidebar">
								<button className="group relative overflow-hidden rounded-lg border-2 border-purple-500 bg-gradient-to-br from-purple-600 to-purple-400 transition-all hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-56">
									<div className="relative z-10 flex flex-col items-center justify-center text-white p-6">
										<div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all group-hover:scale-110 group-hover:bg-white/30">
											<Play className="h-6 w-6 fill-white" />
										</div>
										<h3 className="text-sm font-bold">Watch Setup Video</h3>
										<p className="mt-0.5 text-xs text-purple-100">2 min tutorial</p>
									</div>
									<div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/10" />
								</button>
							</VideoModal>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<ol className="space-y-4">
						<li className="flex items-start gap-3">
							<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">1</span>
							<div>
								<p className="font-semibold">Create a Work Folder</p>
								<p className="text-sm text-muted-foreground">
									Define a "work folder" where all projects will be installed and name it <strong>WORKSHOP</strong>.
									This will help keep all your workshop materials organized in one place.
								</p>
							</div>
						</li>
						<li className="flex items-start gap-3">
							<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">2</span>
							<div>
								<p className="font-semibold">Install Warp</p>
								<p className="text-sm text-muted-foreground">
									See detailed instructions in Tool #1 below
								</p>
							</div>
						</li>
						<li className="flex items-start gap-3">
							<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">3</span>
							<div>
								<p className="font-semibold">Install Claude Code</p>
								<p className="text-sm text-muted-foreground">
									See detailed instructions in Tool #2 below
								</p>
							</div>
						</li>
						<li className="flex items-start gap-3">
							<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">4</span>
							<div>
								<p className="font-semibold">Sign up for GitHub</p>
								<p className="text-sm text-muted-foreground">
									See detailed instructions in Tool #3 below
								</p>
							</div>
						</li>
						<li className="flex items-start gap-3">
							<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">5</span>
							<div>
								<p className="font-semibold">Install GitHub Desktop</p>
								<p className="text-sm text-muted-foreground">
									See detailed instructions in Tool #3 below
								</p>
							</div>
						</li>
						<li className="flex items-start gap-3">
							<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">6</span>
							<div>
								<p className="font-semibold">Install Docker and Sign Up</p>
								<p className="text-sm text-muted-foreground">
									See detailed instructions in Tool #4 below
								</p>
							</div>
						</li>
					</ol>
				</CardContent>
			</Card>

			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{tools.map((tool, index) => {
					const Icon = tool.icon;
					return (
						<Card key={tool.id} className="group relative overflow-hidden border-2 transition-all hover:shadow-2xl hover:scale-105">
							<CardHeader className="pb-4">
								<div className="mb-4 flex items-start justify-between">
									<div className="relative">
										<div className={`rounded-xl bg-muted p-4 ${tool.color}`}>
											<Icon className="h-8 w-8" />
										</div>
										<span className="absolute -top-2 -left-2 flex h-7 w-7 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white shadow-lg">
											{index + 1}
										</span>
									</div>
									<span className="rounded-full bg-purple-600 px-4 py-1.5 text-xs font-bold text-white">
										{tool.setupType === "installation" && "Install"}
										{tool.setupType === "signup" && "Sign Up"}
										{tool.setupType === "setup" && "Setup"}
									</span>
								</div>
								<CardTitle className="text-2xl">{tool.name}</CardTitle>
								<CardDescription className="line-clamp-3 text-base">{tool.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<Button asChild className="w-full text-base" size="lg" variant="outline">
									<Link href={`/tools/${tool.id}`}>
										View Setup Guide
										<ArrowRight className="ml-2 h-5 w-5" />
									</Link>
								</Button>
							</CardContent>
						</Card>
					);
				})}
			</div>

			<div className="mt-16 rounded-lg border-2 border-purple-500 bg-purple-50/30 dark:bg-purple-950/10 p-8">
				<h2 className="mb-4 text-3xl font-bold">Need Help?</h2>
				<p className="mb-4 text-lg text-muted-foreground">
					If you encounter any issues during setup, don't worry! We'll have time for troubleshooting at the
					beginning of the workshop. However, completing the setup beforehand will maximize your hands-on learning time.
				</p>
				<p className="text-base text-muted-foreground">
					For urgent questions, reach out via the{" "}
					<a
						href="https://t.me/tgbcommunity"
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium text-primary underline underline-offset-4"
					>
						TGB Telegram community
					</a>
					.
				</p>
			</div>
		</div>
	);
}
