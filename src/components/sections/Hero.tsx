export function Hero() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
        {/* Decorative top element */}
        <div
          className="text-text-secondary text-sm mb-8 opacity-60"
          aria-hidden="true"
        >
          ⋆.˚ ☾⭒.˚
        </div>

        {/* Main heading */}
        <h1
          className="text-5xl md:text-6xl lg:text-7xl text-text-primary mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          maura maura
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-text-secondary mb-8 font-light">
          studio
        </p>

        {/* Decorative divider with description */}
        <div className="max-w-2xl mx-auto">
          <div
            className="flex items-center justify-center gap-4 text-text-secondary text-sm mb-6"
            aria-hidden="true"
          >
            <span className="opacity-60">𖡼𖤣𖥧𖡼𓋼𖤣𖥧𓋼𓍊</span>
          </div>

          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
            Illustration, design, and handmade goods.
            <br />
            Creating whimsical art for everyday magic.
          </p>

          <div
            className="flex items-center justify-center gap-4 text-text-secondary text-sm mt-6"
            aria-hidden="true"
          >
            <span className="opacity-60">𖡼𖤣𖥧𖡼𓋼𖤣𖥧𓋼𓍊</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#work"
            className="inline-flex items-center justify-center px-8 py-3 bg-accent text-background font-medium rounded hover:bg-text-primary transition-colors"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 border border-accent text-accent font-medium rounded hover:bg-surface transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
