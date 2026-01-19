export default function Home() {
  return (
    <main className="min-h-screen bg-background p-lg">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-hero text-text-primary mb-md">maura maura studio</h1>
        <p className="text-body text-text-secondary mb-xl">
          Creative portfolio and shop - coming soon.
        </p>

        {/* Test component using custom theme colors */}
        <div className="rounded bg-surface p-md border border-border">
          <h2 className="text-section-head text-accent mb-sm">Theme Test</h2>
          <p className="text-caption text-text-secondary">
            This card uses custom colors from the design system.
          </p>
        </div>
      </div>
    </main>
  );
}
