"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { ArrowLeft, Video, Phone, MoreVertical, Plus, Camera, Mic, Sticker } from "lucide-react";

// Signal Blue: #2c6bed
// Signal Gray: #f6f6f6

export const SignalSkin = () => {
  const { contact, messages, isDarkMode } = useChatStore();

  return (
    <div className={`flex flex-col h-full ${isDarkMode ? 'bg-[#1b1b1b] text-white' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 pt-12 pb-3 shadow-sm z-10 ${isDarkMode ? 'bg-[#1b1b1b] text-white' : 'bg-white text-gray-900'}`}>
        <div className="flex items-center gap-4">
          <ArrowLeft className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`} />
          <div className="flex items-center gap-3">
             {contact.avatar ? (
                <img src={contact.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
             ) : (
                <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold text-lg">
                  {contact.name.charAt(0)}
                </div>
             )}
             <div className="flex flex-col">
                <span className="font-semibold text-lg leading-tight">{contact.name}</span>
                {contact.status && <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{contact.status}</span>}
             </div>
          </div>
        </div>
        <div className={`flex items-center gap-5 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            <Video className="w-6 h-6" />
            <Phone className="w-6 h-6" />
            <MoreVertical className="w-6 h-6" />
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col pt-6 gap-2">
        {/* Date Separator */}
        <div className="flex justify-center mb-4">
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${isDarkMode ? 'bg-[#333333] text-gray-300' : 'bg-gray-100 text-gray-500'}`}>
            January 12, 2026
          </span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[75%] ${
              msg.sender === "me" ? "self-end items-end" : "self-start items-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl text-[16px] leading-[22px] relative ${
                msg.sender === "me"
                  ? "bg-[#2c6bed] text-white rounded-br-none"
                  : (isDarkMode ? "bg-[#333333] text-white" : "bg-[#f6f6f6] text-black") + " rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
            <div className="flex items-center gap-1 mt-1 mx-1">
                 {/* Status & Time Metadata */}
                 <span className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                    {msg.time}
                 </span>
                 {msg.sender === "me" && (
                    <StatusIcon status={msg.status} isDarkMode={isDarkMode} />
                 )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Input */}
      <div className={`px-2 pt-3 pb-8 flex items-center gap-2 ${isDarkMode ? 'bg-[#1b1b1b]' : 'bg-white'}`}>
        <div className={`p-2 rounded-full ${isDarkMode ? 'bg-[#333333] text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
            <Plus className="w-6 h-6" />
        </div>
        <div className={`flex-1 rounded-full px-4 py-3 text-sm flex items-center justify-between ${isDarkMode ? 'bg-[#333333] text-gray-300' : 'bg-gray-100 text-gray-400'}`}>
            <span>Signal message</span>
            <Sticker className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>
        <div className={`p-2 rounded-full ${isDarkMode ? 'bg-[#333333] text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
            <Camera className="w-6 h-6" />
        </div>
        <div className="p-2 bg-[#2c6bed] rounded-full text-white">
            <Mic className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

const StatusIcon = ({ status, isDarkMode }: { status: string, isDarkMode: boolean }) => {
    // Simple visual representation of checkmarks
    if (status === 'sent') {
        return <div className={`w-3 h-3 border rounded-full flex items-center justify-center text-[8px] ${isDarkMode ? 'border-gray-400' : 'border-gray-400'}`}>✓</div> 
    }
    if (status === 'delivered') {
        return <span className="text-[10px] font-bold">✓✓</span>
    }
    if (status === 'read') {
        // Signal read receipts are filled or unique. Using standard double check for now.
        return <span className={`text-[10px] font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>✓✓</span> 
        // Or keep it simple/same color if unsure about strict Signal read color in dark mode (usually white/filled).
    }
    return null;
}
