"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { SignalSkin } from "./skins/SignalSkin";
import { IMessageSkin } from "./skins/IMessageSkin";
import { WhatsAppSkin } from "./skins/WhatsAppSkin";
import { Download, Play } from "lucide-react";
import { toPng } from "html-to-image";

export const ChatCanvas = () => {
  const { platform } = useChatStore();

  const renderSkin = () => {
    switch (platform) {
      case "signal":
        return <SignalSkin />;
      case "imessage":
        return <IMessageSkin />;
      case "whatsapp":
        return <WhatsAppSkin />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full bg-gray-50 text-gray-400 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
               <span className="text-2xl">🚧</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-sm">The {platform} skin is currently under development.</p>
          </div>
        );
    }
  };

  const downloadScreenshot = async () => {
    const node = document.getElementById("chat-canvas");
    if (!node) return;

    try {
      const dataUrl = await toPng(node, { pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `mockup_${platform}_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate screenshot", err);
    }
  };

  return (
    <div className="flex items-center justify-center p-8 min-h-screen relative">
      <div
        id="chat-canvas"
        className="relative w-[375px] h-[812px] bg-white shadow-2xl rounded-[2.5rem] overflow-hidden text-black font-sans"
      >
        {renderSkin()}
      </div>
      
      {/* Floating Action Buttons */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        <button className="w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 hover:shadow-2xl transition-all">
          <Play className="w-6 h-6 text-slate-700" fill="currentColor" />
        </button>
        <button
          onClick={downloadScreenshot}
          className="w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 hover:shadow-2xl transition-all"
        >
          <Download className="w-6 h-6 text-slate-700" />
        </button>
      </div>
    </div>
  );
};
