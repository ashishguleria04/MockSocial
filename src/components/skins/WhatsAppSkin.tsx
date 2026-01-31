"use strict";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { 
  ArrowLeft, 
  Video, 
  Phone, 
  MoreVertical, 
  Smile, 
  Paperclip, 
  Camera, 
  Mic, 
  Check, 
  CheckCheck,
  Plus
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const WhatsAppSkin = () => {
  const { contact, messages, isDarkMode, wallpaper } = useChatStore();

  return (
    <div className={`flex flex-col h-full relative overflow-hidden font-sans ${wallpaper ? 'bg-transparent' : (isDarkMode ? 'bg-[#0b141a] text-[#e9edef]' : 'bg-[#EFE7DD] text-[#111b21]')}`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-3 pt-11 pb-2 z-10 shadow-sm shrink-0 transition-colors ${isDarkMode ? 'bg-[#202c33] text-[#e9edef]' : 'bg-[#008069] text-white'}`}>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <button className="p-1 rounded-full hover:bg-white/10 transition-colors -ml-1">
             <ArrowLeft className="w-6 h-6" strokeWidth={2} />
          </button>
          
          <div className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer ml-1">
              <Avatar className="w-9 h-9 border border-white/10">
                <AvatarImage src={contact.avatar || undefined} className="object-cover" />
                <AvatarFallback className="bg-slate-200 text-slate-500 font-bold">
                  {contact.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center min-w-0 overflow-hidden">
                  <span className="text-[16px] font-semibold leading-tight truncate">{contact.name}</span>
                  <span className="text-[12px] opacity-80 leading-tight truncate font-medium">
                      {contact.status || 'Online'}
                  </span>
              </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 pr-1">
            <Video className="w-6 h-6 cursor-pointer opacity-90 hover:opacity-100" strokeWidth={1.5} />
            <Phone className="w-5 h-5 cursor-pointer opacity-90 hover:opacity-100" strokeWidth={1.5} />
            <MoreVertical className="w-5 h-5 cursor-pointer opacity-90 hover:opacity-100" strokeWidth={2} />
        </div>
      </div>

      {/* Message Area */}
      <div className={`flex-1 overflow-y-auto p-4 flex flex-col gap-2 scrollbar-hide ${!wallpaper ? "bg-[url('https://camo.githubusercontent.com/854a93c27d64274c4f8f5a0b6ec36ee1d053cfcd934eac6c63bed9eaef9764bd/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131303234323533653934312e706e67')] bg-opacity-40 bg-repeat bg-[length:400px]" : ""}`}>
        {/* Date Divider */}
        <div className="flex justify-center my-4 opacity-90">
          <span className={`px-3 py-1 rounded-[7px] text-[11px] font-medium shadow-sm uppercase tracking-wide ${isDarkMode ? 'bg-[#202c33] text-[#8696a0]' : 'bg-white/90 text-slate-600'}`}>
            Today
          </span>
        </div>

        {messages.map((msg, index) => {
          const isMe = msg.sender === "me";
          // Simple grouping logic for tails
          const nextMsg = messages[index + 1];
          const isLastInGroup = !nextMsg || nextMsg.sender !== msg.sender;
          
          return (
            <div
              key={msg.id}
              className={`flex w-full ${isMe ? "justify-end" : "justify-start"} mb-0.5`}
            >
              <div
                className={`
                  relative max-w-[75%] px-3 py-1.5 rounded-lg text-[14.2px] leading-[19px] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]
                  ${isMe 
                    ? (isDarkMode ? "bg-[#005c4b] text-[#e9edef]" : "bg-[#d9fdd3] text-[#111b21]") + " rounded-tr-none" 
                    : (isDarkMode ? "bg-[#202c33] text-[#e9edef]" : "bg-white text-[#111b21]") + " rounded-tl-none"}
                `}
              >
                {/* Tail SVG */}
                {isLastInGroup && (
                  <span className={`absolute top-0 ${isMe ? "-right-2" : "-left-2"} w-2 h-3 overflow-hidden`}>
                    <svg viewBox="0 0 8 13" width="8" height="13" className={`w-full h-full fill-current ${isMe ? (isDarkMode ? 'text-[#005c4b]' : 'text-[#d9fdd3]') : (isDarkMode ? 'text-[#202c33]' : 'text-white')}`}>
                       <path d={isMe ? "M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" : "M-2.188 1H3v11.193l-6.467-8.625C-4.526 2.156 -3.958 1 -2.188 1z"} transform={!isMe ? "scale(-1, 1) translate(-8, 0)" : ""} />
                    </svg>
                  </span>
                )}
                
                <div className="pr-16 pb-1 whitespace-pre-wrap break-words">
                  {msg.text}
                </div>
                
                  <div className="absolute bottom-1 right-2 flex items-center gap-1 select-none">
                    <span className={`text-[10px] font-medium ${isMe && isDarkMode ? 'text-[#c1cdd3]' : (isDarkMode ? 'text-[#8696a0]' : 'text-[rgba(17,27,33,0.6)]')}`}>
                      {msg.time}
                    </span>
                    {isMe && <WhatsAppStatusIcon status={msg.status} isDarkMode={isDarkMode} />}
                  </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className={`px-2 pt-2 pb-8 flex items-end gap-2 shrink-0 min-h-[60px] ${isDarkMode ? 'bg-[#202c33]' : 'bg-[#f0f2f5]'}`}>
        <div className={`flex-1 rounded-3xl flex items-end py-2 px-3 shadow-sm min-h-[46px] ${isDarkMode ? 'bg-[#2a3942]' : 'bg-white'}`}>
            <button className={`p-1 mb-0.5 hover:opacity-80 ${isDarkMode ? 'text-[#8696a0]' : 'text-[#8696a0]'}`}>
              <Smile className="w-6 h-6" />
            </button>
            <input 
                type="text" 
                placeholder="Message" 
                className={`flex-1 min-w-0 bg-transparent outline-none text-[15px] px-3 mb-1.5 placeholder:text-[#8696a0] ${isDarkMode ? 'text-[#e9edef]' : 'text-black'}`}
                disabled
            />
            <div className={`flex items-center gap-3 mb-0.5 mr-1 ${isDarkMode ? 'text-[#8696a0]' : 'text-[#8696a0]'}`}>
                <button className="hover:opacity-80">
                   <Paperclip className="w-5 h-5 -rotate-45" />
                </button>
               {!messages.length && (
                 <button className="hover:opacity-80">
                    <Camera className="w-5 h-5" />
                 </button>
               )}
            </div>
        </div>
        <button className={`w-11 h-11 rounded-full flex items-center justify-center shadow-sm text-white active:scale-95 transition-all mb-0.5 ${isDarkMode ? 'bg-[#00a884]' : 'bg-[#008069] hover:bg-[#00705a]'}`}>
            {messages.length > 0 ? (
                <Mic className="w-5 h-5" fill="currentColor" />
            ) : (
                <Mic className="w-5 h-5" fill="currentColor" />
            )}
        </button>
      </div>
    </div>
  );
};

const WhatsAppStatusIcon = ({ status, isDarkMode }: { status: string, isDarkMode: boolean }) => {
    const color = status === 'read' ? '#53bdeb' : (isDarkMode ? '#8696a0' : '#8696a0');
    return (
        <span className="flex" style={{ color }}>
            {status === 'sent' && <Check className="w-3.5 h-3.5" strokeWidth={2} />}
            {status !== 'sent' && <CheckCheck className="w-3.5 h-3.5" strokeWidth={2} />}
        </span>
    );
};
