"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { Hash, Phone, Video, Users, Search, PlusCircle, Gift, Sticker, Smile, Send } from "lucide-react";

export const DiscordSkin = () => {
    const { contact, messages } = useChatStore();

    return (
        <div className="flex flex-col h-full bg-[#313338] text-[#dbdee1] font-sans">
             {/* Header */}
             <div className="flex items-center justify-between px-4 pt-12 pb-3 bg-[#313338] border-b border-[#26272d] shadow-sm shrink-0">
                 <div className="flex items-center gap-3 overflow-hidden">
                     <div className="w-6 h-6 hidden">
                         <Hash className="w-6 h-6 text-[#80848e]" />
                     </div>
                     <span className="font-bold text-[16px] text-white truncate">@ {contact.name}</span>
                     {/* Online Status Indicator usually next to name in DMs or list, but top header is simple */}
                     <div className="w-2.5 h-2.5 bg-[#23a559] rounded-full mx-1"></div>
                 </div>
                 <div className="flex items-center gap-5 text-[#b5bac1]">
                     <Phone className="w-6 h-6 hover:text-white cursor-pointer" />
                     <Video className="w-6 h-6 hover:text-white cursor-pointer" />
                     <Users className="w-6 h-6 hover:text-white cursor-pointer" />
                 </div>
             </div>

             {/* Messages */}
             <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-0.5 scrollbar-thin scrollbar-thumb-[#1a1b1e] scrollbar-track-[#2b2d31]">
                {/* Introduction Placeholder */}
                 <div className="mt-4 mb-8 flex flex-col gap-2">
                     <div className="w-[80px] h-[80px] rounded-full bg-gray-500 mb-2 overflow-hidden">
                        {contact.avatar ? <img src={contact.avatar} className="w-full h-full object-cover" /> : null}
                     </div>
                     <h3 className="text-2xl font-bold text-white max-w-full truncate">{contact.name}</h3>
                     <p className="text-[#b5bac1] text-sm">This is the beginning of your direct message history with <span className="font-semibold text-white">@{contact.name}</span>.</p>
                 </div>

                 {/* Date Divider */}
                 <div className="flex items-center gap-4 my-2">
                     <div className="h-[1px] bg-[#3f4147] flex-1" />
                     <span className="text-[12px] font-semibold text-[#949ba4]">Today</span>
                     <div className="h-[1px] bg-[#3f4147] flex-1" />
                 </div>

                 {messages.map((msg, index) => {
                     const isMe = msg.sender === 'me';
                     const prevMsg = messages[index - 1];
                     // Check if previous message exists and was sent by same person to group
                     const isGrouped = prevMsg && prevMsg.sender === msg.sender;
                     
                     // Helper to format time for hover/tooltip, or standard display
                     // Discord typically shows time next to name for first msg, and on hover to left for subsequent
                     
                     return (
                         <div 
                            key={msg.id} 
                            className={`
                                group flex items-start gap-4 py-0.5 pr-4 pl-0 -ml-2 -mr-2 hover:bg-[#2e3035] rounded px-2
                                ${!isGrouped ? 'mt-3.5' : ''}
                            `}
                        >
                             {/* Avatar Column */}
                             <div className="w-10 shrink-0 flex justify-center cursor-pointer select-none">
                                 {!isGrouped ? (
                                    <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden hover:opacity-80 transition-opacity mt-0.5">
                                        {isMe ? (
                                             <div className="w-full h-full bg-[#f23f43] flex items-center justify-center text-white font-bold text-xs">ME</div>
                                        ) : contact.avatar ? (
                                            <img src={contact.avatar} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-[#5865f2] flex items-center justify-center text-white font-bold text-xs">
                                                {contact.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                 ) : (
                                     <span className="text-[10px] text-[#949ba4] hidden group-hover:block mt-1.5 w-full text-right pr-1">
                                         {msg.time.split(' ')[0]} 
                                     </span>
                                 )}
                             </div>

                             {/* Content Column */}
                             <div className="flex-1 min-w-0">
                                 {!isGrouped && (
                                     <div className="flex items-center gap-2 mb-0.5">
                                         <span className={`font-medium text-[16px] hover:underline cursor-pointer ${isMe ? 'text-white' : 'text-white'}`}>
                                             {isMe ? 'You' : contact.name}
                                         </span>
                                         <span className="text-[12px] text-[#949ba4] font-medium ml-0.5">
                                             Today at {msg.time}
                                         </span>
                                     </div>
                                 )}
                                 <p className={`text-[15px] leading-[1.375rem] text-[#dbdee1] whitespace-pre-wrap ${!isGrouped ? '' : ''}`}>
                                     {msg.text}
                                 </p>
                             </div>
                         </div>
                     );
                 })}
             </div>

             {/* Footer */}
             <div className="px-4 pt-0 pb-8 bg-[#313338] shrink-0 z-20">
                 <div className="bg-[#383a40] rounded-lg flex items-center px-4 py-2.5">
                     <div className="bg-[#b5bac1] rounded-full p-0.5 mr-3 cursor-pointer hover:text-white text-[#313338]">
                         <PlusCircle className="w-5 h-5 fill-current" />
                     </div>
                     <input 
                         type="text" 
                         placeholder={`Message @${contact.name}`}
                         className="bg-transparent border-none outline-none flex-1 text-[#dbdee1] placeholder:text-[#949ba4] text-[15px]"
                     />
                     <div className="flex items-center gap-3 text-[#b5bac1]">
                         <Gift className="w-6 h-6 hover:text-[#dbdee1] cursor-pointer" />
                         <Sticker className="w-6 h-6 hover:text-[#dbdee1] cursor-pointer" />
                         <Smile className="w-6 h-6 hover:text-[#dbdee1] cursor-pointer" />
                     </div>
                 </div>
             </div>
        </div>
    );
};
