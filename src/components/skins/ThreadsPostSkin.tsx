"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { Heart, MessageCircle, Repeat2, Send, MoreHorizontal, Plus } from "lucide-react";

export const ThreadsPostSkin = () => {
    const { contact, postConfig, isDarkMode } = useChatStore();

    return (
        <div className={`flex flex-col h-full font-sans ${isDarkMode ? 'bg-[#101010] text-white' : 'bg-white text-black'}`}>
            {/* Header / Logo */}
            <div className={`flex items-center justify-center py-4 pt-12 relative z-10 sticky top-0 backdrop-blur-md bg-opacity-95 ${isDarkMode ? 'bg-[#101010]/80' : 'bg-white/80'}`}>
                <div className={`w-9 h-9 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {/* Threads Logo SVG */}
                    <svg viewBox="0 0 192 192" fill="currentColor" className="w-full h-full"><path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7727 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 116.333 68.0351C116.693 68.3552 117.022 68.6826 117.368 69.0183C118.971 70.0924 120.556 71.1891 122.126 72.3087C120.407 72.0732 118.667 71.9546 116.897 71.9546C102.398 71.9546 89.2644 79.1654 83.333 90.3121C78.4357 99.5163 79.3175 110.686 85.592 118.775C90.3228 124.872 97.9048 128.532 106.142 128.532C116.38 128.532 125.109 122.616 128.878 113.344C131.624 106.592 131.956 99.2367 129.82 92.1583C129.982 92.2287 130.144 92.2987 130.306 92.3684C133.456 93.7226 136.195 95.3852 138.452 97.432C143.197 101.736 145.426 107.502 144.717 114.577C143.714 124.576 137.453 132.887 127.568 137.472C119.782 141.083 110.16 142.668 99.3087 142.668C83.3325 142.668 68.514 138.353 55.7744 130.145C42.0673 121.315 33.3333 108.388 33.3333 92.6713C33.3333 76.8087 41.6888 62.7719 55.223 53.6402C69.0744 44.2968 86.8524 39.2977 104.226 40.1382C128.895 41.3314 148.694 53.078 159.98 73.202L175.053 64.9546C161.947 41.5975 138.868 27.206 109.845 25.8018C88.6601 24.7769 66.2755 30.2974 48.6186 41.3283C30.3235 52.7588 19.3333 69.5707 19.3333 91.5658C19.3333 113.67 30.5694 131.547 49.3783 143.663C65.5786 154.099 84.8197 159.333 104.757 159.333C143.902 159.333 162.909 133.4 164.717 115.352C165.717 105.378 162.709 97.027 155.778 90.7416C151.728 87.0694 146.772 84.7214 141.537 88.9883ZM110.279 113.754C108.995 114.07 107.647 114.232 106.279 114.232C100.908 114.232 96.6931 110.638 96.6931 104.991C96.6931 98.7118 101.442 93.9961 107.747 93.9961C109.116 93.9961 110.368 94.2497 111.474 94.7171C113.225 99.4568 112.443 108.274 110.279 113.754Z"></path></svg>
                </div>
            </div>

            {/* Post Item */}
            <div className={`px-4 pt-2 pb-4 ${isDarkMode ? 'border-[#2a2a2a]' : 'border-gray-100'}`}>
                <div className="flex gap-3">
                    {/* Left Column: Avatar + Thread Line */}
                    <div className="flex flex-col items-center">
                        <div className="w-[38px] h-[38px] rounded-full overflow-hidden relative border border-black/5 dark:border-white/10">
                             {contact.avatar && <img src={contact.avatar} className="w-full h-full object-cover" />}
                             <div className={`absolute bottom-0 right-0 rounded-full p-[2px] border ${isDarkMode ? 'bg-black border-black' : 'bg-white border-white'}`}>
                                 <Plus className={`w-3 h-3 ${isDarkMode ? 'text-white' : 'text-black'}`} strokeWidth={3} />
                             </div>
                        </div>
                        {/* Thread Line with loop - simplified as straight line for single post */}
                        <div className={`w-[2px] flex-1 mt-2.5 mb-2 rounded-full ${isDarkMode ? 'bg-[#333]' : 'bg-[#e5e5e5]'}`} />
                        
                        {/* Avatar Pile (Mocking replies) */}
                        <div className="w-[18px] h-[18px] relative">
                             <div className={`w-4 h-4 rounded-full absolute top-0 left-1/2 -translate-x-1/2 ${isDarkMode ? 'bg-[#333]' : 'bg-gray-200'}`} />
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="flex-1 min-w-0 pb-4">
                        <div className="flex items-center justify-between mb-0.5">
                            <span className="font-semibold text-[15px] leading-tight mt-1">{contact.name.toLowerCase().replace(/\s/g, '_')}</span>
                            <div className="flex items-center gap-3 mt-1">
                                <span className={`text-[14px] ${isDarkMode ? 'text-[#777]' : 'text-gray-400'}`}>2h</span>
                                <MoreHorizontal className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-black'}`} />
                            </div>
                        </div>

                        <div className={`text-[15px] leading-relaxed whitespace-pre-wrap mt-0.5 ${isDarkMode ? 'text-[#f3f5f7]' : 'text-black'}`}>
                            {postConfig.text}
                        </div>

                        {/* Image Content */}
                        {postConfig.image && (
                            <div className={`mt-3 rounded-xl overflow-hidden border ${isDarkMode ? 'border-[#333]' : 'border-gray-200'}`}>
                                <img src={postConfig.image} className="w-full h-auto object-cover max-h-[400px]" alt="Thread content" />
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 mt-3.5 -ml-1">
                            <Heart className={`w-[20px] h-[20px] hover:scale-110 transition-transform cursor-pointer`} strokeWidth={1.5} />
                            <MessageCircle className={`w-[20px] h-[20px] -scale-x-100 hover:scale-110 transition-transform cursor-pointer`} strokeWidth={1.5} />
                            <Repeat2 className={`w-[20px] h-[20px] hover:scale-110 transition-transform cursor-pointer`} strokeWidth={1.5} />
                            <Send className={`w-[20px] h-[20px] rotate-[-25deg] mb-1 hover:scale-110 transition-transform cursor-pointer`} strokeWidth={1.5} />
                        </div>
                        
                        {/* Metrics Text */}
                        <div className={`flex items-center gap-2 mt-2 text-[14px] ${isDarkMode ? 'text-[#777]' : 'text-gray-400'}`}>
                            <span>{postConfig.comments} replies</span>
                            <span className="text-[10px]">•</span>
                            <span>{postConfig.likes} likes</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Bottom Nav (Docked) */}
             <div className={`mt-auto flex items-center justify-around pb-7 pt-4 px-6 backdrop-blur-3xl ${isDarkMode ? 'bg-[#101010]/95' : 'bg-white/95'}`}>
                 <div className={`w-7 h-7 cursor-pointer hover:opacity-100 opacity-50 transition-opacity ${isDarkMode ? 'text-white' : 'text-black'}`}>
                     <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 9l10 7 10-7-10-7zm0 14.8l-8-5.6V19l8 5.6 8-5.6v-7.8l-8 5.6z"/></svg>
                 </div>
                 <div className={`w-7 h-7 cursor-pointer hover:opacity-100 opacity-30 transition-opacity ${isDarkMode ? 'text-white' : 'text-black'}`}>
                     <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-7c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h7c1.1 0 2 .9 2 2v5c0 1.1-.9 2-2 2zm-7-7v5h7V7h-7zM20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v3c0 .6.4 1 1 1h.5c.3 0 .5-.1.7-.3l3.7-3.7h6.1c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
                 </div>
                  <div className={`w-7 h-7 cursor-pointer hover:opacity-100 opacity-30 transition-opacity ${isDarkMode ? 'text-white' : 'text-black'}`}>
                     <Plus className="w-full h-full border-2 border-current rounded-md p-1" />
                 </div>
                  <div className={`w-7 h-7 cursor-pointer hover:opacity-100 opacity-30 transition-opacity ${isDarkMode ? 'text-white' : 'text-black'}`}>
                     <Heart className="w-full h-full" strokeWidth={2.5} />
                 </div>
                  <div className={`w-7 h-7 cursor-pointer hover:opacity-100 opacity-30 transition-opacity ${isDarkMode ? 'text-white' : 'text-black'}`}>
                     <div className="w-6 h-6 border-2 border-current rounded-full" />
                 </div>
             </div>
        </div>
    );
};
