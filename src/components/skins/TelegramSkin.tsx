"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { ArrowLeft, MoreVertical, Paperclip, Smile, Mic, Send } from "lucide-react";

export const TelegramSkin = () => {
    const { contact, messages } = useChatStore();

    return (
        <div className="flex flex-col h-full bg-[#708499] relative font-sans">
             {/* Background Pattern Overlay */}
             <div className="absolute inset-0 z-0 opacity-40 bg-repeat bg-[url('https://telegram.org/file/811140600/1/9Na5yWbdS9w.287958/395627254c41461622')] bg-[length:400px]" />

            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-12 pb-2 bg-white z-10 shadow-sm shrink-0">
                <div className="flex items-center gap-4 flex-1">
                    <ArrowLeft className="w-6 h-6 text-gray-500 cursor-pointer" />
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        {contact.avatar ? (
                            <img src={contact.avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-lg">
                                {contact.name.charAt(0)}
                            </div>
                        )}
                        <div className="flex flex-col overflow-hidden">
                            <span className="font-semibold text-[16px] text-gray-900 leading-tight truncate">{contact.name}</span>
                            <span className="text-[13px] text-gray-500 font-normal truncate">last seen recently</span>
                        </div>
                    </div>
                </div>
                {/* No other icons usually in this view besides overflow, maybe call */}
                 {/* Only overflow usually on right for basic chats */}
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
                                    ${isMe ? "bg-[#eeffde] text-black" : "bg-white text-black"}
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
                                 <div className={`absolute bottom-1 right-2 flex items-center gap-1 ${isMe ? "text-[#59a648]" : "text-[#aeb5bc]"}`}>
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
                                     <svg className="absolute -bottom-[0px] -right-[7px] w-3 h-3 text-[#eeffde] fill-current" viewBox="0 0 10 10">
                                         <path d="M0,0 L0,10 L10,10 C5,10 2,8 0,0 Z" />
                                     </svg>
                                 )}
                                 {!isMe && (
                                      <svg className="absolute -bottom-[0px] -left-[7px] w-3 h-3 text-white fill-current transform scale-x-[-1]" viewBox="0 0 10 10">
                                          <path d="M0,0 L0,10 L10,10 C5,10 2,8 0,0 Z" />
                                      </svg>
                                 )}
                             </div>
                         </div>
                     );
                 })}
            </div>

            {/* Footer */}
            <div className="px-2 pt-2 pb-8 bg-white flex items-center gap-2 z-10 border-t border-gray-100">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                     <Paperclip className="w-6 h-6 -rotate-45" strokeWidth={1.5} />
                </button>
                <div className="flex-1 bg-transparent">
                     <input 
                        type="text" 
                        placeholder="Message" 
                        className="w-full h-10 outline-none text-[16px] placeholder:text-gray-400"
                    />
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                     <Smile className="w-6 h-6" strokeWidth={1.5} />
                </button>
                <button className="p-2 text-blue-500 hover:text-blue-600 transition-colors">
                     {messages.length > 0 ? <Send className="w-6 h-6 fill-current" /> : <Mic className="w-6 h-6" strokeWidth={2} />}
                </button>
            </div>
        </div>
    );
};
