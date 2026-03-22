import type { ReactNode } from "react";

function cn(...parts: (string | undefined | false)[]) {
  return parts.filter(Boolean).join(" ");
}

export type PageHeaderProps = {
  title: string;
  subtitle?: ReactNode;
  /** Renders on the right (e.g. decorative emoji). Enables split layout. */
  end?: ReactNode;
  /** Auth-style: centered title + subtitle (use under a centered emoji block). */
  centered?: boolean;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

/**
 * Shared page title block — uses `page-title` / `page-subtitle` from globals.css.
 */
export default function PageHeader({
  title,
  subtitle,
  end,
  centered = false,
  className,
  titleClassName,
  subtitleClassName,
}: PageHeaderProps) {
  if (centered) {
    return (
      <header className={cn("text-center", className)}>
        <h1 className={cn("page-title mt-5", titleClassName)}>{title}</h1>
        {subtitle != null && (
          <p className={cn("page-subtitle mx-auto mt-2", subtitleClassName)}>
            {subtitle}
          </p>
        )}
      </header>
    );
  }

  if (end != null) {
    return (
      <header
        className={cn("page-header flex items-start justify-between gap-4", className)}
      >
        <div className="min-w-0">
          <h1 className={cn("page-title", titleClassName)}>{title}</h1>
          {subtitle != null && (
            <p className={cn("page-subtitle mt-1", subtitleClassName)}>{subtitle}</p>
          )}
        </div>
        {end}
      </header>
    );
  }

  return (
    <header className={cn("page-header", className)}>
      <h1 className={cn("page-title", titleClassName)}>{title}</h1>
      {subtitle != null && (
        <p className={cn("page-subtitle", subtitleClassName)}>{subtitle}</p>
      )}
    </header>
  );
}
