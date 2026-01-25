"use client";

import { useState } from "react";
import Link from "next/link";

const menuLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

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

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10.533 17.438a6.968 6.968 0 01-6.96-6.96 6.968 6.968 0 016.96-6.96 6.968 6.968 0 016.96 6.96 6.968 6.968 0 01-6.96 6.96zm6.949-1.314a8.917 8.917 0 002.01-5.646c0-4.941-4.02-8.96-8.96-8.96-4.94 0-8.96 4.019-8.96 8.96 0 4.94 4.02 8.96 8.96 8.96 2.082 0 3.996-.72 5.52-1.916l4.962 4.96 1.415-1.413-4.947-4.945z"
      />
    </svg>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

            {/* Right: Search + Cart icons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-2 text-text-primary hover:text-accent transition-colors"
                aria-label="Search"
              >
                <SearchIcon className="w-5 h-5" />
              </button>
              <Link
                href="/cart"
                className="p-2 text-text-primary hover:text-accent transition-colors"
                aria-label="Shopping cart"
              >
                <span className="material-symbols-outlined">work</span>
              </Link>
            </div>
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

          {/* Menu links */}
          <div className="flex-1 px-6 py-8">
            <ul className="flex flex-col gap-6">
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xl text-text-primary hover:text-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu footer with social links */}
          <div className="px-6 py-6 border-t border-border">
            <div className="flex flex-col gap-4 text-sm text-text-secondary">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition-colors"
              >
                Instagram
              </a>
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
