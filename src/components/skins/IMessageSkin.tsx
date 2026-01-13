"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { ChevronLeft, Info, Video, Phone, ArrowUp, Camera, Plus, Mic, AppWindow } from "lucide-react";

export const IMessageSkin = () => {
  const { contact, messages, isDarkMode } = useChatStore();

  return (
    <div className={`flex flex-col h-full relative font-sans ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Header */}
      <div className={`pt-12 pb-2 px-4 backdrop-blur-xl border-b sticky top-0 z-20 flex items-end justify-between transition-all ${isDarkMode ? 'bg-black/80 border-white/10' : 'bg-white/80 border-gray-100/50'}`}>
        <div className="absolute left-2 flex items-center text-blue-500 -mb-1">
            <ChevronLeft className="w-7 h-7" />
            <span className="text-[17px] -ml-1">Filters</span>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-end pb-1">
             <div className="w-12 h-12 bg-gray-300 rounded-full mb-1 overflow-hidden">
                {contact.avatar ? (
                     <img src={contact.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-t from-gray-400 to-gray-300 flex items-center justify-center text-white text-xl font-medium">
                        {contact.name.charAt(0)}
                    </div>
                )}
             </div>
             <div className="flex flex-col items-center">
                 <span className={`text-[12px] font-medium truncate max-w-[150px] ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{contact.name}</span>
                 <ChevronLeft className="w-3 h-3 text-gray-400 rotate-90 -mt-0.5" />
             </div>
        </div>

        <div className="absolute right-4 text-blue-500 flex gap-4 -mb-1">
             <Video className="w-6 h-6 fill-current bg-transparent" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1 relative z-10">
        <div className="flex justify-center my-6">
            <span className="text-[10px] text-gray-400 font-medium">iMessage</span>
            <span className="text-[10px] text-gray-400 ml-1">Today {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>

        {messages.map((msg, index) => {
           const isMe = msg.sender === 'me';
           const prevMsg = messages[index - 1];
           const nextMsg = messages[index + 1];
           
           // Logic for tails
           // Show tail if next message is different sender or does not exist
           const showTail = !nextMsg || nextMsg.sender !== msg.sender;
           // Round corners if grouped
           
           return (
            <div
              key={msg.id}
              className={`flex w-full ${isMe ? "justify-end" : "justify-start"} mb-1`}
            >
               <div className={`max-w-[70%] relative px-4 py-2 text-[17px] leading-[22px] tracking-tight ${
                   isMe 
                    ? (isDarkMode ? "bg-[#0A84FF] text-white" : "bg-[#007AFF] text-white") 
                    : (isDarkMode ? "bg-[#26262a] text-white" : "bg-[#E9E9EB] text-black")
               }`}
               style={{
                   borderRadius: '20px',
                   borderBottomRightRadius: isMe && showTail ? '4px' : '20px',
                   borderBottomLeftRadius: !isMe && showTail ? '4px' : '20px',
               }}
               >
                   {msg.text}
                   
                   {/* Tail Logic (CSS shapes or absolute) */}
                   {showTail && isMe && (
                       <svg className={`absolute -bottom-[0px] -right-[6px] w-4 h-4 fill-current transform scale-x-[-1] ${isDarkMode ? "text-[#0A84FF]" : "text-[#007AFF]"}`} viewBox="0 0 20 20">
                           <path d="M20,20 C20,8.954305 11.045695,0 0,0 C0,0 3.394154,6.790938 7.3235339,12.723805 C9.8631105,16.558296 14.869038,19.261908 20,20 Z" />
                       </svg>
                   )}
                   {showTail && !isMe && (
                       <svg className={`absolute -bottom-[0px] -left-[6px] w-4 h-4 fill-current ${isDarkMode ? "text-[#26262a]" : "text-[#E9E9EB]"}`} viewBox="0 0 20 20">
                          <path d="M20,20 C20,8.954305 11.045695,0 0,0 C0,0 3.394154,6.790938 7.3235339,12.723805 C9.8631105,16.558296 14.869038,19.261908 20,20 Z" transform="scale(-1, 1) translate(-20, 0)" />
                       </svg>
                   )}
               </div>
            </div>
           );
        })}
        {messages.length > 0 && messages[messages.length-1].sender === 'me' && (
             <div className="flex justify-end pr-1">
                 <span className="text-[10px] text-gray-400 font-medium">Delivered</span>
             </div>
        )}
      </div>

      {/* Footer / Input */}
      <div className={`p-2 pb-8 flex items-end gap-3 z-20 ${isDarkMode ? 'bg-[#000000]' : 'bg-white'}`}>
        <div className="flex-shrink-0 pb-2 pl-2">
            <Plus className={`w-7 h-7 rounded-full p-1.5 cursor-pointer ${isDarkMode ? 'bg-[#3A3A3C] text-gray-400' : 'bg-gray-200 text-gray-400'}`} />
        </div>
        
        <div className={`flex-1 min-h-[36px] border rounded-full px-4 py-1.5 flex items-center justify-between ${isDarkMode ? 'border-[#3A3A3C] bg-[#1C1C1E]' : 'border-gray-300 bg-white'}`}>
            <span className={`text-[16px] ${isDarkMode ? 'text-white' : 'text-gray-400'}`}>iMessage</span>
            <div className="rounded-full bg-blue-500 p-1 flex items-center justify-center">
                 <ArrowUp className="w-3 h-3 text-white font-bold" strokeWidth={3} />
            </div>
        </div>

        <div className="flex-shrink-0 pb-1.5 pr-2">
             <Mic className="w-6 h-6 text-gray-500" />
        </div>
      </div>
    </div>
  );
};
