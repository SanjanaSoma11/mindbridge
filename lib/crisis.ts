/**
 * Crisis detection — hard-coded and cannot be disabled.
 * "It's a thermometer, not medicine" — we detect and point to real help.
 */

const CRISIS_PATTERNS = [
  // Suicidal ideation
  /\b(kill myself|killing myself|end my life|end it all|take my own life)\b/i,
  /\b(suicide|suicidal|want to die|wanna die|ready to die)\b/i,
  /\b(don'?t want to (be here|exist|live|wake up))\b/i,
  /\b(no reason to (live|go on|continue))\b/i,
  /\b(better off (dead|without me|if i was gone))\b/i,

  // Self-harm
  /\b(hurt myself|hurting myself|cutting myself|self.?harm)\b/i,
  /\b(overdose|od on)\b/i,

  // Hopelessness + intent signals
  /\b(nothing to live for)\b/i,
  /\b(plan to (die|kill|end))\b/i,
  /\b(goodbye (forever|note|letter))\b/i,
  /\b(i('?ve| have) a plan)\b/i, // context: plan to hurt self
];

export function detectCrisis(text: string): boolean {
  return CRISIS_PATTERNS.some((pattern) => pattern.test(text));
}

/** Web URLs work in all environments; sites offer click-to-call / text where supported */
export const CRISIS_RESOURCES = [
  {
    title: "988 Suicide & Crisis Lifeline",
    subtitle: "Call, text, or chat — 24/7, free, confidential",
    url: "https://988lifeline.org/",
    primary: true,
  },
  {
    title: "Crisis Text Line",
    subtitle: "Text HOME to 741741 or use web chat",
    url: "https://www.crisistextline.org/",
    primary: true,
  },
  {
    title: "Crisis centres & helplines (worldwide)",
    subtitle: "IASP directory by country or region",
    url: "https://www.iasp.info/crisis-centres-helplines/",
    primary: false,
  },
];
