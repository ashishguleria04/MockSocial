"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { ArrowLeft, Video, Phone, MoreVertical, Plus, Camera, Mic, Sticker } from "lucide-react";

// Signal Blue: #2c6bed
// Signal Gray: #f6f6f6

export const SignalSkin = () => {
  const { contact, messages, isDarkMode, wallpaper } = useChatStore();

  return (
    <div className={`flex flex-col h-full ${wallpaper ? 'bg-transparent' : (isDarkMode ? 'bg-[#1b1b1b] text-white' : 'bg-white text-gray-900')}`}>
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

        {messages.map((msg) => {
          const quotedMessage = msg.replyToId ? messages.find(m => m.id === msg.replyToId) : null;
          return (
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
              {/* Reply Block */}
              {quotedMessage && (
                  <div className={`mb-1 px-2 py-1 rounded border-l-2 ${msg.sender === 'me' ? 'bg-black/10 border-white' : (isDarkMode ? 'bg-black/20 border-gray-400' : 'bg-black/5 border-gray-500')}`}>
                      <div className={`text-[11px] font-semibold mb-0.5 ${msg.sender === 'me' ? 'text-white/90' : (isDarkMode ? 'text-gray-300' : 'text-gray-600')}`}>
                          {quotedMessage.sender === 'me' ? 'You' : contact.name}
                      </div>
                      <div className={`text-[12px] truncate ${msg.sender === 'me' ? 'text-white/80' : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                          {quotedMessage.text}
                      </div>
                  </div>
              )}
            
              {msg.text}
              
              {/* Reactions Pill */}
              {msg.reactions && msg.reactions.length > 0 && (
                <div className={`absolute -bottom-3 ${msg.sender === 'me' ? 'right-2' : 'left-2'} flex items-center gap-0.5 px-1.5 py-0.5 rounded-full z-10 ${isDarkMode ? 'bg-[#1b1b1b] border-[#333333] border' : 'bg-white shadow-sm'}`}>
                  {msg.reactions.map((r, i) => (
                    <span key={i} className="flex items-center text-[12px]">
                      {r.emoji}
                      {r.count > 1 && <span className={`text-[10px] font-bold ml-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{r.count}</span>}
                    </span>
                  ))}
                </div>
              )}
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
        )})}
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
