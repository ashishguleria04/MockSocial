"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { ArrowLeft, MoreHorizontal, Flag, Share2, Heart, Smile } from "lucide-react";

export const TikTokSkin = () => {
    const { contact, messages } = useChatStore();

    return (
        <div className="flex flex-col h-full bg-white font-sans">
             {/* Header */}
             <div className="flex items-center justify-between px-3 pt-12 pb-2 bg-white border-b border-gray-100 z-10 sticky top-0">
                 <div className="flex items-center gap-3">
                     <ArrowLeft className="w-6 h-6 text-black cursor-pointer" />
                     <div className="flex items-center gap-3">
                         <div className="flex flex-col items-center">
                             <span className="font-bold text-[17px] text-black leading-tight flex items-center gap-1">
                                 {contact.name}
                             </span>
                         </div>
                     </div>
                 </div>
                 <div className="flex items-center gap-5 text-black">
                     <Flag className="w-6 h-6" />
                     <MoreHorizontal className="w-6 h-6" />
                 </div>
             </div>

             {/* Messages */}
             <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
                 {/* Profile Block (TikTok usually shows this at top of new DMs) */}
                 <div className="flex flex-col items-center justify-center my-6 gap-2">
                      <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200">
                          {contact.avatar ? (
                             <img src={contact.avatar} className="w-full h-full object-cover" />
                          ) : (
                             <div className="w-full h-full bg-gray-100 flex items-center justify-center font-bold text-xl text-gray-400">
                                 {contact.name.charAt(0)}
                             </div>
                          )}
                      </div>
                      <div className="text-center">
                          <h3 className="font-semibold text-lg text-black">{contact.name}</h3>
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
                                 <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0 mr-2 self-end mb-1">
                                     {contact.avatar ? <img src={contact.avatar} className="w-full h-full object-cover" /> : null}
                                 </div>
                             )}
                             {!isMe && isGrouped && <div className="w-10 mr-0" />}

                             <div
                                className={`
                                    px-4 py-2.5 max-w-[75%] text-[15px] leading-snug
                                    ${isMe 
                                        ? "bg-[#fe2c55] text-white" 
                                        : "bg-[#e2e2e2] text-black"
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
             <div className="px-3 pt-2 pb-8 bg-white z-20 border-t border-gray-100 flex items-center gap-2">
                 <div className="bg-gray-100 rounded-full h-10 flex-1 flex items-center px-4">
                     <input 
                         type="text" 
                         placeholder="Send a message..." 
                         className="bg-transparent border-none outline-none w-full text-[15px] text-black placeholder:text-gray-500"
                     />
                     <Smile className="w-6 h-6 text-gray-500 ml-2" />
                 </div>
                 
                 {messages.length === 0 ? (
                     <div className="flex items-center gap-3 text-gray-800">
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
