import React from "react";
import type { Message } from "@ai-sdk/react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Props = {
  messages: Message[],
  isPending:boolean;
};

const MessagesList = ({ messages,isPending }: Props) => {
  console.log("messages", messages);

  if (isPending){
    return(
      <div className="abosulte top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="w-6 h-6 animate-spin"/>
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-2 px-4">
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={cn("flex", {
              "justify-end pl-10": message.role === "user",
              "justify-start pr-10": message.role === "assistant",
            })}
          >
            <div
              className={cn(
                "rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10",
                {
                  "bg-blue-600 text-white": message.role === "user",
                  "bg-gray-200": message.role === "assistant",
                }
              )}
            >
              <p>{message.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessagesList;
