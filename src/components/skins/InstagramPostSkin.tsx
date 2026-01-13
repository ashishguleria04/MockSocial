"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";

export const InstagramPostSkin = () => {
    const { contact, postConfig, isDarkMode } = useChatStore();

    return (
        <div className={`flex flex-col h-full font-sans ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
            {/* Header */}
            <div className={`flex items-center justify-between px-4 pb-3 pt-12 border-b sticky top-0 z-20 backdrop-blur-xl bg-opacity-95 ${isDarkMode ? 'border-[#262626] bg-black' : 'border-[#dbdbdb] bg-white'}`}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-[#FFD600] via-[#FF0149] to-[#D0008F]">
                        <div className={`w-full h-full rounded-full border-2 ${isDarkMode ? 'border-black' : 'border-white'} overflow-hidden relative`}>
                           {contact.avatar ? (
                               <img src={contact.avatar || ''} className="w-full h-full object-cover" />
                           ) : (
                               <div className="w-full h-full bg-gray-200" />
                           )}
                        </div>
                    </div>
                    <div className="flex flex-col -space-y-0.5">
                        <span className="text-[13px] font-bold leading-tight">{contact.name.toLowerCase().replace(/\s/g, '_')}</span>
                        {/* Location mock */}
                        <span className={`text-[11px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sponsored</span>
                    </div>
                </div>
                <MoreHorizontal className="w-5 h-5 opacity-90" />
            </div>

            {/* Content (Scrollable) */}
             <div className="flex-1 overflow-y-auto">
                 {/* Image */}
                 <div className={`w-full aspect-square relative flex items-center justify-center overflow-hidden ${isDarkMode ? 'bg-[#121212]' : 'bg-[#f0f0f0]'}`}>
                    {postConfig.image ? (
                        <img src={postConfig.image} className="w-full h-full object-cover" alt="Post" />
                    ) : (
                        <div className="flex flex-col items-center gap-3 opacity-50">
                             <div className="w-16 h-16 border-2 border-dashed rounded-xl border-current opacity-30" />
                        </div>
                    )}
                </div>

                {/* Actions Bar */}
                <div className="px-3 pt-3 pb-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Heart className="w-[26px] h-[26px] hover:text-gray-500 cursor-pointer transition-opacity" strokeWidth={1.75} />
                        <MessageCircle className="w-[26px] h-[26px] -rotate-90 hover:text-gray-500 cursor-pointer transition-opacity" strokeWidth={1.75} />
                        <Send className="w-[26px] h-[26px] hover:text-gray-500 cursor-pointer transition-opacity -mt-0.5" strokeWidth={1.75} />
                    </div>
                    <Bookmark className="w-[26px] h-[26px] hover:text-gray-500 cursor-pointer transition-opacity" strokeWidth={1.75} />
                </div>

                {/* Likes Area */}
                <div className="px-4 mb-2">
                    <div className="flex items-center gap-1.5 mb-1">
                        <div className="flex -space-x-1.5">
                           {[1,2,3].map(i => (
                               <div key={i} className={`w-4 h-4 rounded-full border-[1.5px] ${isDarkMode ? 'border-black bg-gray-800' : 'border-white bg-gray-200'}`} />
                           ))}
                        </div>
                        <span className="text-[13px] font-semibold">
                            Liked by <span className="font-bold">user_name</span> and <span className="font-bold">{postConfig.likes} others</span>
                        </span>
                    </div>
                </div>

                {/* Caption */}
                <div className="px-4 pb-4">
                    <div className="text-[13px] leading-[18px]">
                        <span className="font-bold mr-1.5">{contact.name.toLowerCase().replace(/\s/g, '_')}</span>
                        <span className={`${isDarkMode ? 'text-gray-100' : 'text-[#262626]'}`}>{postConfig.text}</span>
                    </div>
                    
                    {/* Comments & Time */}
                    <div className={`mt-2 space-y-1 ${isDarkMode ? 'text-[#A8A8A8]' : 'text-[#737373]'}`}>
                        <div className="text-[13px] cursor-pointer active:opacity-50">View all {postConfig.comments} comments</div>
                        <div className="text-[11px] uppercase tracking-wide opacity-80">2 hours ago</div>
                    </div>
                </div>
             </div>

            {/* Bottom Nav (Mock) */}
            <div className={`px-5 py-3 border-t flex items-center justify-between mt-auto ${isDarkMode ? 'border-[#262626] bg-black' : 'border-[#dbdbdb] bg-white'}`}>
                <div className="w-[22px] h-[22px] bg-current rounded-sm opacity-90" /> {/* Home */}
                <div className="w-[22px] h-[22px] border-[2px] border-current rounded-full opacity-60" /> {/* Search */}
                <div className="w-[22px] h-[22px] bg-current opacity-60 rounded-sm" /> {/* Reel */}
                <div className="w-[22px] h-[22px] bg-current opacity-60 rounded-sm" /> {/* Shop */}
                <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden ring-1 ring-current">
                    {contact.avatar && <img src={contact.avatar} className="w-full h-full object-cover" />}
                </div>
            </div>
        </div>
    );
};
