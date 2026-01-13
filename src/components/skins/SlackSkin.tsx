"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { Info, Plus, Smile, AtSign, Video, Mic, Search } from "lucide-react";

export const SlackSkin = () => {
    const { contact, messages } = useChatStore();

    return (
        <div className="flex flex-col h-full bg-white font-sans text-[#1d1c1d]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-12 pb-3 bg-white border-b border-gray-200 z-10 sticky top-0 shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-400 rounded flex items-center justify-center text-white font-bold text-xs relative overflow-hidden">
                        {contact.avatar && <img src={contact.avatar} className="w-full h-full object-cover" />}
                        {!contact.avatar && "#"}
                    </div>
                    <span className="font-bold text-[18px] text-[#1d1c1d] leading-tight">{contact.name}</span>
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-0.5"></div>
                </div>
                <div className="flex items-center gap-4 text-gray-500">
                    <span className="w-7 h-7 rounded hover:bg-gray-100 flex items-center justify-center cursor-pointer border border-gray-300">
                        <span className="font-bold text-xs">12</span>
                    </span>
                    <Info className="w-5 h-5" />
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-2">
                 {/* Date Divider */}
                <div className="relative py-4 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative bg-white px-4">
                        <button className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1 text-[13px] font-bold text-[#1d1c1d] hover:bg-gray-50 shadow-sm">
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
                         <div key={msg.id} className={`group flex gap-2.5 ${!isGrouped ? 'mt-2' : '-mt-1'} hover:bg-gray-50 -mx-5 px-5 py-1`}>
                             {/* Avatar Column */}
                             <div className="w-9 shrink-0">
                                 {!isGrouped ? (
                                     <div className="w-9 h-9 rounded bg-blue-600 overflow-hidden">
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
                                     <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 w-full text-right block mt-1">
                                         {msg.time.split(' ')[0]}
                                     </span>
                                 )}
                             </div>

                             {/* Content Column */}
                             <div className="flex-1 min-w-0">
                                 {!isGrouped && (
                                     <div className="flex items-center gap-2 mb-0.5">
                                         <span className="font-black text-[15px]">{isMe ? 'You' : contact.name}</span>
                                         <span className="text-[12px] text-gray-500">{msg.time}</span>
                                     </div>
                                 )}
                                 <p className="text-[15px] leading-[1.46668] text-[#1d1c1d]">{msg.text}</p>
                             </div>
                         </div>
                     );
                 })}
            </div>

            {/* Footer - Input Box */}
            <div className="px-4 pb-8 pt-2 bg-white z-20">
                <div className="border border-gray-300 rounded-xl overflow-hidden shadow-sm focus-within:ring-1 focus-within:ring-black focus-within:border-black transition-all">
                    {/* Toolbar */}
                    <div className="bg-[#f8f8f8] px-2 py-1.5 flex items-center gap-1 border-b border-gray-200">
                        <button className="p-1 hover:bg-gray-200 rounded"><span className="font-bold font-serif px-1">B</span></button>
                        <button className="p-1 hover:bg-gray-200 rounded"><span className="italic font-serif px-1">I</span></button>
                        <button className="p-1 hover:bg-gray-200 rounded"><span className="line-through px-1">S</span></button>
                        <div className="w-px h-4 bg-gray-300 mx-1"></div>
                        <button className="p-1 hover:bg-gray-200 rounded flex gap-1 items-center px-1"><span className="text-[10px]">Link</span></button>
                    </div>
                    
                    <textarea 
                        className="w-full min-h-[40px] p-3 text-[15px] outline-none resize-none"
                        placeholder={`Message ${contact.name}`}
                        rows={1}
                    />

                    <div className="flex items-center justify-between px-2 pb-2">
                        <div className="flex items-center gap-1">
                             <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500">
                                 <Plus className="w-4 h-4" />
                             </button>
                             <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500">
                                 <Video className="w-4 h-4" />
                             </button>
                             <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500">
                                 <Mic className="w-4 h-4" />
                             </button>
                             <div className="w-px h-4 bg-gray-300 mx-1"></div>
                             <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500">
                                 <AtSign className="w-4 h-4" />
                             </button>
                             <button className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500">
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
