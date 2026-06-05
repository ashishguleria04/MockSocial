import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary mb-8 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Powered by Gemini 2.0 AI</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            The Ultimate Social Media <br className="hidden md:block" />
            <span className="text-gradient">Mockup Generator</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Create high-fidelity, pixel-perfect chat simulations for WhatsApp, Messenger, Telegram, X, and more. Instantly share via URL, generate AI conversations, and export high-res PNGs.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/editor"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
            >
              Start Creating for Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#platforms"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-full bg-secondary px-8 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/80 transition-all"
            >
              Explore Platforms
            </a>
          </div>
        </div>

        <div className="mt-20 relative max-w-5xl mx-auto perspective-1000">
          <div className="relative rounded-2xl md:rounded-[32px] border border-border/50 bg-background shadow-2xl overflow-hidden glass">
            {/* Browser/Window Chrome */}
            <div className="h-12 border-b border-border/50 flex items-center px-4 bg-muted/30">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
            </div>
            {/* The actual image */}
            <div className="relative aspect-[16/9] w-full">
              <Image 
                src="/screenshots/desktop-dark.png" 
                alt="MockSocial Editor Interface" 
                fill 
                className="object-cover object-top hidden dark:block"
                priority
              />
              <Image 
                src="/screenshots/desktop-light.png" 
                alt="MockSocial Editor Interface" 
                fill 
                className="object-cover object-top block dark:hidden"
                priority
              />
            </div>
          </div>
          
          {/* Floating decorative elements */}
          <div className="absolute -left-8 md:-left-12 top-1/4 animate-[float_3s_infinite_ease-in-out]">
            <div className="bg-background glass-card p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-border">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                💬
              </div>
              <div>
                <p className="text-sm font-bold">Pixel Perfect</p>
                <p className="text-xs text-muted-foreground">Native styling</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-8 md:-right-12 bottom-1/4 animate-[float_3.5s_infinite_ease-in-out_reverse]">
            <div className="bg-background glass-card p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-border">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-500">
                ✨
              </div>
              <div>
                <p className="text-sm font-bold">Gemini AI</p>
                <p className="text-xs text-muted-foreground">Auto-generate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
