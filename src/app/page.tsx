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
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Static monochrome backdrop: faint grid fading out from the center */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)]" />
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
