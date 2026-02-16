"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChatStore } from "@/store/useChatStore";
import { encodeState } from "@/lib/url-state";
import { Check, Copy, Link, Share2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "./toast";

export function ShareDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const generateLink = () => {
    try {
        const state = useChatStore.getState();
        const encoded = encodeState(state);
        
        // Browser URL length limits are usually around 2000-8000 characters.
        // We'll warn if it's over 4000.
        if (encoded.length > 4000) {
            setError("Your mockup contains too much data (like large images) to share comfortably via a link. Try removing large images.");
        } else {
            setError(null);
        }

        const url = `${window.location.origin}/?s=${encoded}`;
        setGeneratedLink(url);
    } catch (e) {
        console.error(e);
        setError("Failed to generate link.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    showToast("Link copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => {
        setIsOpen(open);
        if (open) generateLink();
    }}>
      <DialogTrigger asChild>
        <Button 
            variant="ghost" 
            size="icon"
            className="h-9 w-9 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all group"
            title="Share Mockup"
        >
            <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Mockup</DialogTitle>
          <DialogDescription>
            Copy the link below to share this exact mockup configuration.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={generatedLink}
              readOnly
              className="h-10 text-xs font-mono bg-secondary/50"
            />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={copyToClipboard} disabled={!generatedLink}>
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy</span>
          </Button>
        </div>

        {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-xs mt-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{error}</p>
            </div>
        )}

        <div className="text-[10px] text-muted-foreground mt-2 bg-secondary/30 p-2 rounded-md">
            <span className="font-bold">Note:</span> This link contains all your mockup data. It does not require a database and lives entirely in the URL.
        </div>
      </DialogContent>
    </Dialog>
  );
}
