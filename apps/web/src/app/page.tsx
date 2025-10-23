import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock } from "lucide-react";

export default function Home() {
	return (
		<div className="container mx-auto max-w-5xl px-4 py-10">
			{/* Hero Section */}
			<section className="mb-16 text-center">
				<h1 className="mb-6 text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
					Context Engineering for AI Product Managers
				</h1>
				<p className="mb-4 text-2xl font-medium text-muted-foreground">
					TGB Masterclass
				</p>
				<div className="flex flex-wrap justify-center gap-6 text-base text-muted-foreground mb-8">
					<div className="flex items-center gap-2">
						<Calendar className="h-5 w-5 text-purple-500" />
						<span className="font-medium">Saturday, November 8, 2025</span>
					</div>
					<div className="flex items-center gap-2">
						<Clock className="h-5 w-5 text-purple-500" />
						<span className="font-medium">10:00 AM - 12:30 PM GMT+8</span>
					</div>
					<div className="flex items-center gap-2">
						<MapPin className="h-5 w-5 text-purple-500" />
						<span className="font-medium">SQ Collective, Singapore</span>
					</div>
				</div>
				<div className="flex justify-center gap-4">
					<Button asChild size="lg">
						<Link href="/tools">View Setup Guide</Link>
					</Button>
					<Button asChild variant="outline" size="lg">
						<a href="https://lu.ma/mu67ynky" target="_blank" rel="noopener noreferrer">
							Event Details
						</a>
					</Button>
				</div>
			</section>

			{/* Pre-work Notice */}
			<Card className="mb-12 border-2 border-purple-500 bg-purple-50/50 dark:bg-purple-950/10">
				<CardHeader>
					<CardTitle className="text-2xl">⚡ Important: Pre-Workshop Setup</CardTitle>
					<CardDescription className="text-base">
						Please complete the tool installations before the workshop
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="mb-4">
						To make the most of our hands-on session, you'll need to have several tools installed and configured.
						Please visit the <Link href="/tools" className="font-medium text-primary underline underline-offset-4">Tools page</Link> for
						detailed setup instructions.
					</p>
					<p className="text-sm text-muted-foreground">
						Don't forget to bring your laptop! We'll have wifi and plug points available.
					</p>
				</CardContent>
			</Card>

			{/* What You'll Learn */}
			<section className="mb-16">
				<h2 className="mb-8 text-4xl font-bold">What You'll Learn</h2>
				<div className="grid gap-6 md:grid-cols-2">
					<Card className="border-l-4 border-l-purple-600 hover:shadow-lg transition-shadow">
						<CardHeader>
							<CardTitle className="text-xl">🧠 Context Engineering Fundamentals</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-base text-muted-foreground">
								Understand the core principles of how AI models process and utilize context
							</p>
						</CardContent>
					</Card>
					<Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
						<CardHeader>
							<CardTitle className="text-xl">🧩 AI Models Deep Dive</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-base text-muted-foreground">
								Learn how AI models use context, memory, and tools to solve problems
							</p>
						</CardContent>
					</Card>
					<Card className="border-l-4 border-l-purple-600 hover:shadow-lg transition-shadow">
						<CardHeader>
							<CardTitle className="text-xl">💻 Hands-on with AI Coding</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-base text-muted-foreground">
								Get practical experience with modern AI coding environments and model context protocols
							</p>
						</CardContent>
					</Card>
					<Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
						<CardHeader>
							<CardTitle className="text-xl">🛠️ Build a Functional Prototype</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-base text-muted-foreground">
								Turn a simple idea into a working prototype using AI coding tools
							</p>
						</CardContent>
					</Card>
					<Card className="border-l-4 border-l-purple-600 hover:shadow-lg transition-shadow">
						<CardHeader>
							<CardTitle className="text-xl">🔄 Reproducible Workflows</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-base text-muted-foreground">
								Move from "vibe coding" to structured, reproducible development workflows
							</p>
						</CardContent>
					</Card>
					<Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
						<CardHeader>
							<CardTitle className="text-xl">🚀 Ship Faster</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-base text-muted-foreground">
								Learn techniques to accelerate your development process with AI assistance
							</p>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Workshop Format */}
			<section className="mb-16">
				<h2 className="mb-8 text-4xl font-bold">Workshop Format</h2>
				<Card className="border-2">
					<CardContent className="pt-8">
						<p className="mb-4 text-lg">
							This is a hands-on, in-person masterclass for Product Managers, Designers, Marketers,
							and Leaders who want to go beyond prompting and start building full-stack applications with AI.
						</p>
						<p className="text-muted-foreground">
							We'll start with a quick overview of concepts, then spend most of the time building together:
							turning a simple idea into a working prototype using real AI dev tools.
						</p>
					</CardContent>
				</Card>
			</section>

			{/* Agenda */}
			<section className="mb-16">
				<h2 className="mb-8 text-4xl font-bold">Agenda</h2>
				<Card className="border-2 bg-purple-50/30 dark:bg-purple-950/10">
					<CardContent className="pt-8">
						<div className="space-y-5">
							<div className="flex gap-6">
								<div className="w-28 font-bold text-lg text-purple-600">9:00 AM</div>
								<div className="text-lg">Early setup (if you need help) and networking</div>
							</div>
							<div className="flex gap-6">
								<div className="w-28 font-bold text-lg text-purple-600">10:00 AM</div>
								<div className="text-lg">Kickoff and intro</div>
							</div>
							<div className="flex gap-6">
								<div className="w-28 font-bold text-lg text-purple-600">10:20 AM</div>
								<div className="text-lg">Setup and Tools</div>
							</div>
							<div className="flex gap-6">
								<div className="w-28 font-bold text-lg text-purple-600">10:45 AM</div>
								<div className="text-lg">Workshop</div>
							</div>
							<div className="flex gap-6">
								<div className="w-28 font-bold text-lg text-purple-600">11:45 AM</div>
								<div className="text-lg">Demos</div>
							</div>
							<div className="flex gap-6">
								<div className="w-28 font-bold text-lg text-purple-600">12:00 PM</div>
								<div className="text-lg">Closing</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>

			{/* Instructor Bio */}
			<section className="mb-16">
				<h2 className="mb-8 text-4xl font-bold">Masterclass Instructor</h2>
				<Card className="border-2 border-purple-500">
					<CardHeader>
						<CardTitle className="text-2xl">Max Del Vita</CardTitle>
						<CardDescription className="text-base">CEO & Co-founder, Symplehost.ai</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-base leading-relaxed text-muted-foreground">
							Max Del Vita is the CEO and co-founder of{" "}
							<a
								href="https://symplehost.ai"
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium text-primary underline underline-offset-4"
							>
								Symplehost.ai
							</a>
							, a platform empowering vacation rental owners with AI-driven guest experiences.
							Previously, he served as Chief Product Officer at Bubblegum and MoneySmart, scaling teams
							and launching successful digital products in the insurance and fintech sectors. An accomplished
							entrepreneur and product leader, Max has a proven track record in building high-growth startups
							and innovative solutions across Asia and Europe.
						</p>
						<div className="mt-4">
							<a
								href="https://www.linkedin.com/in/mdelvita/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm font-medium text-primary underline underline-offset-4"
							>
								Connect on LinkedIn →
							</a>
						</div>
					</CardContent>
				</Card>
			</section>

			{/* About TGB */}
			<section>
				<h2 className="mb-6 text-3xl font-bold">About The Generative Beings</h2>
				<Card>
					<CardContent className="pt-6">
						<p className="mb-4">
							<strong>The Generative Beings (TGB)</strong> is Asia's premier GenAI community of 10,000+
							Generative AI founders, leaders, builders, and experts.
						</p>
						<p className="mb-4 text-sm text-muted-foreground">
							This masterclass is hosted at the <strong>TGB GenAI Lab</strong> - Singapore's physical GenAI
							community hub where founders and builders connect to accelerate Generative AI breakthroughs,
							powered by The Generative Beings and SQ Collective.
						</p>
						<div className="flex flex-wrap gap-4">
							<a
								href="https://thegenerativebeings.com/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm font-medium text-primary underline underline-offset-4"
							>
								Website
							</a>
							<a
								href="https://t.me/tgbcommunity"
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm font-medium text-primary underline underline-offset-4"
							>
								Telegram
							</a>
							<a
								href="https://www.linkedin.com/company/the-generative-beings/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm font-medium text-primary underline underline-offset-4"
							>
								LinkedIn
							</a>
							<a
								href="https://x.com/tgbeings"
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm font-medium text-primary underline underline-offset-4"
							>
								X (Twitter)
							</a>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	);
}
