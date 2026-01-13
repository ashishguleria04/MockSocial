"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { ArrowLeft, Video, Phone, MoreHorizontal, Image as ImageIcon, Smile, Type, Send, Paperclip } from "lucide-react";

export const TeamsSkin = () => {
    const { contact, messages } = useChatStore();

    return (
        <div className="flex flex-col h-full bg-[#f5f5f5] font-sans">
            {/* Header */}
            <div className="flex items-center justify-between px-3 pt-12 pb-2 bg-white shadow-sm border-b border-[#e1e1e1] z-10 sticky top-0">
                <div className="flex items-center gap-3">
                    <ArrowLeft className="w-5 h-5 text-[#616161]" />
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden relative">
                             {contact.avatar ? (
                                <img src={contact.avatar} alt="Profile" className="w-full h-full object-cover" />
                             ) : (
                                <div className="w-full h-full bg-[#5b5fc7] flex items-center justify-center text-white font-bold text-xs uppercase">
                                    {contact.name.slice(0, 2)}
                                </div>
                             )}
                             <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-[14px] text-[#242424] leading-tight">{contact.name}</span>
                            <span className="text-[10px] text-[#616161]">Available</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-[#5b5fc7]">
                    <Video className="w-5 h-5" />
                    <Phone className="w-5 h-5" />
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
                 <div className="flex justify-center mb-2">
                     <span className="text-[12px] text-[#616161] font-medium">Yesterday</span>
                 </div>
                 
                 {messages.map((msg, index) => {
                     const isMe = msg.sender === 'me';
                     return (
                         <div key={msg.id} className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}>
                             <div className={`flex flex-col max-w-[80%] ${isMe ? "items-end" : "items-start"}`}>
                                 <div className="flex items-center gap-2 mb-1">
                                     <span className="text-[10px] text-[#616161] font-semibold">{isMe ? 'You' : contact.name.split(' ')[0]}</span>
                                     <span className="text-[10px] text-[#616161]">{msg.time}</span>
                                 </div>
                                 <div 
                                    className={`
                                        px-3 py-2 text-[14px] leading-relaxed shadow-sm
                                        ${isMe 
                                            ? "bg-[#e8ebfa] text-[#242424] border border-[#d1dbe0]" 
                                            : "bg-white text-[#242424] border border-[#e1e1e1]"}
                                    `}
                                    style={{
                                        borderRadius: '4px',
                                        // Teams bubbles are slightly rectangular with small radius
                                    }}
                                >
                                     {msg.text}
                                 </div>
                             </div>
                         </div>
                     );
                 })}
            </div>

            {/* Footer */}
            <div className="px-3 pb-8 pt-2 bg-[#f5f5f5] z-20">
                <div className="bg-white border border-[#e1e1e1] rounded-lg shadow-sm">
                    {/* Toolbar */}
                    <div className="flex items-center gap-1 p-2 border-b border-[#f0f0f0] overflow-x-auto scrollbar-hide">
                         <button className="p-1 hover:bg-[#f5f5f5] rounded text-[#424242]"><Type className="w-4 h-4" /></button>
                         <button className="p-1 hover:bg-[#f5f5f5] rounded text-[#424242] opacity-50"><span className="font-bold">B</span></button>
                         <button className="p-1 hover:bg-[#f5f5f5] rounded text-[#424242] opacity-50"><span className="italic">I</span></button>
                         <button className="p-1 hover:bg-[#f5f5f5] rounded text-[#424242] opacity-50"><span className="underline">U</span></button>
                         <div className="w-px h-4 bg-gray-200 mx-1" />
                         <button className="p-1 hover:bg-[#f5f5f5] rounded text-[#424242]"><Paperclip className="w-4 h-4 rotate-45" /></button>
                         <div className="flex-1" />
                    </div>
                    
                    <div className="px-3 py-2">
                        <textarea 
                            className="w-full min-h-[40px] text-[14px] outline-none resize-none placeholder-gray-400"
                            placeholder="Type a new message"
                            rows={1}
                        />
                    </div>

                    <div className="flex items-center justify-between px-2 pb-2">
                        <div className="flex items-center gap-1">
                            {/* Emoji, GIF, Sticker */}
                            <button className="p-1.5 hover:bg-[#f5f5f5] rounded text-[#616161]"><Smile className="w-5 h-5" /></button>
                            <button className="p-1.5 hover:bg-[#f5f5f5] rounded text-[#616161]"><ImageIcon className="w-5 h-5" /></button>
                            <button className="p-1.5 hover:bg-[#f5f5f5] rounded text-[#616161]"><span className="border border-current rounded text-[10px] px-1 font-bold">GIF</span></button>
                        </div>
                        <button className="p-1.5 hover:bg-[#f5f5f5] rounded text-[#5b5fc7]">
                            <Send className="w-5 h-5 fill-current rotate-45 mr-1 mb-1" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
