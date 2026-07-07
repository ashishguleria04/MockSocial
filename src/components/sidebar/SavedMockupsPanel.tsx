"use client";

import React, { useState } from "react";
import { useChatStore } from "@/store/useChatStore";
import { SavedMockup } from "@/store/slices/createSavedMockupsSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, RotateCcw, Trash2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/shared/icons";
import { useToast } from "@/components/shared/toast";
import {
  MessageSquare,
  Share2,
  Users,
  Smartphone,
  AtSign,
  Linkedin,
} from "lucide-react";

// ─── helpers ────────────────────────────────────────────────────────────────

function relativeTime(ms: number): string {
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const PLATFORM_META: Record<
  string,
  { label: string; icon: React.ReactNode }
> = {
  whatsapp:  { label: "WhatsApp",  icon: <Icons.WhatsApp className="w-4 h-4 fill-current" /> },
  messenger: { label: "Messenger", icon: <Icons.Messenger className="w-4 h-4 fill-current" /> },
  telegram:  { label: "Telegram",  icon: <Icons.Telegram className="w-4 h-4 fill-current" /> },
  discord:   { label: "Discord",   icon: <Icons.Discord className="w-4 h-4 fill-current" /> },
  imessage:  { label: "iMessage",  icon: <Icons.Apple className="w-4 h-4 fill-current" /> },
  instagram: { label: "Instagram", icon: <Icons.Instagram className="w-4 h-4" /> },
  slack:     { label: "Slack",     icon: <Icons.Slack className="w-4 h-4 fill-current" /> },
  signal:    { label: "Signal",    icon: <Icons.Signal className="w-4 h-4 fill-current" /> },
  x:         { label: "X/Twitter", icon: <Icons.Twitter className="w-4 h-4 fill-current" /> },
  teams:     { label: "Teams",     icon: <Users className="w-4 h-4" /> },
  snapchat:  { label: "Snapchat",  icon: <MessageSquare className="w-4 h-4" /> },
  tiktok:    { label: "TikTok",    icon: <Smartphone className="w-4 h-4" /> },
  linkedin:  { label: "LinkedIn",  icon: <Linkedin className="w-4 h-4" /> },
  threads:   { label: "Threads",   icon: <AtSign className="w-4 h-4" /> },
};

const getplatformMeta = (platform: string) =>
  PLATFORM_META[platform] ?? {
    label: platform,
    icon: <Share2 className="w-4 h-4" />,
  };

// ─── Card ────────────────────────────────────────────────────────────────────

interface CardProps {
  saved: SavedMockup;
  onLoad: () => void;
  onDelete: () => void;
}

const SavedMockupCard = ({ saved, onLoad, onDelete }: CardProps) => {
  const meta = getplatformMeta(saved.platform);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.15 } }}
      className="group relative flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-foreground/30 hover:bg-secondary/40 transition-all"
    >
      {/* Platform icon badge */}
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-secondary border border-border text-foreground transition-all">
        {meta.icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-foreground leading-tight truncate">
          {saved.name}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[10px] font-medium text-muted-foreground truncate">
            {meta.label}
          </span>
          <span className="text-border">·</span>
          <span className="text-[10px] text-muted-foreground shrink-0">
            {relativeTime(saved.createdAt)}
          </span>
          {saved.mockupType === "post" && (
            <>
              <span className="text-border">·</span>
              <span className="text-[10px] font-semibold text-foreground border border-border rounded-full px-1.5">post</span>
            </>
          )}
        </div>
      </div>

      {/* Actions — visible on hover */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={onLoad}
          title="Restore this mockup"
          className="h-7 w-7 rounded-lg hover:bg-secondary hover:text-foreground transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          title="Delete"
          className="h-7 w-7 rounded-lg hover:bg-foreground hover:text-background transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </motion.div>
  );
};

// ─── Panel ───────────────────────────────────────────────────────────────────

export const SavedMockupsPanel = () => {
  const store = useChatStore();
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [draftName, setDraftName] = useState("");

  const handleSave = () => {
    const name =
      draftName.trim() ||
      `${store.contact.name || store.platform} · ${new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    store.saveMockup(name);
    showToast(`"${name}" saved!`, "success");
    setDraftName("");
    setIsSaving(false);
  };

  const handleLoad = (id: string, name: string) => {
    store.loadMockup(id);
    showToast(`Restored "${name}"`, "success");
  };

  const handleDelete = (id: string, name: string) => {
    store.deleteMockup(id);
    showToast(`"${name}" deleted`, "info");
  };

  return (
    <div className="space-y-3">
      {/* Save row */}
      <AnimatePresence mode="wait">
        {isSaving ? (
          <motion.div
            key="saving-form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex gap-2"
          >
            <Input
              autoFocus
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") {
                  setIsSaving(false);
                  setDraftName("");
                }
              }}
              placeholder="Give this mockup a name…"
              className="flex-1 h-9 text-sm bg-secondary/50 border-border focus:bg-background focus:border-primary/50"
            />
            <Button
              size="icon"
              onClick={handleSave}
              title="Save"
              className="h-9 w-9 rounded-xl shrink-0 bg-foreground text-background hover:bg-foreground/90 shadow-medium"
            >
              <Save className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsSaving(false);
                setDraftName("");
              }}
              title="Cancel"
              className="h-9 w-9 rounded-xl shrink-0 hover:bg-secondary"
            >
              <X className="w-4 h-4" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="save-btn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Button
              onClick={() => setIsSaving(true)}
              variant="outline"
              className="w-full h-9 rounded-xl gap-2 text-sm font-semibold border-dashed border-border hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all"
            >
              <Bookmark className="w-4 h-4" />
              Save current mockup
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List */}
      {store.savedMockups.length === 0 ? (
        <div className="py-8 text-center bg-secondary/20 rounded-xl border border-dashed border-border">
          <Bookmark className="w-7 h-7 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-xs font-medium text-muted-foreground">
            No saved mockups yet
          </p>
          <p className="text-[10px] text-muted-foreground/60 mt-0.5">
            Save your current mockup to access it later
          </p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {store.savedMockups.map((saved) => (
              <SavedMockupCard
                key={saved.id}
                saved={saved}
                onLoad={() => handleLoad(saved.id, saved.name)}
                onDelete={() => handleDelete(saved.id, saved.name)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
