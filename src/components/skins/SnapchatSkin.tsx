"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { Camera, Gamepad2, Smile, MessageCircle, Phone, Video, ChevronRight } from "lucide-react";

export const SnapchatSkin = () => {
    const { contact, messages } = useChatStore();

    return (
        <div className="flex flex-col h-full bg-white font-sans font-medium">
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-12 pb-2 bg-white/90 backdrop-blur-md border-b-[0.5px] border-gray-200 z-10 sticky top-0 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 p-0.5 overflow-hidden ring-2 ring-transparent hover:ring-[#FFFC00] transition-all cursor-pointer">
                        {contact.avatar ? (
                            <img src={contact.avatar} alt="Bitmoji" className="w-full h-full object-cover rounded-full" />
                        ) : (
                            // Placeholder Bitmoji-like generic
                            <div className="w-full h-full bg-[#e6f2fa] flex items-center justify-center text-blue-400">
                                <Smile className="w-6 h-6" />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-[17px] text-black leading-tight tracking-wide">{contact.name}</span>
                        <div className="flex items-center gap-1">
                             <span className="text-[12px] text-gray-500 font-semibold tracking-wide uppercase">Snapchat</span>
                             <div className="w-1 h-1 rounded-full bg-gray-300" />
                             <span className="text-[12px] text-gray-400 font-semibold">10k Score</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-gray-500">
                    <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                        <Phone className="w-5 h-5 text-black" fill="currentColor" strokeWidth={0} />
                    </div>
                    <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                        <Video className="w-5 h-5 text-black" fill="currentColor" strokeWidth={0} />
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1 w-full relative">
                 {/* Snap Date Header */}
                 <div className="flex justify-center mb-6 mt-2">
                     <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                        Today
                     </span>
                 </div>

                 {messages.map((msg, index) => {
                     const isMe = msg.sender === 'me';
                     const prevMsg = messages[index - 1];
                     const isGrouped = prevMsg && prevMsg.sender === msg.sender;

                     return (
                         <div key={msg.id} className={`flex w-full ${isMe ? "justify-end" : "justify-start"} ${isGrouped ? 'mt-0.5' : 'mt-2'}`}>
                             {/* Vertical Line Indicator (Snapchat style) */}
                             {!isMe && !isGrouped && (
                                <div className={`flex flex-col gap-1 items-center mr-2 self-end w-4 shrink-0`}>
                                     {/* This is a visual approximation of the read strip - omitted for simple text chat view */}
                                </div>
                             )}

                             {/* Message */}
                             <div className={`
                                flex items-center max-w-[85%] 
                                ${isMe ? 'flex-row-reverse' : 'flex-row'}
                             `}>
                                 {/* Border/Line on the side (Saved/Unsaved Indicator in Snap)
                                     Snapchat text messages usually have a thin line when saved.
                                     We will assume "saved" state for visual clarity, giving it a border.
                                 */}
                                 <div 
                                    className={`
                                        cursor-pointer px-3 py-1.5 text-[15px] leading-6 tracking-wide duration-200
                                        ${isMe 
                                            ? "border-r-[3px] border-r-[#d64161] pr-3 text-right" // Red for Me (Snaps usually red/purple)
                                            : "border-l-[3px] border-l-[#2196f3] pl-3 text-left"  // Blue for Chat
                                        }
                                        hover:bg-gray-50
                                    `}
                                 >
                                    <span className={`block font-medium ${isMe ? 'text-[#d64161]' : 'text-[#2196f3]'}`}>
                                        {isMe ? 'ME' : contact.name.toUpperCase()}
                                    </span>
                                    <span className="text-gray-900 font-medium">
                                        {msg.text}
                                    </span>
                                 </div>
                             </div>
                         </div>
                     );
                 })}
            </div>

            {/* Footer */}
            <div className="px-3 pb-8 pt-2 bg-white sticky bottom-0 z-20 w-full border-t border-gray-100 flex items-center justify-between gap-3">
                 <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 text-gray-600">
                      <Camera className="w-6 h-6" />
                 </div>
                 
                 <div className="flex-1 min-h-[44px] bg-gray-100 rounded-full flex items-center px-5 relative group ring-1 ring-transparent focus-within:ring-gray-300 transition-all">
                      <input 
                         type="text" 
                         placeholder="Send a chat"
                         className="bg-transparent border-none outline-none w-full text-[16px] font-medium placeholder:text-gray-500 text-black h-full"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer hover:bg-gray-200">
                          <Smile className="w-6 h-6 text-gray-500" />
                      </div>
                 </div>

                 <div className="flex items-center gap-2">
                     <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 text-gray-600">
                          <Gamepad2 className="w-6 h-6" />
                     </div>
                     <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 text-gray-600">
                          <MessageCircle className="w-6 h-6" />
                     </div>
                 </div>
            </div>
        </div>
    );
};
