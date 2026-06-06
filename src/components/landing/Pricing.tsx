import { Check } from "lucide-react";
import Link from "next/link";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-indigo-50/60 via-purple-50/30 to-background dark:from-indigo-950/30 dark:via-purple-950/15 dark:to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            MockSocial is completely free and open-source. Enjoy all the premium features without paying a dime.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="relative p-8 rounded-[2rem] bg-white dark:bg-card/80 border border-indigo-200/60 dark:border-indigo-500/15 shadow-xl shadow-indigo-500/10 dark:shadow-[0_8px_40px_-12px_rgba(99,102,241,0.2)] ring-1 ring-indigo-500/5 dark:ring-indigo-500/10">
            <div className="absolute top-0 right-8 -translate-y-1/2">
              <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </span>
            </div>
            
            <h3 className="text-2xl font-bold mb-2 text-card-foreground">Free Forever</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-extrabold text-card-foreground">$0</span>
              <span className="text-muted-foreground font-medium">/month</span>
            </div>
            <p className="text-muted-foreground mb-8">
              Access to all platforms, AI generation, and unlimited exports. No credit card required.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "All 10+ Platform Skins",
                "Unlimited Mockup Exports",
                "High-Resolution PNGs (1x, 2x, 3x)",
                "Animated GIF Exports",
                "Gemini AI Conversation Generator",
                "Database-Free URL Sharing",
                "Local Browser Storage",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="font-medium text-card-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/editor"
              className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Start Creating Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
