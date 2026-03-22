export type BrandIconSize =
  | "nav"
  | "hero"
  | "auth"
  | "chat"
  | "embedButton"
  | "loading";

const sizeClass: Record<BrandIconSize, string> = {
  nav: "h-9 w-[1.85rem]",
  hero: "h-32 w-28 md:h-40 md:w-[8.75rem]",
  auth: "h-14 w-12",
  chat: "h-7 w-6",
  embedButton: "h-5 w-[1.125rem]",
  loading: "h-5 w-[1.125rem]",
};

export type BrandIconProps = {
  size: BrandIconSize;
  /** Extra classes; use `tone` for white on green buttons. */
  className?: string;
  /** `inverse`: white mark (e.g. on accent button). Default: forest green on page bg. */
  tone?: "brand" | "inverse";
};

/**
 * Lowercase serif “m” outline — no rectangular background; uses `currentColor`.
 */
function MarkSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <text
        x="32"
        y="56"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="48"
        fontWeight="400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      >
        m
      </text>
    </svg>
  );
}

export default function BrandIcon({
  size,
  className,
  tone = "brand",
}: BrandIconProps) {
  const color =
    tone === "inverse" ? "text-white" : "text-brand-600";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${color} ${sizeClass[size]} ${className ?? ""}`}
    >
      <MarkSvg className="h-full w-full" />
    </span>
  );
}
