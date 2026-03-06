"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, X, Loader2, MessageSquare, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChatStore, Platform } from "@/store/useChatStore";
import { useToast } from "@/components/shared/toast";
import { cn } from "@/lib/utils";

const EXAMPLE_PROMPTS = [
  "Two friends planning a surprise birthday party",
  "A couple deciding where to eat dinner tonight",
  "Coworkers discussing a project deadline",
  "Old friends catching up after years apart",
  "Someone asking their roommate about the WiFi password",
];

interface AIChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AIChatDialog({ open, onOpenChange }: AIChatDialogProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [messageCount, setMessageCount] = useState(6);
  const store = useChatStore();
  const { showToast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          platform: store.platform,
          messageCount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate conversation");
      }

      // Hydrate the store
      store.setMessages(data.messages);
      store.updateContact(data.contact);

      showToast("AI conversation generated! ✨", "success");
      onOpenChange(false);
      setPrompt("");
    } catch (error: any) {
      showToast(error.message || "Failed to generate. Check your API key.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const platformName = getPlatformDisplayName(store.platform);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isGenerating && onOpenChange(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            className="fixed inset-0 flex items-center justify-center z-[100] p-4"
          >
            <div className="w-full max-w-lg bg-background border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative px-6 py-5 border-b border-border bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-fuchsia-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">
                      AI Conversation Generator
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Powered by Gemini · Generating for{" "}
                      <span className="font-semibold text-foreground">
                        {platformName}
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => !isGenerating && onOpenChange(false)}
                  className="absolute right-4 top-4 p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5">
                {/* Prompt Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    Describe your scenario
                  </label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. Two best friends planning a road trip, one is super excited and the other is worried about costs..."
                    className="min-h-[100px] bg-secondary/50 border-border focus:bg-background resize-none text-sm"
                    disabled={isGenerating}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                        handleGenerate();
                      }
                    }}
                  />
                </div>

                {/* Example Prompts */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Try an example
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {EXAMPLE_PROMPTS.map((example) => (
                      <button
                        key={example}
                        onClick={() => setPrompt(example)}
                        disabled={isGenerating}
                        className={cn(
                          "px-3 py-1.5 text-[11px] font-medium rounded-full border transition-all",
                          "bg-secondary/50 border-border text-muted-foreground",
                          "hover:bg-secondary hover:text-foreground hover:border-primary/30",
                          "disabled:opacity-50 disabled:cursor-not-allowed"
                        )}
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Count */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      Messages
                    </label>
                    <span className="text-xs font-bold text-foreground">
                      {messageCount}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="15"
                    value={messageCount}
                    onChange={(e) => setMessageCount(parseInt(e.target.value))}
                    disabled={isGenerating}
                    className="w-full h-1.5 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-500"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Quick</span>
                    <span>Detailed</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-border bg-secondary/20 flex items-center justify-between">
                <p className="text-[10px] text-muted-foreground font-medium">
                  <kbd className="px-1.5 py-0.5 bg-secondary border border-border rounded text-[10px]">
                    Ctrl
                  </kbd>{" "}
                  +{" "}
                  <kbd className="px-1.5 py-0.5 bg-secondary border border-border rounded text-[10px]">
                    Enter
                  </kbd>{" "}
                  to generate
                </p>
                <Button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className={cn(
                    "h-10 px-5 rounded-xl font-bold text-sm gap-2 transition-all duration-200",
                    "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white",
                    "hover:from-violet-600 hover:to-fuchsia-600 hover:shadow-lg hover:-translate-y-0.5",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  )}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function getPlatformDisplayName(platform: Platform): string {
  const names: Record<string, string> = {
    whatsapp: "WhatsApp",
    messenger: "Messenger",
    telegram: "Telegram",
    discord: "Discord",
    imessage: "iMessage",
    instagram: "Instagram",
    slack: "Slack",
    teams: "Teams",
    signal: "Signal",
    x: "X / Twitter",
    snapchat: "Snapchat",
    tiktok: "TikTok",
  };
  return names[platform] || platform;
}
