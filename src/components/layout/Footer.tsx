export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border">
      {/* Decorative divider */}
      <div
        className="text-center py-6 text-text-secondary text-lg tracking-widest overflow-hidden"
        aria-hidden="true"
      >
        <span className="inline-block opacity-60">
          𖡼.𖤣𖥧𖡼.𖤣𖥧𖡼.𖤣𖥧𖡼.𖤣𖥧𖡼.𖤣𖥧𖡼.𖤣𖥧𖡼
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-text-secondary text-sm">
            &copy; {currentYear} maura maura studio
          </p>

          {/* Social links */}
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors text-sm"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="mailto:hello@mauramaura.studio"
              className="text-text-secondary hover:text-text-primary transition-colors text-sm"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
