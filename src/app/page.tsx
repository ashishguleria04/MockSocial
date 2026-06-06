import { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { PlatformShowcase } from "@/components/landing/PlatformShowcase";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "MockSocial | Ultimate Chat Simulator & Social Media Mockup Generator",
  description: "Create pixel-perfect, high-fidelity chat simulation mockups for WhatsApp, Signal, Discord, Instagram, Telegram, Slack, and X. Instantly share via URL, generate AI conversations, and export high-res PNGs.",
  keywords: ["chat mockup", "social media mockup", "WhatsApp generator", "fake chat", "UI mockup tool", "Signal mockup", "Instagram post mockup", "Twitter mockup"],
  openGraph: {
    title: "MockSocial | Ultimate Chat Simulator",
    description: "Create pixel-perfect chat mockups and social media posts. Export to high-res PNGs and GIFs.",
    type: "website",
    url: "https://mocksocial.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "MockSocial | Ultimate Chat Simulator",
    description: "Create pixel-perfect chat mockups and social media posts.",
  }
};

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "MockSocial",
    "url": "https://mocksocial.com",
    "description": "Generate pixel-perfect chat and social media mockups for WhatsApp, Signal, Discord, Slack, Messenger, Instagram, X (Twitter), LinkedIn, and Threads using AI.",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Light mode: colorful gradient orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-indigo-200/40 via-purple-200/30 to-pink-200/20 blur-[120px] animate-[float_6s_infinite] dark:from-indigo-600/15 dark:via-purple-600/10 dark:to-violet-600/5" />
        <div className="absolute top-[20%] right-[-15%] w-[50%] h-[50%] rounded-full bg-gradient-to-bl from-blue-200/30 via-cyan-100/20 to-transparent blur-[120px] animate-[float_8s_infinite_reverse] dark:from-blue-600/10 dark:via-indigo-700/8 dark:to-transparent" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-violet-200/30 via-fuchsia-100/20 to-transparent blur-[140px] animate-[float_7s_infinite] dark:from-purple-600/12 dark:via-fuchsia-700/8 dark:to-transparent" />
        {/* Grid pattern - visible in light mode too */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <PlatformShowcase />
          <Features />
          <Pricing />
          <Faq />
        </main>
        <Footer />
      </div>
    </div>
  );
}
