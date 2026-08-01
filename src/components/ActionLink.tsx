"use client";

type Props = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  /** Shown as a tooltip while the link isn't set yet. */
  pendingTitle?: string;
};

/**
 * An external link that degrades gracefully: when `href` is empty it renders
 * the same-looking element but does nothing (no navigation, no blank tab).
 * Handy while the salon's Fresha links aren't configured yet.
 */
export default function ActionLink({
  href,
  children,
  className = "",
  pendingTitle = "Coming soon",
}: Props) {
  if (!href) {
    return (
      <a
        href="#"
        aria-disabled="true"
        title={pendingTitle}
        onClick={(e) => e.preventDefault()}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
