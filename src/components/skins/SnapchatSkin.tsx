"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { Camera, Gamepad2, Smile, MessageCircle, Phone, Video, ChevronRight } from "lucide-react";

export const SnapchatSkin = () => {
    const { contact, messages, isDarkMode } = useChatStore();

    return (
        <div className={`flex flex-col h-full font-sans font-medium ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
            {/* Header */}
            <div className={`flex items-center justify-between px-4 pt-12 pb-2 backdrop-blur-md border-b-[0.5px] z-10 sticky top-0 shadow-sm ${isDarkMode ? 'bg-black/90 border-gray-800' : 'bg-white/90 border-gray-200'}`}>
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full p-0.5 overflow-hidden ring-2 ring-transparent transition-all cursor-pointer ${isDarkMode ? 'bg-gray-800 hover:ring-[#FFFC00]' : 'bg-gray-100 hover:ring-[#FFFC00]'}`}>
                        {contact.avatar ? (
                            <img src={contact.avatar} alt="Bitmoji" className="w-full h-full object-cover rounded-full" />
                        ) : (
                            // Placeholder Bitmoji-like generic
                            <div className={`w-full h-full flex items-center justify-center text-blue-400 ${isDarkMode ? 'bg-[#1e2a38]' : 'bg-[#e6f2fa]'}`}>
                                <Smile className="w-6 h-6" />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className={`font-bold text-[17px] leading-tight tracking-wide ${isDarkMode ? 'text-white' : 'text-black'}`}>{contact.name}</span>
                        <div className="flex items-center gap-1">
                             <span className="text-[12px] text-gray-500 font-semibold tracking-wide uppercase">Snapchat</span>
                             <div className="w-1 h-1 rounded-full bg-gray-300" />
                             <span className="text-[12px] text-gray-400 font-semibold">10k Score</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-gray-500">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        <Phone className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-black'}`} fill="currentColor" strokeWidth={0} />
                    </div>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        <Video className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-black'}`} fill="currentColor" strokeWidth={0} />
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
                                        ${isDarkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-50'}
                                    `}
                                 >
                                    <span className={`block font-medium ${isMe ? 'text-[#d64161]' : 'text-[#2196f3]'}`}>
                                        {isMe ? 'ME' : contact.name.toUpperCase()}
                                    </span>
                                    <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {msg.text}
                                    </span>
                                 </div>
                             </div>
                         </div>
                     );
                 })}
            </div>

            {/* Footer */}
            <div className={`px-3 pb-8 pt-2 sticky bottom-0 z-20 w-full border-t flex items-center justify-between gap-3 ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-100'}`}>
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-gray-600 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                      <Camera className="w-6 h-6" />
                 </div>
                 
                 <div className={`flex-1 min-h-[44px] rounded-full flex items-center px-5 relative group ring-1 ring-transparent transition-all ${isDarkMode ? 'bg-gray-800 focus-within:ring-gray-600' : 'bg-gray-100 focus-within:ring-gray-300'}`}>
                      <input 
                         type="text" 
                         placeholder="Send a chat"
                         className={`bg-transparent border-none outline-none w-full text-[16px] font-medium placeholder:text-gray-500 h-full ${isDarkMode ? 'text-white' : 'text-black'}`}
                      />
                      <div className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                          <Smile className="w-6 h-6 text-gray-500" />
                      </div>
                 </div>

                 <div className="flex items-center gap-2">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-gray-600 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                          <Gamepad2 className="w-6 h-6" />
                     </div>
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-gray-600 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                          <MessageCircle className="w-6 h-6" />
                     </div>
                 </div>
            </div>
        </div>
    );
};
