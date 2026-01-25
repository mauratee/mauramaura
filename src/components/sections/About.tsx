export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-surface">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl text-text-primary mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            About
          </h2>
          <div className="text-text-secondary opacity-60" aria-hidden="true">
            ˚ʚ♡ɞ˚
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Image placeholder */}
            <div className="aspect-[4/5] bg-border rounded flex items-center justify-center">
              <span className="text-text-secondary text-sm">
                [Artist Photo]
              </span>
            </div>

            {/* Bio text */}
            <div className="space-y-6">
              <p className="text-lg text-text-primary leading-relaxed">
                Hello! I&apos;m Maura, an illustrator and designer creating
                whimsical artwork that brings a touch of magic to everyday life.
              </p>

              <p className="text-text-secondary leading-relaxed">
                My work draws inspiration from nature, folklore, and the small
                moments of wonder that make life beautiful. From detailed
                illustrations to handmade goods, each piece is crafted with care
                and intention.
              </p>

              <p className="text-text-secondary leading-relaxed">
                When I&apos;m not at my desk drawing, you can find me exploring
                local trails, tending to my houseplants, or searching for
                vintage treasures at the flea market.
              </p>

              {/* Decorative element */}
              <div
                className="pt-6 text-text-secondary opacity-60"
                aria-hidden="true"
              >
                𓆝 𓆟 𓆞 𓆝 𓆟
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
