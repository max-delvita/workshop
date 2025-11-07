import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const DEFAULT_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
	try {
		const { messages, chatData } = await request.json();
		console.log("[Chat API] Received request with", messages?.length || 0, "messages");
		console.log("[Chat API] Received", chatData?.length || 0, "chat data items");

		const apiKey = process.env.OPENAI_API_KEY;
		if (!apiKey) {
			console.error("[Chat API] OpenAI API key not configured");
			return new Response("OpenAI API key not configured", { status: 500 });
		}

		const openai = createOpenAI({ apiKey });

		// Create context from chat data
		let systemPrompt: string;

		if (!chatData || chatData.length === 0) {
			console.warn("[Chat API] No chat data provided - responding with unavailable message");
			systemPrompt = `You are a helpful assistant. The workshop registration form data is currently unavailable due to a temporary issue.
Politely inform the user that the data cannot be accessed right now and suggest they refresh the page to try again.`;
		} else {
			const contextText = chatData
				.map((item: { question: string; answer: string }) => `Q: ${item.question}\nA: ${item.answer}`)
				.join("\n\n");

			systemPrompt = `You are a helpful assistant analyzing workshop registration form responses.
You have access to all the form submissions and can answer questions about the data.

Here is the form data:
${contextText}

When answering questions:
- Be concise and informative
- Reference specific responses when relevant
- Identify trends or patterns in the data
- If asked about something not in the data, politely say you don't have that information
- Format your responses clearly with bullet points or numbers when appropriate`;
		}

		const result = await streamText({
			model: openai(DEFAULT_MODEL),
			messages,
			system: systemPrompt,
			temperature: 0.7,
			maxTokens: 1000,
		});

		return result.toTextStreamResponse();
	} catch (error) {
		console.error("Chat API error:", error);
		return new Response(
			error instanceof Error ? error.message : "An error occurred",
			{ status: 500 },
		);
	}
}
