"use client";

import BrandIcon from "@/components/BrandIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/check-in", label: "Check-in", icon: "💬" },
  { href: "/patterns", label: "Patterns", icon: "📈" },
  { href: "/impact", label: "Impact", icon: "📊" },
  { href: "/resources", label: "Resources", icon: "🔗" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-brand-600/[0.08] bg-brand-100/95 backdrop-blur-md md:relative md:border-t-0 md:bg-transparent md:backdrop-blur-none">
      <div className="mx-auto flex h-[4.5rem] max-w-[min(100%,96rem)] items-center justify-between px-6 sm:px-10 lg:px-14 xl:px-16 2xl:px-20">
        <Link
          href="/"
          className="hidden items-center gap-2.5 text-brand-600 md:flex"
        >
          <BrandIcon size="nav" />
          <span className="font-display text-xl font-medium tracking-tight md:text-2xl">
            MindBridge
          </span>
        </Link>

        <div className="flex w-full items-center justify-around md:w-auto md:justify-end md:gap-0.5">
          {links.map(({ href, label, icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`flex min-w-0 flex-col items-center gap-0.5 rounded-xl px-2.5 py-2 transition-colors md:flex-row md:gap-2 md:px-3.5 md:py-2 ${
                  active
                    ? "bg-brand-200/70 text-accent"
                    : "text-brand-600/65 hover:bg-brand-200/45 hover:text-brand-600"
                }`}
              >
                <span className="text-xl leading-none md:text-lg">{icon}</span>
                <span className="max-w-[5rem] truncate text-center text-xs font-medium leading-tight md:max-w-none md:text-sm">
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
