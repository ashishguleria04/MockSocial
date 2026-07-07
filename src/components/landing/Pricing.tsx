import { Check } from "lucide-react";
import Link from "next/link";

export function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-foreground">Simple, transparent pricing</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            MockSocial is completely free and open-source. Every feature, no paywall, no credit card.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="relative p-8 rounded-3xl bg-card border border-foreground/80 shadow-card">
            <div className="absolute top-0 right-8 -translate-y-1/2">
              <span className="bg-foreground text-background text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Free forever
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-2 text-card-foreground">Everything included</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-extrabold text-card-foreground">$0</span>
              <span className="text-muted-foreground font-medium">/month</span>
            </div>
            <p className="text-muted-foreground mb-8">
              Access to all platforms, AI generation, and unlimited exports. No account required.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "All 14 platform skins",
                "Unlimited mockup exports",
                "High-resolution PNGs (1x, 2x, 3x)",
                "Animated GIF exports",
                "Gemini AI conversation generator",
                "Database-free URL sharing",
                "Local browser storage",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-foreground flex items-center justify-center text-background">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </span>
                  <span className="font-medium text-card-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/editor"
              className="flex h-12 w-full items-center justify-center rounded-xl bg-foreground text-background font-semibold hover:opacity-90 transition-opacity"
            >
              Start creating now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
