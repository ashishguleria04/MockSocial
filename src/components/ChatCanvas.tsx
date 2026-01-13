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
      <div id="chat-canvas" className="relative transition-all duration-300 ease-in-out transform hover:scale-[1.01]">
        {/* Phone Frame */}
        <div className="relative w-[340px] h-[700px] bg-[#121212] rounded-[3rem] shadow-[0_0_0_9px_#333333,0_0_0_10px_#000000,0_20px_50px_rgba(0,0,0,0.5)] border-[6px] border-[#222222] overflow-hidden">
            
            {/* Side Buttons */}
            <div className="absolute top-24 -left-[14px] w-[8px] h-8 bg-[#222222] rounded-l-lg shadow-sm" /> {/* Mute */}
            <div className="absolute top-36 -left-[14px] w-[8px] h-12 bg-[#222222] rounded-l-lg shadow-sm" /> {/* Vol Up */}
            <div className="absolute top-52 -left-[14px] w-[8px] h-12 bg-[#222222] rounded-l-lg shadow-sm" /> {/* Vol Down */}
            <div className="absolute top-44 -right-[14px] w-[8px] h-20 bg-[#222222] rounded-r-lg shadow-sm" /> {/* Power */}

            {/* Inner Screen Container */}
            <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden border-[6px] border-black">
                {/* Dynamic Island / Camera Cutout */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[96px] h-[28px] bg-black rounded-full z-50 flex items-center justify-center pointer-events-none">
                     <div className="w-[92px] h-[26px] bg-black rounded-full relative overflow-hidden flex items-center justify-end px-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] shadow-inner" />
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-900/20 blur-sm rounded-full" />
                     </div>
                </div>

                 {/* Screen Content */}
                 <div className="w-full h-full pt-1 bg-white overflow-hidden rounded-[2.2rem]">
                    {renderSkin()}
                 </div>
                 
                 {/* Home Indicator line (iOS style) */}
                 <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[110px] h-1 bg-black/90 rounded-full z-50 pointer-events-none mix-blend-difference" />
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
