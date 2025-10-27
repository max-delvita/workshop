"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@workshop/backend/convex/_generated/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Linkedin, Search } from "lucide-react";

export default function ParticipantsPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const participants = useQuery(api.participants.getAll);

	// Filter participants based on search query
	const filteredParticipants = useMemo(() => {
		if (!participants) return [];
		if (!searchQuery.trim()) return participants;

		const query = searchQuery.toLowerCase();
		return participants.filter(
			(p) =>
				p.firstName.toLowerCase().includes(query) ||
				p.lastName.toLowerCase().includes(query)
		);
	}, [participants, searchQuery]);

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
					{filteredParticipants.map((participant) => (
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
