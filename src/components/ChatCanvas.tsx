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
      {/* Floating Action Buttons */}
      <div className="fixed bottom-10 right-10 flex flex-col gap-4 z-50">
        <button
          onClick={downloadScreenshot}
          className="group relative flex items-center justify-center w-16 h-16 bg-slate-900 rounded-2xl shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 active:scale-95"
          title="Download Mockup"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Download className="w-7 h-7 text-white relative z-10" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
