import { db } from "@/lib/db";
import { Chatmessages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { chat_id } = await req.json();
  const _messages = await db
    .select()
    .from(Chatmessages)
    .where(eq(Chatmessages.chat_id, chat_id));
  return NextResponse.json(_messages);
};
