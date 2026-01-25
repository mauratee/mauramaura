"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Please enter a valid email";
    if (!message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate submission for MVP - replace with actual API call later
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl text-text-primary mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Get in Touch
          </h2>
          <p className="text-text-secondary">
            Have a question or want to work together? Send me a message!
          </p>
          <div
            className="mt-4 text-text-secondary opacity-60"
            aria-hidden="true"
          >
            ✌︎㋡
          </div>
        </div>

        {isSubmitted ? (
          /* Success message */
          <div className="text-center py-12 bg-surface rounded-lg border border-border">
            <div className="text-4xl mb-4" aria-hidden="true">
              ⋆˖⁺‧₊☽◯☾₊‧⁺˖⋆
            </div>
            <h3 className="text-xl font-medium text-text-primary mb-2">
              Message Sent!
            </h3>
            <p className="text-text-secondary">
              Thank you for reaching out. I&apos;ll get back to you soon.
            </p>
            <Button
              variant="secondary"
              className="mt-6"
              onClick={() => setIsSubmitted(false)}
            >
              Send Another Message
            </Button>
          </div>
        ) : (
          /* Contact form */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field for spam protection */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <Input
              label="Name"
              name="name"
              placeholder="Your name"
              error={errors.name}
              required
            />

            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="your@email.com"
              error={errors.email}
              required
            />

            <Textarea
              label="Message"
              name="message"
              placeholder="Tell me about your project or question..."
              rows={5}
              error={errors.message}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              className="w-full"
            >
              Send Message
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
