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
    <div className="flex items-center justify-center p-8 bg-gray-100 min-h-screen">
      <div
        id="chat-canvas"
        className="relative w-[375px] h-[812px] bg-white shadow-2xl overflow-hidden text-black font-sans"
      >
        {renderSkin()}
      </div>
    </div>
  );
};
