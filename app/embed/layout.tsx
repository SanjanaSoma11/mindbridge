import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MindBridge — Canvas support",
  description:
    "Embedded wellbeing check-in for Canvas. Your words stay private; workload context is due dates only.",
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
