"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { ArrowLeft, Phone, Video, Info, Image as ImageIcon, Mic, ThumbsUp, PlusCircle, Smile } from "lucide-react";

export const MessengerSkin = () => {
    const { contact, messages, isDarkMode, wallpaper } = useChatStore();

    return (
        <div className={`flex flex-col h-full font-sans ${wallpaper ? 'bg-transparent' : (isDarkMode ? 'bg-black' : 'bg-white')} ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {/* Header */}
            <div className={`flex items-center justify-between px-4 pt-12 pb-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)] z-10 sticky top-0 ${isDarkMode ? 'bg-black shadow-[0_1px_2px_rgba(255,255,255,0.05)]' : 'bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]'}`}>
                <div className="flex items-center gap-3">
                    <ArrowLeft className={`w-6 h-6 ${isDarkMode ? 'text-[#0084ff]' : 'text-[#0084ff]'}`} />
                    <div className="relative">
                        {contact.avatar ? (
                            <img src={contact.avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg">
                                {contact.name.charAt(0)}
                            </div>
                        )}
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className={`font-semibold text-[17px] leading-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>{contact.name}</span>
                        <span className="text-[12px] text-gray-500 font-normal">Active now</span>
                    </div>
                </div>
                <div className="flex items-center gap-6 text-[#0084ff]">
                    <Phone className="w-[22px] h-[22px] fill-current" />
                    <Video className="w-[26px] h-[26px] fill-current" />
                    <Info className="w-[22px] h-[22px] fill-current" />
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1.5 pt-4">
               {/* Time Separator */}
                <div className="flex justify-center mb-6 mt-2">
                    <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                        Jan 12 at 8:41 PM
                    </span>
                </div>

                {messages.map((msg, index) => {
                    const isMe = msg.sender === 'me';
                    const prevMsg = messages[index - 1];
                    const nextMsg = messages[index + 1];
                    const isLastInGroup = !nextMsg || nextMsg.sender !== msg.sender;
                    const isFirstInGroup = !prevMsg || prevMsg.sender !== msg.sender;

                    return (
                        <div key={msg.id} className={`flex w-full ${isMe ? "justify-end" : "justify-start gap-2"} mb-0.5`}>
                             {!isMe && isLastInGroup && (
                                <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden shrink-0 self-end mb-1">
                                    {contact.avatar ? (
                                        <img src={contact.avatar} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-500">
                                            {contact.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                            )}
                            {!isMe && !isLastInGroup && <div className="w-7 shrink-0" />}

                            <div
                                className={`
                                    px-4 py-2.5 max-w-[70%] text-[15px] leading-snug
                                    ${isMe 
                                        ? "bg-[#0084ff] text-white" 
                                        : (isDarkMode ? "bg-[#303030] text-white" : "bg-[#f0f0f0] text-black")
                                    }
                                `}
                                style={{
                                    borderRadius: '18px',
                                    borderTopRightRadius: isMe && !isFirstInGroup ? '4px' : '18px',
                                    borderBottomRightRadius: isMe && !isLastInGroup ? '4px' : '18px',
                                    borderTopLeftRadius: !isMe && !isFirstInGroup ? '4px' : '18px',
                                    borderBottomLeftRadius: !isMe && !isLastInGroup ? '4px' : '18px',
                                }}
                            >
                                {msg.text}
                            </div>
                            
                            {/* Read Receipt (Mock) - Show only on last message sent by me */}
                            {isMe && index === messages.length - 1 && (
                                <div className="w-3.5 h-3.5 rounded-full bg-gray-200 border border-white overflow-hidden self-end mb-1 ml-1">
                                     {contact.avatar ? (
                                        <img src={contact.avatar || ''} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[6px] font-bold text-gray-500">
                                            {contact.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className={`px-3 pt-2 pb-8 flex items-center gap-3 min-h-[50px] z-20 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                <div className="flex items-center gap-4 text-[#0084ff]">
                    <PlusCircle className="w-6 h-6 fill-current" />
                    <ImageIcon className="w-6 h-6 -ml-1" />
                    <Mic className="w-6 h-6 -ml-1" />
                </div>
                
                <div className={`flex-1 relative rounded-full h-9 flex items-center px-3 ${isDarkMode ? 'bg-[#303030] text-white' : 'bg-[#f0f0f0] text-black'}`}>
                    <input 
                        type="text" 
                        placeholder="Aa" 
                        className={`bg-transparent border-none outline-none w-full text-[15px] placeholder:text-gray-500 ${isDarkMode ? 'text-white' : 'text-black'}`}
                    />
                    <Smile className="w-6 h-6 text-[#0084ff] absolute right-2" />
                </div>

                <div className="text-[#0084ff]">
                     {!messages.length ? <ThumbsUp className="w-6 h-6 fill-current" /> : <ThumbsUp className="w-6 h-6 fill-current" />}
                </div>
            </div>
        </div>
    );
};
