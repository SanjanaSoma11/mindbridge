"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isEmbed = pathname?.startsWith("/embed") ?? false;
  const isCanvasDemo = pathname?.startsWith("/demo/canvas") ?? false;
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname?.startsWith("/login/") ||
    pathname?.startsWith("/register/");

  if (isCanvasDemo) {
    return <>{children}</>;
  }

  if (isAuthPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-100 px-5 py-16 text-brand-600 sm:px-8">
        {children}
      </div>
    );
  }

  if (isEmbed) {
    return (
      <div className="min-h-screen bg-brand-100 w-full overflow-x-hidden text-brand-600">
        {children}
      </div>
    );
  }

  return (
    <>
      <Nav />
      <main className="page-shell text-brand-600">{children}</main>
      <SiteFooter />
    </>
  );
}
