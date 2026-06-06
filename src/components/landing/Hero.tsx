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
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/15 to-purple-500/15 text-indigo-600 dark:text-indigo-400 mb-8 border border-indigo-500/25 shadow-sm shadow-indigo-500/10 backdrop-blur-md">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide">Powered by Gemini 2.0 AI</span>
            </div>
          </motion.div>
          
          <motion.h1 variants={item} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-foreground">
            The Ultimate Social Media <br className="hidden md:block" />
            <span className="text-gradient">Mockup Generator</span>
          </motion.h1>
          
          <motion.p variants={item} className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Create high-fidelity, pixel-perfect chat simulations for WhatsApp, Messenger, Telegram, X, and more. Instantly share via URL, generate AI conversations, and export high-res PNGs.
          </motion.p>
          
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/editor"
              className="w-full sm:w-auto inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow-xl dark:shadow-indigo-500/25 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
            >
              Start Creating for Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#platforms"
              className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-full bg-secondary/80 dark:bg-white/10 backdrop-blur-md border border-border dark:border-white/20 px-8 text-base font-bold text-secondary-foreground shadow-sm hover:bg-secondary dark:hover:bg-white/20 transition-all"
            >
              Explore Platforms
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <a
              href="https://github.com/ashishguleria04/MockSocial"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="font-medium">50+ stars on GitHub</span>
            </a>
            <span className="text-border">·</span>
            <a
              href="https://github.com/ashishguleria04/MockSocial/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noreferrer"
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
          className="mt-20 relative max-w-5xl mx-auto perspective-1000"
        >
          <div className="relative rounded-2xl md:rounded-[32px] border border-indigo-200/60 dark:border-indigo-500/20 bg-background/80 backdrop-blur-3xl shadow-[0_8px_60px_-12px_rgba(79,70,229,0.25),0_0_100px_-20px_rgba(168,85,247,0.15)] dark:shadow-[0_0_80px_-20px_rgba(99,102,241,0.35),0_0_120px_-30px_rgba(168,85,247,0.2)] overflow-hidden ring-1 ring-indigo-500/5 dark:ring-indigo-500/10">
            {/* Browser/Window Chrome */}
            <div className="h-12 border-b border-border/50 flex items-center px-4 bg-muted/50 backdrop-blur-xl">
              <div className="flex gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full bg-destructive/80 shadow-inner" />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-400/80 shadow-inner" />
                <div className="w-3.5 h-3.5 rounded-full bg-green-500/80 shadow-inner" />
              </div>
              <div className="mx-auto flex h-6 w-1/3 items-center justify-center rounded-md bg-background/50 border border-border/50 text-[10px] text-muted-foreground font-mono">
                mocksocial.com/editor
              </div>
              <div className="w-[50px]"></div>
            </div>
            {/* The actual image */}
            <div className="relative aspect-[16/9] w-full">
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
          <div className="absolute -left-6 md:-left-12 top-1/3 animate-[float_4s_infinite_ease-in-out]">
            <div className="bg-background/80 backdrop-blur-xl p-4 rounded-2xl shadow-2xl dark:shadow-green-500/10 flex items-center gap-3 border border-border/50 dark:border-green-500/15">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-foreground">Pixel Perfect</p>
                <p className="text-xs text-muted-foreground font-medium">Native styling</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-6 md:-right-12 bottom-1/4 animate-[float_5s_infinite_ease-in-out_reverse]">
            <div className="bg-background/80 backdrop-blur-xl p-4 rounded-2xl shadow-2xl dark:shadow-indigo-500/10 flex items-center gap-3 border border-border/50 dark:border-indigo-500/15">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-500">
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
