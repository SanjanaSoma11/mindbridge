/**
 * Curated resource links matched to check-in tags.
 * MindBridge does not invent clinical advice — only links to established orgs.
 * URLs are checked periodically; prefer topic hubs when deep links move.
 */

import { Resource } from "@/types";

export const RESOURCE_MAP: Record<string, Resource[]> = {
  academic: [
    {
      title: "Stress: how to manage",
      url: "https://www.apa.org/topics/stress",
      description: "American Psychological Association — stress overview and coping ideas",
      source: "APA",
    },
    {
      title: "ASU Counseling — where to start",
      url: "https://eoss.asu.edu/counseling/services/where-to-start",
      description: "Free 24/7 Open Call & Open Chat plus telehealth for enrolled students",
      source: "ASU",
    },
    {
      title: "College & stress (Set to Go)",
      url: "https://jedfoundation.org/set-to-go/college-and-stress/",
      description: "JED Foundation — what stress looks like at school and how to get support",
      source: "JED",
    },
  ],
  loneliness: [
    {
      title: "Feeling lonely in college",
      url: "https://jedfoundation.org/resource/feeling-lonely-in-college/",
      description: "JED Foundation — building connection and when to reach out",
      source: "JED",
    },
    {
      title: "ASU Counseling Services",
      url: "https://eoss.asu.edu/counseling",
      description: "Talk with someone confidentially — same-day options available",
      source: "ASU",
    },
    {
      title: "Live Well ASU",
      url: "https://wellness.asu.edu/",
      description: "Wellness programs, workshops, and student wellbeing tools",
      source: "ASU",
    },
  ],
  sleep: [
    {
      title: "Sleep",
      url: "https://www.apa.org/topics/sleep",
      description: "APA — sleep and mental health basics",
      source: "APA",
    },
    {
      title: "About sleep (CDC)",
      url: "https://www.cdc.gov/sleep/about/index.html",
      description:
        "CDC — recommended sleep, healthy habits, and how rest ties to overall health",
      source: "CDC",
    },
    {
      title: "ASU Health Services",
      url: "https://eoss.asu.edu/health",
      description: "Medical care, telehealth, and referrals (incl. sleep-related concerns)",
      source: "ASU",
    },
  ],
  family: [
    {
      title: "Family & financial stress at home",
      url: "https://jedfoundation.org/resource/family-and-financial-stress-coping-with-money-issues-in-your-home/",
      description: "JED Foundation — tension at home, money, and emotional health",
      source: "JED",
    },
    {
      title: "Finding mental health help as a student",
      url: "https://jedfoundation.org/resource/finding-mental-health-help-as-a-college-student/",
      description: "JED Foundation — how to connect with support on or off campus",
      source: "JED",
    },
    {
      title: "ASU Counseling Services",
      url: "https://eoss.asu.edu/counseling",
      description: "Confidential support when family or home life feels overwhelming",
      source: "ASU",
    },
  ],
  financial: [
    {
      title: "Financial stress & mental health",
      url: "https://www.apa.org/topics/money",
      description: "APA — money worries, stress, and emotional health",
      source: "APA",
    },
    {
      title: "ASU Financial Aid & scholarships",
      url: "https://financialaid.asu.edu/",
      description: "Aid, scholarships, budget tools, and financial wellness planning",
      source: "ASU",
    },
    {
      title: "SAMHSA national helpline",
      url: "https://www.samhsa.gov/find-help/national-helpline",
      description: "Treatment referral and info (US) — 1-800-662-4357",
      source: "SAMHSA",
    },
  ],
  career: [
    {
      title: "ASU Career resources hub",
      url: "https://career.eoss.asu.edu/",
      description: "Explore careers, résumés, interviews, and employer connections",
      source: "ASU",
    },
    {
      title: "Anxiety: tips to manage",
      url: "https://www.apa.org/topics/anxiety",
      description: "APA — when worry about the future feels overwhelming",
      source: "APA",
    },
    {
      title: "Tips for managing anxiety",
      url: "https://jedfoundation.org/resource/tips-for-managing-and-overcoming-anxiety/",
      description: "JED Foundation — practical steps and when to get help",
      source: "JED",
    },
  ],
  health: [
    {
      title: "ASU Health Services",
      url: "https://eoss.asu.edu/health",
      description: "Medical appointments, telehealth, and urgent concerns",
      source: "ASU",
    },
    {
      title: "ASU Counseling Services",
      url: "https://eoss.asu.edu/counseling",
      description: "Mental health support integrated with your care team when needed",
      source: "ASU",
    },
    {
      title: "Sun Devil Fitness",
      url: "https://fitness.asu.edu/",
      description: "Movement, recreation, and community on campus",
      source: "ASU",
    },
  ],
  overwhelm: [
    {
      title: "Tips for managing anxiety",
      url: "https://jedfoundation.org/resource/tips-for-managing-and-overcoming-anxiety/",
      description: "JED Foundation — grounding ideas and reaching out",
      source: "JED",
    },
    {
      title: "Stress: how to manage",
      url: "https://www.apa.org/topics/stress",
      description: "APA — evidence-informed stress management",
      source: "APA",
    },
    {
      title: "ASU Counseling — crisis resources",
      url: "https://eoss.asu.edu/counseling/services/crisis",
      description: "Immediate options if you feel unsafe or in acute distress",
      source: "ASU",
    },
  ],
  grief: [
    {
      title: "Grief",
      url: "https://www.apa.org/topics/grief",
      description: "APA — understanding loss and where to find support",
      source: "APA",
    },
    {
      title: "ASU Counseling Services",
      url: "https://eoss.asu.edu/counseling",
      description: "Process loss with a counselor — free for enrolled students",
      source: "ASU",
    },
    {
      title: "Finding mental health help as a student",
      url: "https://jedfoundation.org/resource/finding-mental-health-help-as-a-college-student/",
      description: "JED Foundation — how to ask for help when everything feels heavy",
      source: "JED",
    },
  ],
  identity: [
    {
      title: "LGBTQ+ mental health",
      url: "https://jedfoundation.org/lgbtqa/",
      description: "JED Foundation — identity, belonging, and emotional safety",
      source: "JED",
    },
    {
      title: "OUT at ASU & Rainbow Coalition",
      url: "https://eoss.asu.edu/out",
      description: "Community, advocacy, and campus connection for LGBTQ+ students",
      source: "ASU",
    },
    {
      title: "Mental health of LGBTQ+ students",
      url: "https://jedfoundation.org/addressing-the-mental-health-of-lgbtq-students/",
      description: "JED Foundation — barriers to care and how schools can support you",
      source: "JED",
    },
  ],
};

/** Always shown for crisis — HTTPS so links work on laptop & mobile */
export const UNIVERSAL_RESOURCES: Resource[] = [
  {
    title: "988 Suicide & Crisis Lifeline",
    url: "https://988lifeline.org/",
    description: "Call or text 988, or use web chat — free, confidential, 24/7",
  },
  {
    title: "Crisis Text Line",
    url: "https://www.crisistextline.org/",
    description: "Text HOME to 741741 or start a chat from your browser",
  },
];

export function getResourcesForTags(tags: string[]): Resource[] {
  const seen = new Set<string>();
  const results: Resource[] = [];

  for (const tag of tags) {
    const list = RESOURCE_MAP[tag] ?? [];
    for (const r of list) {
      if (!seen.has(r.url)) {
        seen.add(r.url);
        results.push(r);
      }
      if (results.length >= 4) break;
    }
    if (results.length >= 4) break;
  }

  return results;
}
