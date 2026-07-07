"use client";

import Link from "next/link";
import { MessageSquare, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/theme-toggle";

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
        ? "bg-background/85 backdrop-blur-xl border-border shadow-sm py-2"
        : "bg-transparent border-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-foreground p-1.5 rounded-lg group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5 text-background" />
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

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <a
            href="https://github.com/ashishguleria04/MockSocial"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors"
            aria-label="GitHub repository"
          >
            <Github className="w-5 h-5" />
          </a>
          <Link
            href="/editor"
            className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background shadow-sm transition-all hover:opacity-90 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background ml-1"
          >
            Launch App
          </Link>
        </div>
      </div>
    </nav>
  );
}
