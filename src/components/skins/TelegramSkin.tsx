"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { ArrowLeft, MoreVertical, Paperclip, Smile, Mic, Send } from "lucide-react";

export const TelegramSkin = () => {
    const { contact, messages, isDarkMode, wallpaper } = useChatStore();

    return (
        <div className={`flex flex-col h-full relative font-sans ${wallpaper ? 'bg-transparent' : (isDarkMode ? 'bg-[#0f0f0f]' : 'bg-[#708499]')}`}>
             {/* Background Pattern Overlay - Hide if custom wallpaper is set */}
             {!wallpaper && (
                <div className="absolute inset-0 z-0 opacity-40 bg-repeat bg-[url('https://telegram.org/file/811140600/1/9Na5yWbdS9w.287958/395627254c41461622')] bg-[length:400px]" />
             )}

            {/* Header */}
            <div className={`flex items-center justify-between px-4 pt-12 pb-2 z-10 shadow-sm shrink-0 ${isDarkMode ? 'bg-[#212121] text-white' : 'bg-white text-gray-900'}`}>
                <div className="flex items-center gap-4 flex-1">
                    <ArrowLeft className={`w-6 h-6 cursor-pointer ${isDarkMode ? 'text-white' : 'text-gray-500'}`} />
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        {contact.avatar ? (
                            <img src={contact.avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-lg">
                                {contact.name.charAt(0)}
                            </div>
                        )}
                        <div className="flex flex-col overflow-hidden">
                            <span className={`font-semibold text-[16px] leading-tight truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{contact.name}</span>
                            <span className={`text-[13px] font-normal truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>last seen recently</span>
                        </div>
                    </div>
                </div>
                <MoreVertical className={`w-6 h-6 cursor-pointer ${isDarkMode ? 'text-white' : 'text-gray-500'}`} />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 relative z-0 pb-4">
                 {/* Date Header */}
                 <div className="flex justify-center my-2 sticky top-2 z-10">
                     <span className="bg-[#00000040] text-white px-2.5 py-0.5 rounded-full text-[12px] font-medium backdrop-blur-sm">
                         January 12
                     </span>
                 </div>

                 {messages.map((msg) => {
                     const isMe = msg.sender === 'me';
                     return (
                         <div key={msg.id} className={`flex w-full ${isMe ? "justify-end" : "justify-start"} mb-1`}>
                             <div 
                                className={`
                                    relative px-3 py-1.5 min-w-[80px] max-w-[75%] rounded-lg shadow-sm text-[15px] leading-snug
                                    ${isMe 
                                        ? (isDarkMode ? "bg-[#2b5278] text-white" : "bg-[#eeffde] text-black") 
                                        : (isDarkMode ? "bg-[#182533] text-white" : "bg-white text-black")
                                    }
                                `}
                                style={{
                                    borderRadius: '12px',
                                    borderBottomRightRadius: isMe ? '4px' : '12px',
                                    borderBottomLeftRadius: !isMe ? '4px' : '12px'
                                }}
                             >
                                 <div className="pb-3 break-words whitespace-pre-wrap">
                                     {msg.text}
                                 </div>
                                 <div className={`absolute bottom-1 right-2 flex items-center gap-1 ${isMe ? (isDarkMode ? "text-[#8faabf]" : "text-[#59a648]") : (isDarkMode ? "text-[#5e778a]" : "text-[#aeb5bc]")}`}>
                                     <span className="text-[11px] font-normal">{msg.time}</span>
                                     {isMe && (
                                         // Telegram double check
                                         <svg viewBox="0 0 18 18" className="w-3.5 h-3.5 fill-current">
                                             <path d="M16.035 3.32a.774.774 0 00-1.096-.002l-8.52 8.65-3.054-2.903a.774.774 0 10-1.077 1.135l3.635 3.454a.774.774 0 001.118-.022l9.043-9.186a.774.774 0 00-.05-1.127z" />
                                         </svg>
                                     )}
                                 </div>

                                 {/* Tail SVG */}
                                 {isMe && (
                                     <svg className={`absolute -bottom-[0px] -right-[7px] w-3 h-3 fill-current ${isDarkMode ? "text-[#2b5278]" : "text-[#eeffde]"}`} viewBox="0 0 10 10">
                                         <path d="M0,0 L0,10 L10,10 C5,10 2,8 0,0 Z" />
                                     </svg>
                                 )}
                                 {!isMe && (
                                      <svg className={`absolute -bottom-[0px] -left-[7px] w-3 h-3 fill-current transform scale-x-[-1] ${isDarkMode ? "text-[#182533]" : "text-white"}`} viewBox="0 0 10 10">
                                          <path d="M0,0 L0,10 L10,10 C5,10 2,8 0,0 Z" />
                                      </svg>
                                 )}
                             </div>
                         </div>
                     );
                 })}
            </div>

            {/* Footer */}
            <div className={`px-2 pt-2 pb-8 flex items-center gap-2 z-10 border-t ${isDarkMode ? 'bg-[#212121] border-black/20' : 'bg-white border-gray-100'}`}>
                <button className={`p-2 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}>
                     <Paperclip className="w-6 h-6 -rotate-45" strokeWidth={1.5} />
                </button>
                <div className="flex-1 bg-transparent">
                     <input 
                        type="text" 
                        placeholder="Message" 
                        className={`w-full h-10 outline-none text-[16px] placeholder:text-gray-400 bg-transparent ${isDarkMode ? 'text-white' : 'text-black'}`}
                    />
                </div>
                <button className={`p-2 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}>
                     <Smile className="w-6 h-6" strokeWidth={1.5} />
                </button>
                <button className={`p-2 transition-colors ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-600'}`}>
                     {messages.length > 0 ? <Send className="w-6 h-6 fill-current" /> : <Mic className="w-6 h-6" strokeWidth={2} />}
                </button>
            </div>
        </div>
    );
};
