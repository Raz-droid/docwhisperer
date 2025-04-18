import { Button, buttonVariants } from "@/components/ui/button";
import { UserButton, SignedIn, SignInButton } from "@clerk/nextjs";
import FileUpload from "@/components/ui/FileUpload";
import { auth } from "@clerk/nextjs/server";
import { Heading1, LogIn } from "lucide-react";
import { db } from "@/lib/db";
import { Chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from 'next/link'



export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  let firstchat;
  if (userId) {
    const firstChat = await db
      .select()
      .from(Chats)
      .where(eq(Chats.user_id, userId));
    if (firstChat) {
      firstchat = firstChat[0];
    }
  console.log("firstchat", firstchat);
  }


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-white to-teal-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-xl">
          <div className="flex flex-col items-center space-y-8">
            {/* Header Section */}
            <div className="flex items-center space-x-4">
              <h1 className="bg-gradient-to-r from-rose-600 to-teal-600 bg-clip-text text-6xl font-bold text-transparent">
              SmartReaderAI
              </h1>
            </div>

            {/* Chat Button Section */}
            {isAuth && firstchat && (
              <div className="animate-fade-in">
                <Link href={`/chat/${firstchat.chat_id}`}>
                  <Button className="transform transition-all hover:scale-105 hover:shadow-lg cursor-pointer">
                    Continue to Chat
                  </Button>
                </Link>
              </div>
            )}

            {/* Description Section */}
            <p className="max-w-2xl text-center text-lg leading-relaxed text-slate-700">
              Empower your learning and research by getting instant answers and
              insights from PDFs using AI—trusted by students, researchers, and
              professionals worldwide.
            </p>

            {/* Upload/Login Section */}
            <div className="w-full max-w-xl">
              {isAuth ? (
                <FileUpload />
              ) : (
                <Button
                  className="group h-12 w-full transform bg-gradient-to-r from-rose-500 to-teal-500 text-lg transition-all hover:scale-[1.01] hover:shadow-lg"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Login to get started</span>
                    <LogIn className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
