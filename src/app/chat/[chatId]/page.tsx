import { db } from "@/lib/db";
import { Chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { eq } from "drizzle-orm";
import { ChatSideBar } from "@/components/ui/ChatSideBar";

type Props = {
  params: {
    chatId: string;
  };
};

const page = async ({params}: Props) => {
  const { userId } = await auth();
  if (!auth) {
    return redirect("/");
  }
  const _chats = await db
    .select()
    .from(Chats)
    .where(eq(Chats.user_id, userId!));
  if (!_chats) {
    return redirect("/");
  }
  if (!_chats.find((chat) => chat.chat_id === parseInt(params.chatId))) {
    return redirect("/");
  }

  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">
        <div className="flex-[1] max-w-xs bg-red-400 ">
          <ChatSideBar chats={_chats} chat_id={parseInt(params.chatId)}/>
        </div>

        <div className="max-h-screen p-4 overflow-scroll flex-[5] bg-blue-600">
          {/* pdf view component */}
        </div>

        <div className="flex-[3] border-l-4 border-l-slate-200 bg-yellow-400">
          {/* chat box component */}
        </div>
      </div>
    </div>
  );
};

export default page;
