"use client";

import { Menu } from "lucide-react";

interface HamburgerMenuProps {
  onClick: () => void;
}

export function HamburgerMenu({ onClick }: HamburgerMenuProps) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-background/80 backdrop-blur-md border border-border shadow-medium hover:bg-secondary transition-all duration-200"
      aria-label="Open navigation drawer"
    >
      <Menu className="w-6 h-6 text-foreground" />
    </button>
  );
}
