"use client";

import { useState } from "react";
import Link from "next/link";

const menuLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="px-6 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Hamburger menu button (always visible per wireframe) */}
            <button
              type="button"
              className="p-2 -ml-2 text-text-primary hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="material-symbols-outlined">
                {isMenuOpen ? "close" : "menu"}
              </span>
            </button>

            {/* Center: Logo / Brand */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2"
              onClick={() => setIsMenuOpen(false)}
            >
              <span
                className="text-3xl md:text-4xl lg:text-5xl text-text-primary hover:text-accent transition-colors whitespace-nowrap"
                style={{ fontFamily: "var(--font-display)" }}
              >
                maura maura studio
              </span>
            </Link>

            {/* Right: Search + Cart icons */}
            <div className="flex items-center gap-2 md:gap-4">
              <button
                type="button"
                className="p-2 text-text-primary hover:text-accent transition-colors"
                aria-label="Search"
              >
                <span className="material-symbols-outlined">search</span>
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
          <div className="flex items-center justify-between h-16 md:h-20 px-6 border-b border-border">
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
