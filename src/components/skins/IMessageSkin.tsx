"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { ChevronLeft, Info, Video, Phone, ArrowUp, Camera, Plus, Mic, AppWindow } from "lucide-react";

export const IMessageSkin = () => {
  const { contact, messages } = useChatStore();

  return (
    <div className="flex flex-col h-full bg-white relative font-sans">
      {/* Header */}
      <div className="pt-12 pb-2 px-4 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-20 flex items-end justify-between transition-all">
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
                 <span className="text-[12px] text-gray-900 font-medium truncate max-w-[150px]">{contact.name}</span>
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
               {/* Avatar for 'them' if it's the last in a group (optional, iMessage doesn't usually show tiny avatars in chat, just header) */}
               
               <div className={`max-w-[70%] relative px-4 py-2 text-[17px] leading-[22px] tracking-tight ${
                   isMe 
                    ? "bg-[#007AFF] text-white" 
                    : "bg-[#E9E9EB] text-black"
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
                       <svg className="absolute -bottom-[0px] -right-[6px] w-4 h-4 text-[#007AFF] fill-current transform scale-x-[-1]" viewBox="0 0 20 20">
                           <path d="M20,20 C20,8.954305 11.045695,0 0,0 C0,0 3.394154,6.790938 7.3235339,12.723805 C9.8631105,16.558296 14.869038,19.261908 20,20 Z" />
                       </svg>
                   )}
                   {showTail && !isMe && (
                       <svg className="absolute -bottom-[0px] -left-[6px] w-4 h-4 text-[#E9E9EB] fill-current" viewBox="0 0 20 20">
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
      <div className="p-2 pb-8 bg-white flex items-end gap-3 z-20">
        <div className="flex-shrink-0 pb-2 pl-2">
            <Plus className="w-7 h-7 text-gray-400 bg-gray-200 rounded-full p-1.5 cursor-pointer" />
        </div>
        
        <div className="flex-1 min-h-[36px] border border-gray-300 rounded-full px-4 py-1.5 flex items-center justify-between">
            <span className="text-[16px] text-gray-400">iMessage</span>
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
