import React from "react";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import { Button } from "./button";
import { PlusCircleIcon } from "lucide-react";

type Props = {
    chats:DrizzleChat[]
    chat_id:number
};

export const ChatSideBar = (props: Props) => {
  return (
    <div className="w-full h-screen bg-gray-900 text-gray-200">
        <Link href="/">
        <Button className="border border-dashed border-white">
            <PlusCircleIcon className="mr-2 w-4 h-4" />
            New Chat
        </Button>
        </Link>
    </div>
  );
};
