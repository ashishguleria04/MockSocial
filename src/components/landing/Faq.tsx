"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Is MockSocial completely free?",
    answer: "Yes! MockSocial is an open-source project and is completely free to use. All features, including high-res exports and AI generation, are available at no cost."
  },
  {
    question: "How does 'Database-Free Sharing' work?",
    answer: "When you click Share, the entire state of your mockup (messages, avatars, settings) is compressed using LZ-String and encoded directly into the URL. There is no backend database storing your data."
  },
  {
    question: "Can I use MockSocial on my phone?",
    answer: "Absolutely. MockSocial is fully responsive. On mobile devices, the canvas scales to fit your screen, and the editing controls slide up as a convenient bottom sheet."
  },
  {
    question: "What platforms are supported?",
    answer: "Currently we support WhatsApp, iMessage, Signal, Slack, Discord, Telegram, Messenger, Instagram, Teams, Snapchat, TikTok, X (Twitter), LinkedIn, and Threads."
  },
  {
    question: "Are the generated PNGs high-resolution?",
    answer: "Yes, you can configure your export quality. We support 1x, 2x, and 3x pixel-ratios, ensuring crisp text and graphics for any professional presentation."
  }
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-background via-indigo-50/30 to-background dark:from-transparent dark:via-transparent dark:to-transparent">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={cn(
                "border rounded-2xl overflow-hidden transition-colors duration-200",
                openIndex === i ? "bg-indigo-50/50 dark:bg-muted/50 border-indigo-200/60 dark:border-primary/20" : "bg-white dark:bg-card border-indigo-100/50 dark:border-border hover:bg-indigo-50/30 dark:hover:bg-muted/30"
              )}
            >
              <button
                className="flex items-center justify-between w-full p-6 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-semibold text-lg text-foreground">{faq.question}</span>
                <ChevronDown 
                  className={cn(
                    "w-5 h-5 text-muted-foreground transition-transform duration-300",
                    openIndex === i ? "rotate-180 text-primary" : ""
                  )} 
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
