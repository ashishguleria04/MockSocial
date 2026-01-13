"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { SignalSkin } from "./skins/SignalSkin";
import { IMessageSkin } from "./skins/IMessageSkin";
import { WhatsAppSkin } from "./skins/WhatsAppSkin";
import { MessengerSkin } from "./skins/MessengerSkin";
import { TelegramSkin } from "./skins/TelegramSkin";
import { DiscordSkin } from "./skins/DiscordSkin";
import { InstagramSkin } from "./skins/InstagramSkin";
import { SlackSkin } from "./skins/SlackSkin";
import { TeamsSkin } from "./skins/TeamsSkin";
import { XSkin } from "./skins/XSkin";
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
      case "messenger":
        return <MessengerSkin />;
      case "telegram":
        return <TelegramSkin />;
      case "discord":
        return <DiscordSkin />;
      case "instagram":
        return <InstagramSkin />;
      case "slack":
        return <SlackSkin />;
      case "teams":
        return <TeamsSkin />;
      case "x":
        return <XSkin />;
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
      <div id="chat-canvas" className="relative group transition-all duration-500 ease-in-out transform hover:scale-[1.01] z-50">
        <div className="absolute -inset-4 bg-gradient-to-tr from-primary/40 via-purple-500/40 to-secondary/40 rounded-[3.5rem] blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse pointer-events-none" />
        {/* Phone Frame */}
        <div className="relative w-[340px] h-[700px] bg-[#121212] rounded-[3rem] shadow-[0_0_0_9px_#333333,0_0_0_10px_#000000,0_20px_50px_rgba(0,0,0,0.5)] border-[6px] border-[#222222] overflow-hidden">
            
            {/* Side Buttons */}
            <div className="absolute top-24 -left-[14px] w-[8px] h-8 bg-[#222222] rounded-l-lg shadow-sm" /> {/* Mute */}
            <div className="absolute top-36 -left-[14px] w-[8px] h-12 bg-[#222222] rounded-l-lg shadow-sm" /> {/* Vol Up */}
            <div className="absolute top-52 -left-[14px] w-[8px] h-12 bg-[#222222] rounded-l-lg shadow-sm" /> {/* Vol Down */}
            <div className="absolute top-44 -right-[14px] w-[8px] h-20 bg-[#222222] rounded-r-lg shadow-sm" /> {/* Power */}

            {/* Inner Screen Container */}
            <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden border-[6px] border-black">
                 {/* Status Bar */}
                 <div className={`absolute top-0 left-0 right-0 h-[44px] z-50 flex items-center justify-between px-6 font-medium text-[15px] select-none ${platform === 'whatsapp' || platform === 'discord' || platform === 'x' ? 'text-white mix-blend-plus-lighter' : 'text-black'}`}>
                      <span>9:41</span>
                      <div className="flex items-center gap-1.5">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2C7.28 2 2.87 4.16 0 7.42L12 22 24 7.42C21.13 4.16 16.72 2 12 2Z" /></svg>
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.8 3.53L20 6.64C20.4 7.69 20.4 8.84 20 9.89L13.75 22.84C13.43 23.5 12.57 23.5 12.25 22.84L6 9.89C5.6 8.84 5.6 7.69 6 6.64L7.2 3.53C7.65 2.59 8.6 2 9.64 2H16.36C17.4 2 18.35 2.59 18.8 3.53Z" /></svg>
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -rotate-90"><path d="M17,5 L17,3 C17,1.8954305 16.1045695,1 15,1 L6,1 C4.8954305,1 4,1.8954305 4,3 L4,5 L3,5 C1.8954305,5 1,5.8954305 1,7 L1,15 C1,16.1045695 1.8954305,17 3,17 L18,17 C19.1045695,17 20,16.1045695 20,15 L20,7 C20,5.8954305 19.1045695,5 18,5 L17,5 Z M15,3 L6,3 L6,5 L15,5 L15,3 Z" opacity={0.3}/><path d="M4,7 L17,7 L17,15 L4,15 L4,7 Z" /></svg>
                      </div>
                 </div>

                 {/* Screen Content */}
                 <div className="w-full h-full bg-white overflow-hidden rounded-[2.2rem] relative">
                    {renderSkin()}
                 </div>
                 
                 {/* Home Indicator line (iOS style) */}
                 <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[110px] h-1.5 bg-black/20 rounded-full z-50 pointer-events-none mix-blend-luminosity" />
            </div>
        </div>
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
