"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { ArrowLeft, MoreHorizontal, Flag, Share2, Heart, Smile } from "lucide-react";

export const TikTokSkin = () => {
    const { contact, messages, isDarkMode } = useChatStore();

    return (
        <div className={`flex flex-col h-full font-sans ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-white text-black'}`}>
             {/* Header */}
             <div className={`flex items-center justify-between px-3 pt-12 pb-2 border-b z-10 sticky top-0 ${isDarkMode ? 'bg-[#121212] border-gray-800' : 'bg-white border-gray-100'}`}>
                 <div className="flex items-center gap-3">
                     <ArrowLeft className={`w-6 h-6 cursor-pointer ${isDarkMode ? 'text-white' : 'text-black'}`} />
                     <div className="flex items-center gap-3">
                         <div className="flex flex-col items-center">
                             <span className={`font-bold text-[17px] leading-tight flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                 {contact.name}
                             </span>
                         </div>
                     </div>
                 </div>
                 <div className={`flex items-center gap-5 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                     <Flag className="w-6 h-6" />
                     <MoreHorizontal className="w-6 h-6" />
                 </div>
             </div>

             {/* Messages */}
             <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
                 {/* Profile Block (TikTok usually shows this at top of new DMs) */}
                 <div className="flex flex-col items-center justify-center my-6 gap-2">
                      <div className={`w-20 h-20 rounded-full overflow-hidden border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                          {contact.avatar ? (
                             <img src={contact.avatar} className="w-full h-full object-cover" />
                          ) : (
                             <div className={`w-full h-full flex items-center justify-center font-bold text-xl ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-400'}`}>
                                 {contact.name.charAt(0)}
                             </div>
                          )}
                      </div>
                      <div className="text-center">
                          <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>{contact.name}</h3>
                          <p className="text-sm text-gray-500">@{contact.name.toLowerCase().replace(/\s/g, '')} · TikTok User</p>
                          <p className="text-sm text-gray-400 mt-1">100k Followers · 2.5M Likes</p>
                      </div>
                      <button className="mt-2 text-sm font-semibold bg-[#fe2c55] text-white px-8 py-2 rounded-sm hover:bg-[#ef294c] transition-colors">
                          View Profile
                      </button>
                 </div>

                 <div className="flex justify-center mb-2">
                     <span className="text-[12px] text-gray-400 font-medium">
                         Nov 12, 10:23 PM
                     </span>
                 </div>

                 {messages.map((msg, index) => {
                     const isMe = msg.sender === 'me';
                     const prevMsg = messages[index - 1];
                     const isGrouped = prevMsg && prevMsg.sender === msg.sender;

                     return (
                         <div key={msg.id} className={`flex w-full ${isMe ? "justify-end" : "justify-start"} ${isGrouped ? 'mt-1' : 'mt-2'}`}>
                             {/* TikTok Avatars in chat? Usually yes for 'them' */}
                             {!isMe && !isGrouped && (
                                 <div className={`w-8 h-8 rounded-full overflow-hidden shrink-0 mr-2 self-end mb-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                     {contact.avatar ? <img src={contact.avatar} className="w-full h-full object-cover" /> : null}
                                 </div>
                             )}
                             {!isMe && isGrouped && <div className="w-10 mr-0" />}

                             <div
                                className={`
                                    px-4 py-2.5 max-w-[75%] text-[15px] leading-snug
                                    ${isMe 
                                        ? "bg-[#fe2c55] text-white" 
                                        : (isDarkMode ? "bg-[#333333] text-white" : "bg-[#e2e2e2] text-black")
                                    }
                                `}
                                style={{
                                    borderRadius: '16px',
                                    borderBottomRightRadius: isMe ? '4px' : '16px',
                                    borderBottomLeftRadius: !isMe ? '4px' : '16px',
                                }}
                             >
                                 {msg.text}
                             </div>
                             {/* Like heart often overlay or side */}
                         </div>
                     );
                 })}
             </div>

             {/* Footer */}
             <div className={`px-3 pt-2 pb-8 z-20 border-t flex items-center gap-2 ${isDarkMode ? 'bg-[#121212] border-gray-800' : 'bg-white border-gray-100'}`}>
                 <div className={`rounded-full h-10 flex-1 flex items-center px-4 ${isDarkMode ? 'bg-[#2f2f2f]' : 'bg-gray-100'}`}>
                     <input 
                         type="text" 
                         placeholder="Send a message..." 
                         className={`bg-transparent border-none outline-none w-full text-[15px] placeholder:text-gray-500 ${isDarkMode ? 'text-white' : 'text-black'}`}
                     />
                     <Smile className="w-6 h-6 text-gray-500 ml-2" />
                 </div>
                 
                 {messages.length === 0 ? (
                     <div className={`flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                         <Share2 className="w-6 h-6" />
                         <Heart className="w-6 h-6" />
                     </div>
                 ) : (
                     <div className="w-10 h-10 flex items-center justify-center bg-[#fe2c55] rounded-full text-white cursor-pointer hover:bg-[#ef294c]">
                          <Share2 className="w-5 h-5 -rotate-90 -ml-0.5" fill="currentColor" />
                     </div>
                 )}
             </div>
        </div>
    );
};
