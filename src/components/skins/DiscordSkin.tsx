"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { Hash, Phone, Video, Users, Search, PlusCircle, Gift, Sticker, Smile, Send } from "lucide-react";

export const DiscordSkin = () => {
    const { contact, messages, isDarkMode, wallpaper } = useChatStore();

    return (
        <div className={`flex flex-col h-full font-sans ${wallpaper ? 'bg-transparent' : (isDarkMode ? 'bg-[#313338] text-[#dbdee1]' : 'bg-white text-[#2e3338]')}`}>
             {/* Header */}
             <div className={`flex items-center justify-between px-4 pt-12 pb-3 border-b shadow-sm shrink-0 ${isDarkMode ? 'bg-[#313338] border-[#26272d]' : 'bg-white border-[#e3e5e8]'}`}>
                 <div className="flex items-center gap-3 overflow-hidden">
                     <span className={`font-bold text-[16px] truncate ${isDarkMode ? 'text-white' : 'text-[#060607]'}`}>@ {contact.name}</span>
                     {/* Online Status Indicator */}
                     <div className="w-2.5 h-2.5 bg-[#23a559] rounded-full mx-1"></div>
                 </div>
                 <div className={`flex items-center gap-5 ${isDarkMode ? 'text-[#b5bac1]' : 'text-[#4f5660]'}`}>
                     <Phone className={`w-6 h-6 cursor-pointer ${isDarkMode ? 'hover:text-white' : 'hover:text-[#060607]'}`} />
                     <Video className={`w-6 h-6 cursor-pointer ${isDarkMode ? 'hover:text-white' : 'hover:text-[#060607]'}`} />
                     <Users className={`w-6 h-6 cursor-pointer ${isDarkMode ? 'hover:text-white' : 'hover:text-[#060607]'}`} />
                 </div>
             </div>

             {/* Messages */}
             <div className={`flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-0.5 scrollbar-thin ${isDarkMode ? 'scrollbar-thumb-[#1a1b1e] scrollbar-track-[#2b2d31]' : 'scrollbar-thumb-[#e3e5e8] scrollbar-track-[#f2f3f5]'}`}>
                {/* Introduction Placeholder */}
                 <div className="mt-4 mb-8 flex flex-col gap-2">
                     <div className="w-[80px] h-[80px] rounded-full bg-gray-500 mb-2 overflow-hidden">
                        {contact.avatar ? <img src={contact.avatar} className="w-full h-full object-cover" /> : null}
                     </div>
                     <h3 className={`text-2xl font-bold max-w-full truncate ${isDarkMode ? 'text-white' : 'text-[#060607]'}`}>{contact.name}</h3>
                     <p className={`text-sm ${isDarkMode ? 'text-[#b5bac1]' : 'text-[#5c5e66]'}`}>This is the beginning of your direct message history with <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-[#060607]'}`}>@{contact.name}</span>.</p>
                 </div>

                 {/* Date Divider */}
                 <div className="flex items-center gap-4 my-2">
                     <div className={`h-[1px] flex-1 ${isDarkMode ? 'bg-[#3f4147]' : 'bg-[#e3e5e8]'}`} />
                     <span className={`text-[12px] font-semibold ${isDarkMode ? 'text-[#949ba4]' : 'text-[#949ba4]'}`}>Today</span>
                     <div className={`h-[1px] flex-1 ${isDarkMode ? 'bg-[#3f4147]' : 'bg-[#e3e5e8]'}`} />
                 </div>

                 {messages.map((msg, index) => {
                     const isMe = msg.sender === 'me';
                     const prevMsg = messages[index - 1];
                     const isGrouped = prevMsg && prevMsg.sender === msg.sender;
                     
                     return (
                         <div 
                            key={msg.id} 
                            className={`
                                group flex items-start gap-4 py-0.5 pr-4 pl-0 -ml-2 -mr-2 rounded px-2
                                ${!isGrouped ? 'mt-3.5' : ''}
                                ${isDarkMode ? 'hover:bg-[#2e3035]' : 'hover:bg-[#f2f3f5]'}
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
                                         <span className={`font-medium text-[16px] hover:underline cursor-pointer ${isMe ? (isDarkMode ? 'text-white' : 'text-[#060607]') : (isDarkMode ? 'text-white' : 'text-[#060607]')}`}>
                                             {isMe ? 'You' : contact.name}
                                         </span>
                                         <span className="text-[12px] text-[#949ba4] font-medium ml-0.5">
                                             Today at {msg.time}
                                         </span>
                                     </div>
                                 )}
                                 <p className={`text-[15px] leading-[1.375rem] whitespace-pre-wrap ${isDarkMode ? 'text-[#dbdee1]' : 'text-[#2e3338]'}`}>
                                     {msg.text}
                                 </p>
                             </div>
                         </div>
                     );
                 })}
             </div>

             {/* Footer */}
             <div className={`px-4 pt-0 pb-8 shrink-0 z-20 ${isDarkMode ? 'bg-[#313338]' : 'bg-white'}`}>
                 <div className={`rounded-lg flex items-center px-4 py-2.5 ${isDarkMode ? 'bg-[#383a40]' : 'bg-[#ebedef]'}`}>
                     <div className={`rounded-full p-0.5 mr-3 cursor-pointer ${isDarkMode ? 'bg-[#b5bac1] text-[#313338] hover:text-white' : 'bg-[#4f5660] text-white hover:text-[#e3e5e8]'}`}>
                         <PlusCircle className="w-5 h-5 fill-current" />
                     </div>
                     <input 
                         type="text" 
                         placeholder={`Message @${contact.name}`}
                         className={`bg-transparent border-none outline-none flex-1 text-[15px] ${isDarkMode ? 'text-[#dbdee1] placeholder:text-[#949ba4]' : 'text-[#2e3338] placeholder:text-[#5c5e66]'}`}
                     />
                     <div className={`flex items-center gap-3 ${isDarkMode ? 'text-[#b5bac1]' : 'text-[#4f5660]'}`}>
                         <Gift className={`w-6 h-6 cursor-pointer ${isDarkMode ? 'hover:text-[#dbdee1]' : 'hover:text-[#313338]'}`} />
                         <Sticker className={`w-6 h-6 cursor-pointer ${isDarkMode ? 'hover:text-[#dbdee1]' : 'hover:text-[#313338]'}`} />
                         <Smile className={`w-6 h-6 cursor-pointer ${isDarkMode ? 'hover:text-[#dbdee1]' : 'hover:text-[#313338]'}`} />
                     </div>
                 </div>
             </div>
        </div>
    );
};
