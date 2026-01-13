"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { ArrowLeft, Info, Image as ImageIcon, FileText, Smile, Send, Settings, User } from "lucide-react";

export const XSkin = () => {
    const { contact, messages } = useChatStore();

    return (
        <div className="flex flex-col h-full bg-black text-[#e7e9ea] font-sans">
             {/* Header */}
             <div className="flex items-center justify-between px-3 pt-12 pb-2 bg-black/80 backdrop-blur-md sticky top-0 z-20 border-b border-[#2f3336]">
                 <div className="flex items-center gap-4">
                     <ArrowLeft className="w-5 h-5 text-white" />
                     <div className="flex flex-col">
                         <span className="font-bold text-[17px] text-[#e7e9ea] leading-tight">{contact.name}</span>
                         <span className="text-[13px] text-[#71767b]">@{(contact.name.toLowerCase().replace(/\s/g, ''))}</span>
                     </div>
                 </div>
                 <div className="p-2 rounded-full hover:bg-[#eff3f41a]">
                     <Info className="w-5 h-5 text-[#eff3f4]" />
                 </div>
             </div>

             {/* Messages */}
             <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-4">
                 {/* Empty State / Intro */}
                 <div className="flex flex-col items-center justify-center py-6 border-b border-[#2f3336] mb-2">
                      <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-2 overflow-hidden border border-[#2f3336]">
                         {contact.avatar ? (
                             <img src={contact.avatar} className="w-full h-full object-cover" />
                         ) : (
                             <User className="w-8 h-8 text-white" />
                         )}
                      </div>
                      <span className="font-bold text-white text-lg">{contact.name}</span>
                      <span className="text-[#71767b] text-sm">@{(contact.name.toLowerCase().replace(/\s/g, ''))}</span>
                      <div className="flex items-center gap-4 mt-3 mb-1">
                          <span className="text-[#71767b] text-sm"><strong className="text-[#e7e9ea]">142</strong> Following</span>
                          <span className="text-[#71767b] text-sm"><strong className="text-[#e7e9ea]">12.5K</strong> Followers</span>
                      </div>
                      <span className="text-[#71767b] text-xs flex items-center gap-1 mt-1">
                          Joined January 2026
                      </span>
                 </div>

                 {messages.map((msg, index) => {
                     const isMe = msg.sender === 'me';
                     const prevMsg = messages[index - 1];
                     const isGrouped = prevMsg && prevMsg.sender === msg.sender;

                     return (
                         <div key={msg.id} className={`flex w-full ${isMe ? "justify-end" : "justify-start"} ${isGrouped ? 'mt-1' : 'mt-3'}`}>
                             {/* Avatar (Left only) */}
                             {!isMe && !isGrouped && (
                                 <div className="w-9 h-9 rounded-full bg-slate-700 mr-2 overflow-hidden shrink-0 self-end">
                                    {contact.avatar ? <img src={contact.avatar} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center font-bold">{contact.name.charAt(0)}</div>}
                                 </div>
                             )}
                             {!isMe && isGrouped && <div className="w-11 mr-0" />}

                             <div
                                className={`
                                    px-4 py-3 max-w-[80%] text-[15px] leading-snug
                                    ${isMe 
                                        ? "bg-[#1d9bf0] text-white" 
                                        : "bg-[#2f3336] text-[#e7e9ea]"}
                                `}
                                style={{
                                    borderRadius: '24px',
                                    borderBottomRightRadius: isMe ? '4px' : '24px',
                                    borderBottomLeftRadius: !isMe ? '4px' : '24px',
                                }}
                            >
                                 <div className="whitespace-pre-wrap break-words">{msg.text}</div>
                            </div>
                         </div>
                     );
                 })}
                 {/* Seen check */}
                 {messages.length > 0 && messages[messages.length-1].sender === 'me' && (
                     <div className="flex justify-end pr-1">
                         <span className="ml-auto w-4 h-4 rounded-full border border-[#71767b] p-0.5 flex items-center justify-center">
                             <span className="w-full h-full rounded-full bg-[#1d9bf0]"></span>
                         </span>
                     </div>
                 )}
             </div>

             {/* Footer */}
             <div className="px-3 pt-2 pb-8 bg-black z-20 flex items-center gap-2 border-t border-[#2f3336]">
                 <div className="p-2 rounded-full hover:bg-[#eff3f41a] text-[#1d9bf0]">
                     <ImageIcon className="w-5 h-5" />
                 </div>
                 <div className="p-2 rounded-full hover:bg-[#eff3f41a] text-[#1d9bf0]">
                     <FileText className="w-5 h-5" /> 
                 </div>
                 
                 <div className="flex-1 bg-[#202327] rounded-full h-10 flex items-center px-4">
                     <input 
                         type="text" 
                         placeholder="Start a message" 
                         className="bg-transparent border-none outline-none w-full text-[15px] placeholder:text-[#536471] text-[#e7e9ea]"
                     />
                     <Smile className="w-5 h-5 text-[#1d9bf0]" />
                 </div>
                 
                 <div className="p-2 rounded-full hover:bg-[#eff3f41a] text-[#1d9bf0] opacity-50">
                     <Send className="w-5 h-5 fill-current" />
                 </div>
             </div>
        </div>
    );
};
