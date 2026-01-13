"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { ArrowLeft, Info, Image as ImageIcon, FileText, Smile, Send, Settings, User } from "lucide-react";

export const XSkin = () => {
    const { contact, messages, isDarkMode } = useChatStore();

    return (
        <div className={`flex flex-col h-full font-sans ${isDarkMode ? 'bg-black text-[#e7e9ea]' : 'bg-white text-black'}`}>
             {/* Header */}
             <div className={`flex items-center justify-between px-3 pt-12 pb-2 backdrop-blur-md sticky top-0 z-20 border-b ${isDarkMode ? 'bg-black/80 border-[#2f3336]' : 'bg-white/80 border-gray-100'}`}>
                 <div className="flex items-center gap-4">
                     <ArrowLeft className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-black'}`} />
                     <div className="flex flex-col">
                         <span className={`font-bold text-[17px] leading-tight ${isDarkMode ? 'text-[#e7e9ea]' : 'text-black'}`}>{contact.name}</span>
                         <span className="text-[13px] text-[#71767b]">@{(contact.name.toLowerCase().replace(/\s/g, ''))}</span>
                     </div>
                 </div>
                 <div className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-[#eff3f41a]' : 'hover:bg-gray-100'}`}>
                     <Info className={`w-5 h-5 ${isDarkMode ? 'text-[#eff3f4]' : 'text-black'}`} />
                 </div>
             </div>

             {/* Messages */}
             <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-4">
                 {/* Empty State / Intro */}
                 <div className={`flex flex-col items-center justify-center py-6 border-b mb-2 ${isDarkMode ? 'border-[#2f3336]' : 'border-gray-100'}`}>
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 overflow-hidden border ${isDarkMode ? 'bg-slate-800 border-[#2f3336]' : 'bg-gray-100 border-gray-200'}`}>
                         {contact.avatar ? (
                             <img src={contact.avatar} className="w-full h-full object-cover" />
                         ) : (
                             <User className={`w-8 h-8 ${isDarkMode ? 'text-white' : 'text-gray-400'}`} />
                         )}
                      </div>
                      <span className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>{contact.name}</span>
                      <span className="text-[#71767b] text-sm">@{(contact.name.toLowerCase().replace(/\s/g, ''))}</span>
                      <div className="flex items-center gap-4 mt-3 mb-1">
                          <span className="text-[#71767b] text-sm"><strong className={`${isDarkMode ? 'text-[#e7e9ea]' : 'text-black'}`}>142</strong> Following</span>
                          <span className="text-[#71767b] text-sm"><strong className={`${isDarkMode ? 'text-[#e7e9ea]' : 'text-black'}`}>12.5K</strong> Followers</span>
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
                                 <div className={`w-9 h-9 rounded-full mr-2 overflow-hidden shrink-0 self-end ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
                                    {contact.avatar ? <img src={contact.avatar} className="w-full h-full object-cover" /> : <div className={`w-full h-full flex items-center justify-center font-bold ${isDarkMode ? 'text-white' : 'text-gray-500'}`}>{contact.name.charAt(0)}</div>}
                                 </div>
                             )}
                             {!isMe && isGrouped && <div className="w-11 mr-0" />}

                             <div
                                className={`
                                    px-4 py-3 max-w-[80%] text-[15px] leading-snug
                                    ${isMe 
                                        ? "bg-[#1d9bf0] text-white" 
                                        : (isDarkMode ? "bg-[#2f3336] text-[#e7e9ea]" : "bg-[#eff3f4] text-black")}
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
             <div className={`px-3 pt-2 pb-8 z-20 flex items-center gap-2 border-t ${isDarkMode ? 'bg-black border-[#2f3336]' : 'bg-white border-gray-100'}`}>
                 <div className={`p-2 rounded-full text-[#1d9bf0] ${isDarkMode ? 'hover:bg-[#eff3f41a]' : 'hover:bg-gray-50'}`}>
                     <ImageIcon className="w-5 h-5" />
                 </div>
                 <div className={`p-2 rounded-full text-[#1d9bf0] ${isDarkMode ? 'hover:bg-[#eff3f41a]' : 'hover:bg-gray-50'}`}>
                     <FileText className="w-5 h-5" /> 
                 </div>
                 
                 <div className={`flex-1 rounded-full h-10 flex items-center px-4 ${isDarkMode ? 'bg-[#202327]' : 'bg-[#eff3f4]'}`}>
                     <input 
                         type="text" 
                         placeholder="Start a message" 
                         className={`bg-transparent border-none outline-none w-full text-[15px] placeholder:text-[#536471] ${isDarkMode ? 'text-[#e7e9ea]' : 'text-black'}`}
                     />
                     <Smile className="w-5 h-5 text-[#1d9bf0]" />
                 </div>
                 
                 <div className={`p-2 rounded-full text-[#1d9bf0] opacity-50 ${isDarkMode ? 'hover:bg-[#eff3f41a]' : 'hover:bg-gray-50'}`}>
                     <Send className="w-5 h-5 fill-current" />
                 </div>
             </div>
        </div>
    );
};
