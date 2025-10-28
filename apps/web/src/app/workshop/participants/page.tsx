"use client";

import { useState, useMemo } from "react";
import { useQuery, useAction } from "convex/react";
import { api } from "@workshop/backend/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Linkedin, Search, Users, ArrowRight } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { Doc, Id } from "@workshop/backend/convex/_generated/dataModel";

export default function ParticipantsPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedParticipant1, setSelectedParticipant1] = useState<string>("");
	const [selectedParticipant2, setSelectedParticipant2] = useState<string>("");
	const [isAnalyzing, setIsAnalyzing] = useState(false);
	const [analysisResult, setAnalysisResult] = useState<any>(null);

	const participants = useQuery(api.participants.getAll);
	const analyzeConnection = useAction(api.analyzeConnection.analyzeConnection);

	// Filter participants based on search query
	const filteredParticipants = useMemo(() => {
		if (!participants) return [];
		if (!searchQuery.trim()) return participants;

		const query = searchQuery.toLowerCase();
		return participants.filter(
			(p: Doc<"participants">) =>
				p.firstName.toLowerCase().includes(query) ||
				p.lastName.toLowerCase().includes(query)
		);
	}, [participants, searchQuery]);

	// Get selected participant objects
	const participant1 = participants?.find((p: Doc<"participants">) => p._id === selectedParticipant1);
	const participant2 = participants?.find((p: Doc<"participants">) => p._id === selectedParticipant2);

	// Check if both participants are selected
	const canConnect = selectedParticipant1 && selectedParticipant2 && selectedParticipant1 !== selectedParticipant2;

	const handleConnect = async () => {
		if (!canConnect) return;

		setIsAnalyzing(true);
		setAnalysisResult(null);

		try {
			const result = await analyzeConnection({
				participant1Id: selectedParticipant1 as Id<"participants">,
				participant2Id: selectedParticipant2 as Id<"participants">,
			});
			setAnalysisResult(result);
			setIsAnalyzing(false);
		} catch (error) {
			console.error("Error analyzing connection:", error);
			setIsAnalyzing(false);
		}
	};

	return (
		<div className="container mx-auto max-w-7xl px-4 py-10">
			{/* Header Section */}
			<div className="mb-12">
				<h1 className="mb-6 text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
					Workshop Participants
				</h1>
				<p className="text-xl text-muted-foreground">
					Meet the amazing people joining this workshop
				</p>
			</div>

			{/* Connection Finder Section */}
			<Card className="mb-12 border-2 border-purple-500">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-2xl">
						<Users className="h-6 w-6" />
						LinkedIn Connection Finder
					</CardTitle>
					<CardDescription>
						Select two participants to discover their connections and networking opportunities
					</CardDescription>
				</CardHeader>
				<CardContent>
					{/* Two Column Layout for Participant Selection */}
					<div className="grid gap-6 md:grid-cols-2 mb-6">
						{/* Left Column - Participant 1 */}
						<div className="space-y-4">
							<div>
								<label className="text-sm font-medium mb-2 block">
									First Participant
								</label>
								<Select value={selectedParticipant1} onValueChange={setSelectedParticipant1}>
									<SelectTrigger>
										<SelectValue placeholder="Select a participant..." />
									</SelectTrigger>
									<SelectContent>
										{participants?.map((p: Doc<"participants">) => (
											<SelectItem
												key={p._id}
												value={p._id}
												disabled={p._id === selectedParticipant2}
											>
												{p.firstName} {p.lastName}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							{/* Selected Participant 1 Card */}
							{participant1 && (
								<Card className="border-purple-200">
									<CardHeader className="pb-3">
										<div className="flex items-center justify-center">
											<div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-purple-500/20">
												<img
													src={participant1.linkedinImage}
													alt={`${participant1.firstName} ${participant1.lastName}`}
													className="h-full w-full object-cover"
													onError={(e) => {
														const target = e.target as HTMLImageElement;
														target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
															participant1.firstName + " " + participant1.lastName
														)}&background=a855f7&color=fff&size=200`;
													}}
												/>
											</div>
										</div>
									</CardHeader>
									<CardContent className="text-center">
										<h3 className="text-lg font-semibold mb-2">
											{participant1.firstName} {participant1.lastName}
										</h3>
										<Button
											variant="ghost"
											size="sm"
											onClick={() =>
												window.open(participant1.linkedinProfile, "_blank")
											}
										>
											<Linkedin className="mr-2 h-4 w-4" />
											View Profile
										</Button>
									</CardContent>
								</Card>
							)}
						</div>

						{/* Right Column - Participant 2 */}
						<div className="space-y-4">
							<div>
								<label className="text-sm font-medium mb-2 block">
									Second Participant
								</label>
								<Select value={selectedParticipant2} onValueChange={setSelectedParticipant2}>
									<SelectTrigger>
										<SelectValue placeholder="Select a participant..." />
									</SelectTrigger>
									<SelectContent>
										{participants?.map((p: Doc<"participants">) => (
											<SelectItem
												key={p._id}
												value={p._id}
												disabled={p._id === selectedParticipant1}
											>
												{p.firstName} {p.lastName}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							{/* Selected Participant 2 Card */}
							{participant2 && (
								<Card className="border-purple-200">
									<CardHeader className="pb-3">
										<div className="flex items-center justify-center">
											<div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-purple-500/20">
												<img
													src={participant2.linkedinImage}
													alt={`${participant2.firstName} ${participant2.lastName}`}
													className="h-full w-full object-cover"
													onError={(e) => {
														const target = e.target as HTMLImageElement;
														target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
															participant2.firstName + " " + participant2.lastName
														)}&background=a855f7&color=fff&size=200`;
													}}
												/>
											</div>
										</div>
									</CardHeader>
									<CardContent className="text-center">
										<h3 className="text-lg font-semibold mb-2">
											{participant2.firstName} {participant2.lastName}
										</h3>
										<Button
											variant="ghost"
											size="sm"
											onClick={() =>
												window.open(participant2.linkedinProfile, "_blank")
											}
										>
											<Linkedin className="mr-2 h-4 w-4" />
											View Profile
										</Button>
									</CardContent>
								</Card>
							)}
						</div>
					</div>

					{/* Connect Button */}
					<div className="flex justify-center mb-6">
						<Button
							size="lg"
							disabled={!canConnect || isAnalyzing}
							onClick={handleConnect}
							className="w-full md:w-auto"
						>
							{isAnalyzing ? (
								<>
									<Loader2 className="mr-2 h-5 w-5 animate-spin" />
									Analyzing Connection...
								</>
							) : (
								<>
									<Users className="mr-2 h-5 w-5" />
									Connect
									<ArrowRight className="ml-2 h-5 w-5" />
								</>
							)}
						</Button>
					</div>

					{/* Analysis Results */}
					{analysisResult && (
						<div className="space-y-4 border-t pt-6">
							<div className="text-center mb-4">
								<h3 className="text-xl font-bold text-green-600">
									✓ Connection Analysis Complete
								</h3>
							</div>

							<div className="grid gap-4 md:grid-cols-2">
								{/* Commonalities */}
								<Card>
									<CardHeader>
										<CardTitle className="text-lg">Common Ground</CardTitle>
									</CardHeader>
									<CardContent>
										<ul className="space-y-2">
											{analysisResult.commonalities?.map((item: string, idx: number) => (
												<li key={idx} className="flex items-start gap-2">
													<span className="text-purple-600">•</span>
													<span>{item}</span>
												</li>
											))}
										</ul>
									</CardContent>
								</Card>

								{/* Conversation Starters */}
								<Card>
									<CardHeader>
										<CardTitle className="text-lg">Conversation Starters</CardTitle>
									</CardHeader>
									<CardContent>
										<ul className="space-y-2">
											{analysisResult.conversationStarters?.map((item: string, idx: number) => (
												<li key={idx} className="flex items-start gap-2">
													<span className="text-purple-600">💬</span>
													<span>{item}</span>
												</li>
											))}
										</ul>
									</CardContent>
								</Card>
							</div>

							{/* Recommendations */}
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">Networking Recommendations</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed">
										{analysisResult.recommendations}
									</p>
								</CardContent>
							</Card>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Search Bar */}
			<div className="mb-8">
				<div className="relative max-w-md">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						type="text"
						placeholder="Search by name..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-10"
					/>
				</div>
			</div>

			{/* Loading State */}
			{participants === undefined ? (
				<div className="flex justify-center py-20">
					<Loader2 className="h-8 w-8 animate-spin text-purple-600" />
				</div>
			) : filteredParticipants.length === 0 ? (
				/* Empty State */
				<div className="flex flex-col items-center justify-center py-20 text-center">
					<p className="text-xl text-muted-foreground">
						{searchQuery
							? "No participants found matching your search"
							: "No participants yet"}
					</p>
					{searchQuery && (
						<Button
							variant="outline"
							onClick={() => setSearchQuery("")}
							className="mt-4"
						>
							Clear search
						</Button>
					)}
				</div>
			) : (
				/* Participants Grid */
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{filteredParticipants.map((participant: Doc<"participants">) => (
						<Card
							key={participant._id}
							className="group relative overflow-hidden border-2 transition-all hover:shadow-xl hover:scale-105"
						>
							<CardHeader className="pb-3">
								<div className="flex items-center justify-center">
									<div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-purple-500/20">
										<img
											src={participant.linkedinImage}
											alt={`${participant.firstName} ${participant.lastName}`}
											className="h-full w-full object-cover"
											onError={(e) => {
												// Fallback to a placeholder if image fails to load
												const target = e.target as HTMLImageElement;
												target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
													participant.firstName + " " + participant.lastName
												)}&background=a855f7&color=fff&size=200`;
											}}
										/>
									</div>
								</div>
							</CardHeader>
							<CardContent className="text-center">
								<h3 className="mb-3 text-lg font-semibold">
									{participant.firstName} {participant.lastName}
								</h3>
								<Button
									variant="outline"
									size="sm"
									className="w-full"
									onClick={() =>
										window.open(participant.linkedinProfile, "_blank")
									}
								>
									<Linkedin className="mr-2 h-4 w-4" />
									View LinkedIn
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			)}

			{/* Results Counter */}
			{participants && participants.length > 0 && (
				<div className="mt-8 text-center text-sm text-muted-foreground">
					Showing {filteredParticipants.length} of {participants.length}{" "}
					participant{participants.length !== 1 ? "s" : ""}
				</div>
			)}
		</div>
	);
}
