import type { Metadata } from "next";
import { Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClientRoot } from "@/components/ClientRoot";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/** High-contrast Didone-style display (Calben-style); swap for licensed Calben files in `public/fonts` if needed. */
const calbenDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MindBridge — Student Wellbeing Check-ins",
  description:
    "A private, student-controlled mental health check-in companion. MindBridge is a thermometer, not medicine.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${openSans.variable} ${calbenDisplay.variable}`}>
      <body
        className={`${openSans.className} min-h-screen bg-brand-100 text-brand-600 antialiased`}
      >
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
