"use client";

import { useState } from "react";
import { ChatCanvas } from "@/components/canvas/ChatCanvas";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { HamburgerMenu } from "@/components/shared/HamburgerMenu";
import { SideDrawer } from "@/components/shared/SideDrawer";

export const metadata = {
  title: "Editor | MockSocial",
  description: "Customize and export high-fidelity chat mockups in real-time.",
};

export default function EditorPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <main className="flex min-h-screen lg:h-dvh lg:min-h-0 lg:overflow-hidden relative bg-background text-foreground overflow-x-hidden">
      {/* Static monochrome backdrop: dot grid fading toward the edges */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-dots mask-[radial-gradient(ellipse_70%_70%_at_50%_50%,#000_50%,transparent_100%)]" />
      </div>

      <HamburgerMenu onClick={() => setIsDrawerOpen(true)} />

      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Sidebar />
      </SideDrawer>

      {/* On lg+: row layout (sidebar left, canvas right).
          On mobile: canvas fills the screen, drawer toggled via hamburger. */}
      <div className="flex flex-col lg:flex-row w-full h-full lg:min-h-0 relative z-10">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8 overflow-y-auto lg:overflow-hidden overflow-x-hidden min-h-svh lg:min-h-0 lg:h-full relative">
          {/* App theme toggle — floats over the canvas area */}
          <div className="absolute top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          <ErrorBoundary>
            <ChatCanvas />
          </ErrorBoundary>
        </div>
      </div>
    </main>
  );
}
