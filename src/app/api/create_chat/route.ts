import { loadS3intopinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Chats } from "@/lib/db/schema";
import { getS3Url } from "@/lib/s3";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request, res: Response) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({
      error: "Unauthorized",
      status: 401,
    });
  }
  try {
    const body = await req.json();
    const { filekey, file_name } = body;
    console.log(filekey, file_name);
    await loadS3intopinecone(filekey);
    const chat_id = await db
      .insert(Chats)
      .values({
        file_key: filekey,
        pdf_name: file_name,
        pdf_url: getS3Url(filekey),
        user_id: userId,
      })
      .returning({
        inserted_id: Chats.chat_id,
      });
    return NextResponse.json(
      {
        chat_id: chat_id[0].inserted_id,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Internal Server Error!! ",
      status: 500,
    });
  }
}
