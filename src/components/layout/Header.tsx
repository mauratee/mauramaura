"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DECORATIVE_ACCENTS, pickRandom } from "@/lib/decorativeAccents";

// Custom SVG icons to match reference design
function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path fillRule="evenodd" d="M23 16v2H1v-2h22zm0-10v2H1V6h22z" />
    </svg>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Picked client-side after mount so the static export's prerendered HTML
  // isn't tied to one glyph and each page load can show a different one.
  const [accent, setAccent] = useState<string | null>(null);

  useEffect(() => {
    setAccent(pickRandom(DECORATIVE_ACCENTS));
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-text-secondary">
        <div className="px-4 md:px-6">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Left: Hamburger menu button (always visible per wireframe) */}
            <button
              type="button"
              className="p-2 -ml-2 text-text-primary hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <span className="material-symbols-outlined">close</span>
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>

            {/* Center: Logo / Brand */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2"
              onClick={() => setIsMenuOpen(false)}
            >
              <span
                className="text-3xl md:text-4xl font-bold text-text-primary hover:text-accent transition-colors whitespace-nowrap"
                style={{ fontFamily: "var(--font-display)" }}
              >
                maura maura studio
              </span>
            </Link>

            {/* Right: Randomized decorative accent, balances the menu button.
                Width-capped and clipped on narrow screens so long glyphs
                can't overlap the centered logo. */}
            <span
              className="max-w-[64px] sm:max-w-[120px] md:max-w-none overflow-hidden p-2 -mr-2 text-xs sm:text-sm text-text-primary opacity-60 whitespace-nowrap"
              aria-hidden="true"
            >
              {accent}
            </span>
          </div>
        </div>
      </header>

      {/* Slide-out menu overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-out menu panel */}
      <nav
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-background border-r border-border transform transition-transform duration-200 ease-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Main navigation"
      >
        <div className="flex flex-col h-full">
          {/* Menu header with close button */}
          <div className="flex items-center justify-between h-14 md:h-16 px-4 border-b border-border">
            <span className="text-lg font-medium text-text-primary">Menu</span>
            <button
              type="button"
              className="p-2 -mr-2 text-text-primary hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Menu footer with social links */}
          <div className="flex-1 px-6 py-6 border-t border-border">
            <div className="flex flex-col gap-4 text-sm text-text-secondary">
              <a
                href="mailto:hello@mauramaura.studio"
                className="hover:text-text-primary transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
