import { getContext } from "@/lib/context";
import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { db } from "@/lib/db";
import { Chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { type Message } from "ai";
import { Chatmessages } from "@/lib/db/schema";



export async function POST(req: Request) {
  const { messages, chat_id } = await req.json();
  const _chats = await db
    .select()
    .from(Chats)
    .where(eq(Chats.chat_id, chat_id));

  if (_chats.length != 1) {
    return NextResponse.json({ message: "Chat not found" }, { status: 404 });
  }

  const filekey = _chats[0].file_key;
  const last_message = messages[messages.length - 1];
  const context = await getContext(last_message.content, filekey);
  console.log("context", context);

  await db.insert(Chatmessages).values({
    chat_id: chat_id,
    content: last_message.content,
    role: "user",
  });

  // Filter all previous user messages
  const filteredMessages = messages.filter(
    (message: Message) => message.role === "user"
  );

  const result = streamText({
    model: groq("llama3-8b-8192"),
    messages: [
      {
        role: "system",
        content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
        The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
        AI is a well-behaved and well-mannered individual.
        AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
        AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
        AI assistant is a big fan of Pinecone and Vercel.
        START CONTEXT BLOCK
        ${context}
        END OF CONTEXT BLOCK
        AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
        If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
        AI assistant will not apologize for previous responses, but instead will indicate new information was gained.
        AI assistant will not invent anything that is not drawn directly from the context.`,
      },
      ...filteredMessages,
    ],
    onFinish: async (completion) => {
      await db.insert(Chatmessages).values({
        chat_id: chat_id,
        content: completion.text,
        role: "system",
      });
    },
  });

  return result.toDataStreamResponse();
}
