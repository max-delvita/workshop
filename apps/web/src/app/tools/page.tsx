import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, Zap, Container, Database, Code, Github, Layers } from "lucide-react";

const tools = [
	{
		id: "claude-code",
		name: "Claude Code",
		description: "AI-powered coding assistant that helps you write, understand, and debug code with natural language interactions.",
		icon: Terminal,
		setupType: "installation",
		color: "text-orange-500",
	},
	{
		id: "warp-ai",
		name: "Warp AI",
		description: "Modern terminal with AI command suggestions, intelligent completions, and collaborative features.",
		icon: Zap,
		setupType: "installation",
		color: "text-blue-500",
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
		id: "serena-mcp",
		name: "Serena MCP",
		description: "Model Context Protocol server for enhanced AI context management and tool integration.",
		icon: Database,
		setupType: "installation",
		color: "text-purple-500",
	},
	{
		id: "context7",
		name: "Context7",
		description: "Context management tool for AI workflows, enabling better control over model inputs and outputs.",
		icon: Code,
		setupType: "installation",
		color: "text-green-500",
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
		id: "better-t-stack",
		name: "Better T-Stack",
		description: "Modern full-stack development template with TypeScript, optimized for rapid AI-assisted development.",
		icon: Layers,
		setupType: "setup",
		color: "text-indigo-500",
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

			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{tools.map((tool) => {
					const Icon = tool.icon;
					return (
						<Card key={tool.id} className="group relative overflow-hidden border-2 transition-all hover:shadow-2xl hover:scale-105">
							<CardHeader className="pb-4">
								<div className="mb-4 flex items-start justify-between">
									<div className={`rounded-xl bg-muted p-4 ${tool.color}`}>
										<Icon className="h-8 w-8" />
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
