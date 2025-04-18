// src/app/chat/[chatId]/page.tsx

import { db } from "@/lib/db";
import { Chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { ChatSideBar } from "@/components/ui/ChatSideBar";
import PDFViewer from "@/components/ui/PDFviewer";
import { ChatComponent } from "@/components/ui/ChatComponent";
import { chat } from "@pinecone-database/pinecone/dist/assistant/data/chat";


type Params = Promise<{
  chatId: string;
}>;

type Props = {
  params: Params;
};

export default async function Page({ params }: Props) {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const { chatId: chatIdStr } = await params;
  const chatId = Number(chatIdStr); // parse chatId safely

  const _chats = await db.select().from(Chats).where(eq(Chats.user_id, userId));

  if (!_chats.find((chat) => chat.chat_id === chatId)) {
    return redirect("/");
  }

  const currentchat = _chats.find((chat) => chat.chat_id === chatId);

  return (
    <div className="flex h-screen overflow-auto">
      <div className="flex w-full max-h-screen overflow-auto">
        {/* Sidebar */}
        <div className="flex-[2] max-w-xs ">
          <ChatSideBar chats={_chats} chatId={chatId} />
        </div>

        {/* Scrollable PDF view */}
        <div className="flex-[5] p-4 overflow-auto scrollbar-hide">
          <PDFViewer pdf_url={currentchat?.pdf_url!} />
        </div>

        {/* Chat box (static) */}
        <div className="flex-[3] border-l-4 border-l-slate-200 overflow-auto scrollbar-hide ">
          <ChatComponent chat_id={chatId}/>
        </div>
      </div>
    </div>
  );
}
