"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { SignalSkin } from "./skins/SignalSkin";
import { IMessageSkin } from "./skins/IMessageSkin";
import { WhatsAppSkin } from "./skins/WhatsAppSkin";

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
        return <SignalSkin />;
    }
  };

  return (
    <div className="flex items-center justify-center p-14 min-h-screen">
      <div
        id="chat-canvas"
        className="relative w-[375px] h-[812px] bg-white shadow-[0_40px_120px_rgba(0,0,0,0.5)] rounded-[2.5rem] overflow-hidden text-black font-sans border-2 border-slate-700/40"
        style={{
          boxShadow: '0 40px 120px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset, 0 0 60px rgba(59, 130, 246, 0.1)'
        }}
      >
        {renderSkin()}
      </div>
    </div>
  );
};
