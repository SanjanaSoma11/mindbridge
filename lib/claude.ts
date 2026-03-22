/**
 * AI API wrapper (Groq).
 * Falls back to mock responses when GROQ_API_KEY is not set,
 * so the app works out-of-the-box in demo mode.
 */

import { ChatMessage, CheckinExtraction } from "@/types";
import {
  buildChatSystemPrompt,
  EXTRACTION_SYSTEM_PROMPT,
  SUMMARY_SYSTEM_PROMPT,
} from "./prompts";
import { detectCrisis } from "./crisis";

// ─── Mock response logic ──────────────────────────────────────────────────────

function mockSentiment(text: string): number {
  const lower = text.toLowerCase();
  if (/great|amazing|excited|happy|love|wonderful|fantastic/.test(lower))
    return 5;
  if (/good|well|okay|fine|nice|better|managed/.test(lower)) return 4;
  if (/tired|busy|okay|meh|alright|so-so/.test(lower)) return 3;
  if (
    /sad|alone|lonely|drained|anxious|worried|hard|rough|stressed/.test(lower)
  )
    return 2;
  if (
    /hopeless|stuck|terrible|awful|horrible|can't|never|worst|nothing/.test(
      lower
    )
  )
    return 1;
  return 3;
}

function mockTags(text: string): string[] {
  const lower = text.toLowerCase();
  const tags: string[] = [];
  if (/class|exam|homework|assignment|grade|study|deadline|professor/.test(lower)) tags.push("academic");
  if (/sleep|tired|insomnia|rest|exhausted/.test(lower)) tags.push("sleep");
  if (/alone|lonely|isolated|no one|friend|people|social/.test(lower)) tags.push("loneliness");
  if (/family|mom|dad|parent|sibling|home/.test(lower)) tags.push("family");
  if (/money|financial|rent|afford|broke|job/.test(lower)) tags.push("financial");
  if (/job|career|internship|future|work|interview/.test(lower)) tags.push("career");
  if (/sick|health|body|eating|pain/.test(lower)) tags.push("health");
  if (/overwhelm|too much|stress|pressure|stuck|can't handle/.test(lower)) tags.push("overwhelm");
  if (/loss|grief|died|death|miss/.test(lower)) tags.push("grief");
  if (/identity|gender|sexuality|who i am/.test(lower)) tags.push("identity");
  return tags.slice(0, 3);
}

const MOCK_RESPONSES_BY_SENTIMENT: Record<number, string[]> = {
  5: [
    "That's really good to hear. What's been making things click lately?",
    "Sounds like you're in a good place right now. What's been helping?",
  ],
  4: [
    "Glad things are going okay. What's been keeping you grounded?",
    "Busy but managing — that's a real skill. What does a good day look like for you right now?",
  ],
  3: [
    "Somewhere in the middle can be its own kind of tired. How have you been taking care of yourself?",
    "That makes sense. Is there anything you're looking forward to this week?",
  ],
  2: [
    "That sounds like a lot to carry. What's been weighing on you most?",
    "I hear you. It sounds like things have felt heavy lately. What's been on your mind?",
    "Drained is real. Is there anyone around you who knows you're feeling this way?",
  ],
  1: [
    "That sounds really hard. You don't have to hold all of that alone — talking to someone can help.",
    "I hear that. When everything feels like too much, connecting with a counselor — even once — can make a difference.",
    "Thank you for sharing that. I want to make sure you know there are people who want to help.",
  ],
};

function mockChatResponse(text: string, sentiment: number): string {
  const options = MOCK_RESPONSES_BY_SENTIMENT[sentiment] ?? MOCK_RESPONSES_BY_SENTIMENT[3];
  return options[Math.floor(Math.random() * options.length)];
}

// ─── Extraction fallback (no API key) ────────────────────────────────────────

function mockExtraction(
  text: string,
  workloadHint?: string | null
): CheckinExtraction {
  let sentiment_score = mockSentiment(text);
  const tags = [...mockTags(text)];
  if (
    workloadHint &&
    /heavy|crushing|48 hours:\s*[4-9]|next 48 hours:\s*[4-9]/i.test(
      workloadHint
    )
  ) {
    sentiment_score = Math.min(sentiment_score, 3);
    if (!tags.includes("academic")) tags.unshift("academic");
    if (!tags.includes("overwhelm")) tags.push("overwhelm");
  }
  const crisis_flag = detectCrisis(text);
  const ai_response = mockChatResponse(text, sentiment_score);
  return { sentiment_score, tags: tags.slice(0, 3), crisis_flag, ai_response };
}

// ─── Real AI calls (Groq) ──────────────────────────────────────────────

function isGroqConfigured(): boolean {
  return !!process.env.GROQ_API_KEY?.trim();
}

async function callGroq(
  systemPrompt: string,
  messages: ChatMessage[]
): Promise<string> {
  const { default: Groq } = await import("groq-sdk");
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const model = process.env.GROQ_MODEL?.trim() || "llama-3.3-70b-versatile";

  const chatMessages = [
    { role: "system" as const, content: systemPrompt },
    ...messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  ];

  // Retry wrapper for rate limits/flaky networks
  const maxRetries = 3;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const completion = await groq.chat.completions.create({
        messages: chatMessages,
        model: model,
        temperature: 0.7,
        max_tokens: 512,
      });

      return completion.choices[0]?.message?.content || "";
    } catch (err: any) {
      if ((err.status === 429 || err.status >= 500) && attempt < maxRetries) {
        const wait = Math.pow(2, attempt + 1) * 1000;
        console.log(`[Groq] Error ${err.status}, retrying in ${wait / 1000}s...`);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }
      throw err;
    }
  }
  throw new Error("Groq: max retries exceeded");
}

// ─── Public API ───────────────────────────────────────────────────────────────

export type ProcessCheckinOptions = {
  /** From Canvas assignment analysis — never includes journal text */
  workloadContext?: string | null;
};

/** Generate a conversational response and extract structured data from the message. */
export async function processCheckin(
  userMessage: string,
  history: ChatMessage[],
  opts?: ProcessCheckinOptions
): Promise<CheckinExtraction> {
  const hasApiKey = isGroqConfigured();
  const systemPrompt = buildChatSystemPrompt(opts?.workloadContext);

  if (!hasApiKey) {
    return mockExtraction(userMessage, opts?.workloadContext);
  }

  // 1. Get conversational response
  const conversationMessages: ChatMessage[] = [
    ...history,
    { role: "user", content: userMessage },
  ];
  const ai_response = await callGroq(
    systemPrompt,
    conversationMessages
  );

  // 2. Extract structured data
  const extractionMessages: ChatMessage[] = [
    { role: "user", content: userMessage },
  ];
  const extractionRaw = await callGroq(
    EXTRACTION_SYSTEM_PROMPT,
    extractionMessages
  );

  let extracted = { sentiment_score: 3, tags: [] as string[], crisis_flag: false };
  try {
    extracted = JSON.parse(extractionRaw);
  } catch {
    // If JSON parse fails, fall back to heuristics
    extracted = {
      sentiment_score: mockSentiment(userMessage),
      tags: mockTags(userMessage),
      crisis_flag: detectCrisis(userMessage),
    };
  }

  // Always run local crisis detection as a safety net
  const crisis_flag = extracted.crisis_flag || detectCrisis(userMessage);

  return {
    ai_response,
    sentiment_score: extracted.sentiment_score,
    tags: extracted.tags,
    crisis_flag,
  };
}

/** Generate a weekly summary narrative from a list of user messages. */
export async function generateWeeklySummary(
  messages: string[]
): Promise<string> {
  const hasApiKey = isGroqConfigured();

  if (!hasApiKey) {
    return "This week your check-ins showed a mix of stress and moments of steadiness. Academic pressure and feeling stretched thin came up a few times. Overall it felt like a week of carrying more than usual.";
  }

  const userContent = messages
    .map((m, i) => `Check-in ${i + 1}: "${m}"`)
    .join("\n");

  const result = await callGroq(SUMMARY_SYSTEM_PROMPT, [
    { role: "user", content: userContent },
  ]);

  return result;
}
