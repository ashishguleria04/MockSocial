"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, MessageCircle, Bot, Star, Github } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-background/60 backdrop-blur-md text-foreground mb-8 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold tracking-wide uppercase">AI-powered · 14 platforms · Free</span>
            </div>
          </motion.div>

          <motion.h1 variants={item} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.05] text-foreground">
            Chat mockups that <br className="hidden md:block" />
            <span className="text-gradient">look real.</span>
          </motion.h1>

          <motion.p variants={item} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Build pixel-perfect conversations for WhatsApp, iMessage, Discord, X and ten more platforms.
            Generate them with AI, share them as a URL, export them in high resolution.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/editor"
              className="w-full sm:w-auto inline-flex h-14 items-center justify-center gap-2 rounded-full bg-foreground px-8 text-base font-bold text-background shadow-medium hover:opacity-90 transition-all hover:scale-[1.03] active:scale-95"
            >
              Start creating — it&apos;s free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#platforms"
              className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur-md px-8 text-base font-bold text-foreground shadow-sm hover:bg-secondary transition-all"
            >
              Explore platforms
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <a
              href="https://github.com/ashishguleria04/MockSocial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-medium">50+ stars on GitHub</span>
            </a>
            <span className="text-border">·</span>
            <a
              href="https://github.com/ashishguleria04/MockSocial/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Open to contributions</span>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, type: "spring", stiffness: 200, damping: 30 }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl md:rounded-4xl border border-border bg-background shadow-[0_24px_80px_-24px_rgba(0,0,0,0.25)] dark:shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Browser/Window Chrome */}
            <div className="h-12 border-b border-border flex items-center px-4 bg-secondary/60 backdrop-blur-xl">
              <div className="flex gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full border border-border bg-background" />
                <div className="w-3.5 h-3.5 rounded-full border border-border bg-muted-foreground/30" />
                <div className="w-3.5 h-3.5 rounded-full border border-border bg-foreground/80" />
              </div>
              <div className="mx-auto flex h-6 w-1/3 items-center justify-center rounded-md bg-background border border-border text-[10px] text-muted-foreground font-mono">
                mocksocial.com/editor
              </div>
              <div className="w-12.5"></div>
            </div>
            {/* The actual image */}
            <div className="relative aspect-video w-full">
              <Image
                src="/screenshots/desktop-dark.png"
                alt="MockSocial Editor Interface Dark"
                fill
                className="object-cover object-top hidden dark:block"
                priority
              />
              <Image
                src="/screenshots/desktop-light.png"
                alt="MockSocial Editor Interface Light"
                fill
                className="object-cover object-top block dark:hidden"
                priority
              />
            </div>
          </div>

          {/* Floating decorative elements */}
          <div className="hidden sm:block absolute -left-6 md:-left-12 top-1/3 animate-[float_5s_infinite_ease-in-out]">
            <div className="bg-background/90 backdrop-blur-xl p-4 rounded-2xl shadow-card flex items-center gap-3 border border-border">
              <div className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-foreground">Pixel Perfect</p>
                <p className="text-xs text-muted-foreground font-medium">Native styling</p>
              </div>
            </div>
          </div>

          <div className="hidden sm:block absolute -right-6 md:-right-12 bottom-1/4 animate-[float_6s_infinite_ease-in-out_reverse]">
            <div className="bg-background/90 backdrop-blur-xl p-4 rounded-2xl shadow-card flex items-center gap-3 border border-border">
              <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center text-background">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-foreground">Gemini AI</p>
                <p className="text-xs text-muted-foreground font-medium">Auto-generate</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
