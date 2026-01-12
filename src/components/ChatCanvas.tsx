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
    <div className="flex items-center justify-center p-12 min-h-screen">
      <div
        id="chat-canvas"
        className="relative w-[375px] h-[812px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.4)] rounded-[2.5rem] overflow-hidden text-black font-sans border border-slate-700/30"
        style={{
          boxShadow: '0 30px 100px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset'
        }}
      >
        {renderSkin()}
      </div>
    </div>
  );
};
