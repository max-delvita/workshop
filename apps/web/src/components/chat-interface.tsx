"use client";

import { Send, Loader2, Bot, User } from "lucide-react";
import { useRef, useEffect, useState, FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Message = {
	id: string;
	role: "user" | "assistant";
	content: string;
};

type ChatData = Array<{
	question: string;
	answer: string;
	type: string;
	submissionId: string;
}>;

type ChatInterfaceProps = {
	chatData: ChatData;
};

export function ChatInterface({ chatData }: ChatInterfaceProps) {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!input.trim() || isLoading) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			role: "user",
			content: input,
		};

		setMessages(prev => [...prev, userMessage]);
		setInput("");
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					messages: [...messages, userMessage].map(m => ({
						role: m.role,
						content: m.content,
					})),
					chatData,
				}),
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`HTTP error! status: ${response.status}: ${errorText}`);
			}

			const reader = response.body?.getReader();
			const decoder = new TextDecoder();

			if (!reader) {
				throw new Error("No response body");
			}

			let assistantMessage = "";
			const assistantId = (Date.now() + 1).toString();

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				// toTextStreamResponse() sends plain text chunks
				const chunk = decoder.decode(value, { stream: true });
				assistantMessage += chunk;

				setMessages(prev => {
					const withoutLast = prev.filter(m => m.id !== assistantId);
					return [
						...withoutLast,
						{
							id: assistantId,
							role: "assistant" as const,
							content: assistantMessage,
						},
					];
				});
			}
		} catch (err) {
			setError(err instanceof Error ? err : new Error("An error occurred"));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className="flex flex-col h-full w-full">
			{/* Chat Header */}
			<div className="border-b p-4">
				<h2 className="text-lg font-semibold flex items-center gap-2">
					<Bot className="h-5 w-5" />
					Ask about the responses
				</h2>
				<p className="text-sm text-muted-foreground mt-1">
					Chat with AI to explore the form submission data
				</p>
			</div>

			{/* Messages Container */}
			<div className="flex-1 overflow-y-auto p-4 space-y-4">
				{messages.length === 0 && (
					<div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
						<Bot className="h-12 w-12 mb-4 opacity-50" />
						{chatData.length === 0 ? (
							<>
								<p className="text-lg font-medium">Chat unavailable</p>
								<p className="text-sm mt-2">
									Unable to load form data. Please refresh the page to try again.
								</p>
							</>
						) : (
							<>
								<p className="text-lg font-medium">Start a conversation</p>
								<p className="text-sm mt-2">
									Ask questions about the workshop registration responses
								</p>
								<div className="mt-4 text-left space-y-2 text-sm">
									<p className="font-medium">Try asking:</p>
									<ul className="list-disc list-inside space-y-1 opacity-80">
										<li>What are the most common interests?</li>
										<li>Summarize the feedback</li>
										<li>How many people submitted the form?</li>
									</ul>
								</div>
							</>
						)}
					</div>
				)}

				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex gap-3 ${
							message.role === "user" ? "justify-end" : "justify-start"
						}`}
					>
						{message.role === "assistant" && (
							<div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
								<Bot className="h-5 w-5 text-primary" />
							</div>
						)}

						<div
							className={`rounded-lg px-4 py-2 max-w-[80%] ${
								message.role === "user"
									? "bg-primary text-primary-foreground"
									: "bg-muted"
							}`}
						>
							<p className="text-sm whitespace-pre-wrap">{message.content}</p>
						</div>

						{message.role === "user" && (
							<div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
								<User className="h-5 w-5" />
							</div>
						)}
					</div>
				))}

				{isLoading && (
					<div className="flex gap-3 justify-start">
						<div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
							<Bot className="h-5 w-5 text-primary" />
						</div>
						<div className="rounded-lg px-4 py-2 bg-muted">
							<Loader2 className="h-4 w-4 animate-spin" />
						</div>
					</div>
				)}

				{error && (
					<div className="rounded-lg px-4 py-2 bg-destructive/10 text-destructive text-sm">
						Error: {error.message}
					</div>
				)}

				<div ref={messagesEndRef} />
			</div>

			{/* Input Form */}
			<form
				onSubmit={handleSubmit}
				className="border-t p-4 flex gap-2"
			>
				<Input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Ask a question about the responses..."
					disabled={isLoading}
					className="flex-1"
				/>
				<Button
					type="submit"
					disabled={isLoading || !input.trim()}
					size="icon"
				>
					{isLoading ? (
						<Loader2 className="h-4 w-4 animate-spin" />
					) : (
						<Send className="h-4 w-4" />
					)}
				</Button>
			</form>
		</Card>
	);
}
