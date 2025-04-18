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
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">
              Doc Whisperer
              <SignedIn>
                <UserButton />
              </SignedIn>
            </h1>
          </div>
          <div className="flex mt-5 cursor-pointer border-red-500">
            {isAuth && firstchat &&(
                <Link href={`/chat/${firstchat.chat_id}`}><Button className="cursor-pointer ">Go to Chat</Button></Link>
            )}
           
          </div>
          <p className="max-w-xl mt-1 text-lg text-slate-600 ">
            Empower your learning and research by getting instant answers and
            insights from PDFs using AI—trusted by students, researchers, and
            professionals worldwide.
          </p>
          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <SignInButton mode="modal">
                <div>
                  <Button
                    asChild
                    className=" w-1/3 h-10 hover:bg-teal-600 transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2 justify-center">
                      Login to get started
                      <LogIn className="w-4 h-4 ml-1 " />
                    </span>
                  </Button>
                </div>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
