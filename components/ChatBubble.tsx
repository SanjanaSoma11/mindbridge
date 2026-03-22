"use client";

import BrandIcon from "@/components/BrandIcon";
import { ChatMessage } from "@/types";

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      {!isUser && (
        <div className="mr-3 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center">
          <BrandIcon size="chat" />
        </div>
      )}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-base leading-relaxed ${
          isUser
            ? "bg-accent text-white rounded-br-sm"
            : "bg-brand-200/55 text-brand-600 border border-brand-600/15 rounded-bl-sm"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
