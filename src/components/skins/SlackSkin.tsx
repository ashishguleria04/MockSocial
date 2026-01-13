"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { Info, Plus, Smile, AtSign, Video, Mic, Search } from "lucide-react";

export const SlackSkin = () => {
    const { contact, messages, isDarkMode } = useChatStore();

    return (
        <div className={`flex flex-col h-full font-sans ${isDarkMode ? 'bg-[#1a1d21] text-[#d1d2d3]' : 'bg-white text-[#1d1c1d]'}`}>
            {/* Header */}
            <div className={`flex items-center justify-between px-4 pt-12 pb-3 border-b z-10 sticky top-0 shadow-sm ${isDarkMode ? 'bg-[#1a1d21] border-[#373a3e]' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-400 rounded flex items-center justify-center text-white font-bold text-xs relative overflow-hidden">
                        {contact.avatar && <img src={contact.avatar} className="w-full h-full object-cover" />}
                        {!contact.avatar && "#"}
                    </div>
                    <span className={`font-bold text-[18px] leading-tight ${isDarkMode ? 'text-[#d1d2d3]' : 'text-[#1d1c1d]'}`}>{contact.name}</span>
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-0.5"></div>
                </div>
                <div className={`flex items-center gap-4 ${isDarkMode ? 'text-[#ababad]' : 'text-gray-500'}`}>
                    <span className={`w-7 h-7 rounded flex items-center justify-center cursor-pointer border ${isDarkMode ? 'hover:bg-[#222529] border-[#565856]' : 'hover:bg-gray-100 border-gray-300'}`}>
                        <span className="font-bold text-xs">12</span>
                    </span>
                    <Info className="w-5 h-5" />
                </div>
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-2 ${isDarkMode ? 'scrollbar-thin scrollbar-thumb-gray-600' : ''}`}>
                 {/* Date Divider */}
                <div className="relative py-4 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                        <div className={`w-full border-t ${isDarkMode ? 'border-[#373a3e]' : 'border-gray-200'}`}></div>
                    </div>
                    <div className={`relative px-4 ${isDarkMode ? 'bg-[#1a1d21]' : 'bg-white'}`}>
                        <button className={`flex items-center gap-1 border rounded-full px-3 py-1 text-[13px] font-bold shadow-sm ${isDarkMode ? 'border-[#565856] text-[#d1d2d3] hover:bg-[#222529]' : 'border-gray-300 text-[#1d1c1d] hover:bg-gray-50'}`}>
                            Today
                            <span className="text-[10px] rotate-90">›</span>
                        </button>
                    </div>
                </div>

                 {messages.map((msg, index) => {
                     const isMe = msg.sender === 'me';
                     const prevMsg = messages[index - 1];
                     // Slack groups messages by same user if within close time
                     const isGrouped = prevMsg && prevMsg.sender === msg.sender;
                     
                     // Slack message format
                     return (
                         <div key={msg.id} className={`group flex gap-2.5 ${!isGrouped ? 'mt-2' : '-mt-1'} ${isDarkMode ? 'hover:bg-[#222529]' : 'hover:bg-gray-50'} -mx-5 px-5 py-1`}>
                             {/* Avatar Column */}
                             <div className="w-9 shrink-0">
                                 {!isGrouped ? (
                                     <div className={`w-9 h-9 rounded overflow-hidden ${isDarkMode ? 'bg-[#3f0e40]' : 'bg-blue-600'}`}>
                                         {isMe ? (
                                             <div className="w-full h-full bg-[#3f0e40] flex items-center justify-center text-white font-bold text-xs">You</div>
                                         ) : contact.avatar ? (
                                             <img src={contact.avatar} className="w-full h-full object-cover" />
                                         ) : (
                                             <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white font-bold text-sm">
                                                 {contact.name.charAt(0)}
                                             </div>
                                         )}
                                     </div>
                                 ) : (
                                     <span className={`text-[10px] opacity-0 group-hover:opacity-100 w-full text-right block mt-1 ${isDarkMode ? 'text-[#ababad]' : 'text-gray-400'}`}>
                                         {msg.time.split(' ')[0]}
                                     </span>
                                 )}
                             </div>

                             {/* Content Column */}
                             <div className="flex-1 min-w-0">
                                 {!isGrouped && (
                                     <div className="flex items-center gap-2 mb-0.5">
                                         <span className="font-black text-[15px]">{isMe ? 'You' : contact.name}</span>
                                         <span className={`text-[12px] ${isDarkMode ? 'text-[#ababad]' : 'text-gray-500'}`}>{msg.time}</span>
                                     </div>
                                 )}
                                 <p className={`text-[15px] leading-[1.46668] ${isDarkMode ? 'text-[#d1d2d3]' : 'text-[#1d1c1d]'}`}>{msg.text}</p>
                             </div>
                         </div>
                     );
                 })}
            </div>

            {/* Footer - Input Box */}
            <div className={`px-4 pb-8 pt-2 z-20 ${isDarkMode ? 'bg-[#1a1d21]' : 'bg-white'}`}>
                <div className={`border rounded-xl overflow-hidden shadow-sm transition-all focus-within:ring-1 ${isDarkMode ? 'border-[#565856] focus-within:ring-[#d1d2d3] focus-within:border-[#d1d2d3]' : 'border-gray-300 focus-within:ring-black focus-within:border-black'}`}>
                    {/* Toolbar */}
                    <div className={`px-2 py-1.5 flex items-center gap-1 border-b ${isDarkMode ? 'bg-[#222529] border-[#373a3e]' : 'bg-[#f8f8f8] border-gray-200'}`}>
                        <button className={`p-1 rounded ${isDarkMode ? 'hover:bg-[#35373b]' : 'hover:bg-gray-200'}`}><span className={`font-bold font-serif px-1 ${isDarkMode ? 'text-[#d1d2d3]' : ''}`}>B</span></button>
                        <button className={`p-1 rounded ${isDarkMode ? 'hover:bg-[#35373b]' : 'hover:bg-gray-200'}`}><span className={`italic font-serif px-1 ${isDarkMode ? 'text-[#d1d2d3]' : ''}`}>I</span></button>
                        <button className={`p-1 rounded ${isDarkMode ? 'hover:bg-[#35373b]' : 'hover:bg-gray-200'}`}><span className={`line-through px-1 ${isDarkMode ? 'text-[#d1d2d3]' : ''}`}>S</span></button>
                        <div className={`w-px h-4 mx-1 ${isDarkMode ? 'bg-[#565856]' : 'bg-gray-300'}`}></div>
                        <button className={`p-1 rounded flex gap-1 items-center px-1 ${isDarkMode ? 'hover:bg-[#35373b] text-[#d1d2d3]' : 'hover:bg-gray-200'}`}><span className="text-[10px]">Link</span></button>
                    </div>
                    
                    <textarea 
                        className={`w-full min-h-[40px] p-3 text-[15px] outline-none resize-none bg-transparent ${isDarkMode ? 'text-[#d1d2d3] placeholder:text-[#ababad]' : 'text-black placeholder:text-gray-500'}`}
                        placeholder={`Message ${contact.name}`}
                        rows={1}
                    />

                    <div className="flex items-center justify-between px-2 pb-2">
                        <div className="flex items-center gap-1">
                             <button className={`p-1.5 rounded-full ${isDarkMode ? 'text-[#ababad] hover:bg-[#35373b]' : 'text-gray-500 hover:bg-gray-100'}`}>
                                 <Plus className="w-4 h-4" />
                             </button>
                             <button className={`p-1.5 rounded-full ${isDarkMode ? 'text-[#ababad] hover:bg-[#35373b]' : 'text-gray-500 hover:bg-gray-100'}`}>
                                 <Video className="w-4 h-4" />
                             </button>
                             <button className={`p-1.5 rounded-full ${isDarkMode ? 'text-[#ababad] hover:bg-[#35373b]' : 'text-gray-500 hover:bg-gray-100'}`}>
                                 <Mic className="w-4 h-4" />
                             </button>
                             <div className={`w-px h-4 mx-1 ${isDarkMode ? 'bg-[#565856]' : 'bg-gray-300'}`}></div>
                             <button className={`p-1.5 rounded-full ${isDarkMode ? 'text-[#ababad] hover:bg-[#35373b]' : 'text-gray-500 hover:bg-gray-100'}`}>
                                 <AtSign className="w-4 h-4" />
                             </button>
                             <button className={`p-1.5 rounded-full ${isDarkMode ? 'text-[#ababad] hover:bg-[#35373b]' : 'text-gray-500 hover:bg-gray-100'}`}>
                                 <Smile className="w-4 h-4" />
                             </button>
                        </div>
                        <button className="p-2 bg-[#007a5a] text-white rounded hover:bg-[#148567] transition-colors">
                             <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current rotate-90 transform translate-x-0.5"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
