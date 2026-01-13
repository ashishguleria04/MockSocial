"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { MessageCircle, Repeat2, Heart, Share, MoreHorizontal, BarChart2, CheckCircle2 } from "lucide-react";

export const XPostSkin = () => {
    const { contact, postConfig, isDarkMode } = useChatStore();

    return (
        <div className={`flex flex-col h-full font-sans ${isDarkMode ? 'bg-black text-[#e7e9ea]' : 'bg-white text-[#0f1419]'}`}>
            {/* Header / Top Bar Mock */}
            <div className={`flex items-center justify-between px-4 pb-2 pt-12 sticky top-0 z-10 backdrop-blur-md bg-opacity-80 border-b ${isDarkMode ? 'bg-black/60 border-[#2f3336]' : 'bg-white/85 border-[#eff3f4]'}`}>
                <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-300">
                     {contact.avatar && <img src={contact.avatar} className="w-full h-full object-cover" />}
                </div>
                {/* X Logo */}
                <div className="absolute left-1/2 -translate-x-1/2">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className={`w-[22px] h-[22px] fill-current ${isDarkMode ? 'text-white' : 'text-black'}`}><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
                </div>
                <div className="w-7" /> {/* Spacer */}
            </div>

            {/* Post Feed Item */}
            <div className={`px-4 pt-3 pb-2 border-b ${isDarkMode ? 'border-[#2f3336]' : 'border-[#eff3f4]'}`}>
                <div className="flex gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                        {contact.avatar ? (
                            <img src={contact.avatar} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-500" />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        {/* Author Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 overflow-hidden">
                                <span className={`font-bold text-[15px] truncate ${isDarkMode ? 'text-[#e7e9ea]' : 'text-[#0f1419]'}`}>
                                    {contact.name}
                                </span>
                                <CheckCircle2 className="w-[14px] h-[14px] text-[#1d9bf0] fill-current" />
                                <span className={`text-[15px] truncate ${isDarkMode ? 'text-[#71767b]' : 'text-[#536471]'}`}>
                                    @{contact.name.replace(/\s+/g, '').toLowerCase()} · 2h
                                </span>
                            </div>
                            <MoreHorizontal className={`w-[18px] h-[18px] shrink-0 ${isDarkMode ? 'text-[#71767b]' : 'text-[#536471]'}`} />
                        </div>

                        {/* Content */}
                        <div className={`text-[15px] leading-5 mt-0.5 mb-2 whitespace-pre-wrap ${isDarkMode ? 'text-[#e7e9ea]' : 'text-[#0f1419]'}`}>
                            {postConfig.text}
                        </div>

                        {/* Image */}
                        {postConfig.image && (
                            <div className={`mt-2.5 mb-3 rounded-2xl overflow-hidden border ${isDarkMode ? 'border-[#2f3336]' : 'border-[#cfd9de]'}`}>
                                <img src={postConfig.image} className="w-full h-auto object-cover max-h-[400px]" alt="Post" />
                            </div>
                        )}
                         {!postConfig.image && (
                             <div className="h-1"></div>
                         )}

                        {/* Action Bar */}
                        <div className={`flex items-center justify-between mt-1 max-w-[420px] ${isDarkMode ? 'text-[#71767b]' : 'text-[#536471]'}`}>
                            <div className="flex items-center gap-1 text-[13px] group cursor-pointer hover:text-[#1d9bf0] transition-colors">
                                <MessageCircle className="w-[18px] h-[18px]" strokeWidth={1.5} />
                                <span>{postConfig.comments}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[13px] group cursor-pointer hover:text-[#00ba7c] transition-colors">
                                <Repeat2 className="w-[18px] h-[18px]" strokeWidth={1.5} />
                                <span>{postConfig.shares}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[13px] group cursor-pointer hover:text-[#f91880] transition-colors">
                                <Heart className="w-[18px] h-[18px]" strokeWidth={1.5} />
                                <span>{postConfig.likes}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[13px] group cursor-pointer hover:text-[#1d9bf0] transition-colors">
                                <BarChart2 className="w-[18px] h-[18px]" strokeWidth={1.5} />
                                <span>24K</span>
                            </div>
                            <div className="group cursor-pointer hover:text-[#1d9bf0] transition-colors">
                                <Share className="w-[18px] h-[18px]" strokeWidth={1.5} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
             {/* FAB (Floating Action Button) Mock */}
             <div className="fixed bottom-20 right-5">
                <div className="w-14 h-14 rounded-full bg-[#1d9bf0] shadow-xl flex items-center justify-center text-white">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><g><path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path></g></svg>
                </div>
            </div>
        </div>
    );
};
