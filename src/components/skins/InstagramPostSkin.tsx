"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";

export const InstagramPostSkin = () => {
    const { contact, postConfig, isDarkMode } = useChatStore();

    return (
        <div className={`flex flex-col h-full font-sans ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
            {/* Header */}
            <div className={`flex items-center justify-between px-3 py-3 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-gray-200 p-0.5">
                        <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px]">
                            <div className={`w-full h-full rounded-full border-2 ${isDarkMode ? 'border-black' : 'border-white'} overflow-hidden`}>
                               {contact.avatar ? (
                                   <img src={contact.avatar} className="w-full h-full object-cover" />
                               ) : (
                                   <div className="w-full h-full bg-gray-300"></div>
                               )}
                            </div>
                        </div>
                    </div>
                    <span className="text-[14px] font-semibold">{contact.name}</span>
                </div>
                <MoreHorizontal className="w-5 h-5" />
            </div>

            {/* Content (Image) */}
             <div className={`w-full aspect-auto min-h-[300px] flex items-center justify-center ${isDarkMode ? 'bg-[#121212]' : 'bg-gray-100'}`}>
                {postConfig.image ? (
                    <img src={postConfig.image} className="w-full h-auto object-cover max-h-[500px]" alt="Post" />
                ) : (
                    <span className="text-gray-500">Image Placeholder</span>
                )}
            </div>

            {/* Actions */}
            <div className="px-3 pt-3 pb-2">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                        <Heart className="w-6 h-6 hover:text-gray-500 cursor-pointer" />
                        <MessageCircle className="w-6 h-6 -rotate-90 hover:text-gray-500 cursor-pointer" />
                        <Send className="w-6 h-6 rotate-12 mb-1 hover:text-gray-500 cursor-pointer" />
                    </div>
                    <Bookmark className="w-6 h-6 hover:text-gray-500 cursor-pointer" />
                </div>

                {/* Likes */}
                <div className="font-semibold text-[14px] mb-1">
                    {postConfig.likes} likes
                </div>

                {/* Caption */}
                <div className="text-[14px]">
                    <span className="font-semibold mr-2">{contact.name}</span>
                    <span className="leading-tight">{postConfig.text}</span>
                </div>

                {/* Comments Link */}
                <div className={`text-[14px] mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    View all {postConfig.comments} comments
                </div>

                {/* Time */}
                <div className={`text-[10px] uppercase mt-1 tracking-wide ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    2 hours ago
                </div>
            </div>

            {/* Footer Navigation (Mockup) */}
            <div className={`border-t mt-auto flex items-center justify-around py-3 ${isDarkMode ? 'border-gray-800 bg-black' : 'border-gray-100 bg-white'}`}>
                {/* Home, Search, Reels, Shop, Profile */}
                <div className="w-6 h-6 bg-current rounded-sm opacity-90" /> {/* Home */}
                <div className="w-6 h-6 border-2 border-current rounded-full opacity-60" /> {/* Search */}
                <div className="w-6 h-6 bg-current opacity-60" /> {/* Reel */}
                <div className="w-6 h-6 bg-current opacity-60" /> {/* Shop */}
                <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden">
                    {contact.avatar && <img src={contact.avatar} className="w-full h-full object-cover" />}
                </div>
            </div>
        </div>
    );
};
