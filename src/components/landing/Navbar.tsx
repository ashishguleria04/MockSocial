"use client";

import Link from "next/link";
import { MessageSquare, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      scrolled 
        ? "bg-background/80 backdrop-blur-xl border-border/40 dark:border-indigo-500/10 shadow-sm dark:shadow-indigo-500/5 py-2" 
        : "bg-transparent border-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-primary to-accent p-1.5 rounded-lg shadow-glow group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">MockSocial</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#platforms" className="hover:text-foreground transition-colors">Platforms</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <a href="https://github.com/ashishguleria04/MockSocial" target="_blank" rel="noreferrer" className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
          <Link
            href="/editor"
            className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Launch App
          </Link>
        </div>
      </div>
    </nav>
  );
}
