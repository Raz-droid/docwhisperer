"use client";
import React from "react";
import { Input } from "./input";
import { useChat } from "@ai-sdk/react";
import { Button } from "./button";
import { Send } from "lucide-react";
import MessagesList from "./MessagesList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Message } from "@ai-sdk/react";

type Props = {
  chat_id: number;
};

export const ChatComponent = ({ chat_id }: Props) => {
  const {data,isPending} = useQuery({
    queryKey: ["chat", chat_id],
    queryFn: async () => {
      const Response = await axios.post<Message[]>("/api/get-messages", {
        chat_id,
      });
      return Response.data;
    },
  });
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chat_id,
    },

    initialMessages: data || [],
  });
  React.useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="relative max-h-screen overflow-scroll " id="chatbox">
      {/* header */}
      <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
      <h3 className="text-xl font-bold">chat</h3>
      </div>
      {/* chat messages */}

      <MessagesList messages={messages} isPending={isPending} />

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 px-2 py-2 bg-white"
      >
        <div className="flex">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="ask any question...."
          />
          <Button className="bg-blue-600 ml-2">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};
