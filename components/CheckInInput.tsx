"use client";

import { useState, useRef, KeyboardEvent } from "react";

interface CheckInInputProps {
  onSend: (message: string) => void;
  loading: boolean;
  placeholder?: string;
}

export default function CheckInInput({
  onSend,
  loading,
  placeholder = "How are you doing today?",
}: CheckInInputProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    onSend(trimmed);
    setText("");
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleInput() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }

  return (
    <div className="flex items-end gap-3 bg-brand-200/50 border border-brand-600/18 rounded-2xl px-4 py-3 focus-within:border-brand-600/45 focus-within:ring-2 focus-within:ring-brand-600/10 transition-all">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        placeholder={placeholder}
        disabled={loading}
        rows={1}
        className="flex-1 resize-none bg-transparent text-brand-600 placeholder-brand-600/40 text-sm leading-relaxed focus:outline-none disabled:opacity-60"
        style={{ maxHeight: "160px", overflowY: "auto" }}
      />
      <button
        onClick={handleSend}
        disabled={!text.trim() || loading}
        className="flex-shrink-0 w-9 h-9 rounded-xl bg-accent text-white transition-colors hover:bg-accent-hover disabled:bg-brand-200/75 disabled:text-brand-600/50 flex items-center justify-center"
        aria-label="Send"
      >
        {loading ? (
          <svg
            className="animate-spin w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
