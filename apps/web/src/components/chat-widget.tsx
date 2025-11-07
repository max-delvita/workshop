"use client";

import { MessageSquare } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { ChatInterface } from "@/components/chat-interface";

type ChatData = Array<{
	question: string;
	answer: string;
	type: string;
	submissionId: string;
}>;

type ChatWidgetProps = {
	chatData: ChatData;
};

export function ChatWidget({ chatData }: ChatWidgetProps) {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					size="lg"
					className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
					aria-label="Open chat"
				>
					<MessageSquare className="h-6 w-6" />
				</Button>
			</SheetTrigger>
			<SheetContent side="right" className="w-full sm:max-w-lg md:max-w-xl p-0 gap-0 flex flex-col h-full">
				<SheetHeader className="sr-only">
					<SheetTitle>AI Chat Assistant</SheetTitle>
					<SheetDescription>
						Chat with AI to explore the form submission data
					</SheetDescription>
				</SheetHeader>
				<div className="flex-1 min-h-0">
					<ChatInterface chatData={chatData} />
				</div>
			</SheetContent>
		</Sheet>
	);
}
