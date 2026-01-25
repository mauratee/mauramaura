export function Work() {
  // Placeholder artwork items for MVP - will be replaced with dynamic content later
  const placeholderItems = [
    { id: 1, title: "Artwork Title One" },
    { id: 2, title: "Artwork Title Two" },
    { id: 3, title: "Artwork Title Three" },
    { id: 4, title: "Artwork Title Four" },
    { id: 5, title: "Artwork Title Five" },
    { id: 6, title: "Artwork Title Six" },
  ];

  return (
    <section id="work" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl text-text-primary mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Selected Work
          </h2>
          <p className="text-text-secondary">
            A collection of recent illustrations and designs
          </p>
          <div
            className="mt-4 text-text-secondary opacity-60"
            aria-hidden="true"
          >
            ᖭི༏ᖫྀ
          </div>
        </div>

        {/* Grid of work */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {placeholderItems.map((item) => (
            <article
              key={item.id}
              className="group cursor-pointer"
            >
              {/* Image placeholder */}
              <div className="aspect-[4/5] bg-surface border border-border rounded overflow-hidden mb-3 transition-shadow duration-200 group-hover:shadow-lg">
                <div className="w-full h-full flex items-center justify-center text-text-secondary text-sm">
                  [Artwork Image]
                </div>
              </div>
              {/* Title */}
              <h3 className="text-text-primary font-medium group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="text-text-secondary text-sm">Illustration</p>
            </article>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-accent hover:text-text-primary transition-colors font-medium"
          >
            View All Work
            <span className="material-symbols-outlined text-lg">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
