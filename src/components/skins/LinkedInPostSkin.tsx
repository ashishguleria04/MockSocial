import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { MoreHorizontal, ThumbsUp, MessageSquare, Repeat, Send, Globe, Heart } from "lucide-react";

export const LinkedInPostSkin = () => {
    const { contact, postConfig, isDarkMode } = useChatStore();

    return (
        <div className={`flex flex-col h-full font-sans ${isDarkMode ? 'bg-[#000000] text-white' : 'bg-[#F3F2EF] text-black'}`}>
             {/* Header / Search Bar Mock */}
             <div className={`flex items-center gap-3 px-4 pb-2 pt-12 sticky top-0 z-10 ${isDarkMode ? 'bg-[#1b1f23] border-[#31363b]' : 'bg-white border-gray-200'} shadow-sm`}>
                 <div className="w-8 h-8 rounded-full overflow-hidden">
                    {contact.avatar && <img src={contact.avatar} className="w-full h-full object-cover" />}
                 </div>
                 <div className={`flex-1 h-8 rounded-sm px-2 flex items-center ${isDarkMode ? 'bg-[#2c3237]' : 'bg-[#eef3f8]'}`}>
                     <div className="w-4 h-4 text-gray-500 mr-2">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.41 18.59l-5.27-5.27a8.5 8.5 0 10-1.41 1.41l5.27 5.27a1 1 0 001.41-1.41zM5 10a5 5 0 115 5 5 5 0 01-5-5z"/></svg>
                     </div>
                     <span className="text-[14px] text-gray-500 font-medium">Search</span>
                 </div>
                 <MessageSquare className="w-6 h-6 text-gray-600" fill="currentColor" opacity={0.6} />
             </div>

             {/* Main Feed Content */}
             <div className="flex-1 overflow-y-auto pt-2">
                 <div className={`mb-2 pt-3 pb-1 ${isDarkMode ? 'bg-[#1b1f23]' : 'bg-white'} shadow-sm rounded-sm`}>
                     {/* Author Row */}
                     <div className="flex items-start justify-between px-3 mb-2">
                         <div className="flex gap-3">
                             <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-100 cursor-pointer">
                                {contact.avatar ? (
                                    <img src={contact.avatar} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                                        {contact.name.charAt(0)}
                                    </div>
                                )}
                             </div>
                             <div className="flex flex-col">
                                 <div className="flex items-center gap-1">
                                    <span className={`font-semibold text-[14px] leading-tight hover:underline cursor-pointer decoration-1 ${isDarkMode ? 'text-white' : 'text-[rgba(0,0,0,0.9)]'}`}>
                                        {contact.name}
                                    </span>
                                    <span className="text-[#9CA6B1]">· 1st</span>
                                 </div>
                                 <span className="text-[12px] text-[#8e98a3] leading-tight mt-0.5 line-clamp-1">
                                     Product Designer @ Tech | UI/UX Enthusiast
                                 </span>
                                 <span className="text-[12px] text-[#8e98a3] flex items-center gap-1 mt-0.5">
                                     2h • <Globe className="w-3 h-3 text-[#8e98a3]" />
                                 </span>
                             </div>
                         </div>
                         <button className="text-gray-500 mt-1">
                            <MoreHorizontal className="w-6 h-6" />
                         </button>
                     </div>

                     {/* Text Content */}
                     <div className={`px-3 pb-2 text-[14px] whitespace-pre-wrap leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-[rgba(0,0,0,0.9)]'}`}>
                         {postConfig.text}
                     </div>

                     {/* Image */}
                     {postConfig.image && (
                         <div className="w-full mt-1 border-t border-b border-gray-100/10">
                             <img src={postConfig.image} alt="Post" className="w-full h-auto object-cover" />
                         </div>
                     )}

                     {/* Social Counts */}
                     <div className="px-3 py-2 flex items-center justify-between text-[12px] text-[#8e98a3] border-b border-gray-100/10">
                         <div className="flex items-center gap-1">
                             <div className="flex -space-x-1">
                                 <div className="w-4 h-4 rounded-full bg-[#1485BD] flex items-center justify-center z-20 ring-1 ring-white">
                                    <ThumbsUp className="w-2.5 h-2.5 text-white bg-[#1485BD] rounded-full p-[1px]" fill="currentColor" />
                                 </div>
                                 <div className="w-4 h-4 rounded-full bg-[#D93F2B] flex items-center justify-center z-10 ring-1 ring-white">
                                    <Heart className="w-2.5 h-2.5 text-white bg-[#D93F2B] rounded-full p-[1px]" fill="currentColor" />
                                 </div>
                                 <div className="w-4 h-4 rounded-full bg-[#5BA843] flex items-center justify-center ring-1 ring-white">
                                    <span className="text-[7px] leading-none text-white font-serif">👏</span>
                                 </div>
                             </div>
                             <span className="hover:underline hover:text-blue-600 cursor-pointer text-xs ml-1">{postConfig.likes}</span>
                         </div>
                         <div className="flex gap-2">
                             <span className="hover:underline hover:text-blue-600 cursor-pointer">{postConfig.comments} comments</span>
                             <span>•</span>
                             <span className="hover:underline hover:text-blue-600 cursor-pointer">{postConfig.shares} reposts</span>
                         </div>
                     </div>

                     {/* Action Buttons */}
                     <div className="px-1 py-1 flex items-center justify-between mt-1">
                         <button className="flex-1 py-3 flex items-center justify-center gap-1.5 rounded-md hover:bg-gray-100/50 transition-colors group">
                             <ThumbsUp className={`w-[22px] h-[22px] group-hover:scale-110 transition-transform ${isDarkMode ? 'text-[#a0a0a0]' : 'text-[#666666]'}`} strokeWidth={1.5} style={{ transform: 'scaleX(-1)' }}/>
                             <span className={`text-[14px] font-semibold ${isDarkMode ? 'text-[#a0a0a0]' : 'text-[#666666]'}`}>Like</span>
                         </button>
                         <button className="flex-1 py-3 flex items-center justify-center gap-1.5 rounded-md hover:bg-gray-100/50 transition-colors group">
                             <MessageSquare className={`w-[22px] h-[22px] group-hover:scale-110 transition-transform ${isDarkMode ? 'text-[#a0a0a0]' : 'text-[#666666]'}`} strokeWidth={1.5} />
                             <span className={`text-[14px] font-semibold ${isDarkMode ? 'text-[#a0a0a0]' : 'text-[#666666]'}`}>Comment</span>
                         </button>
                         <button className="flex-1 py-3 flex items-center justify-center gap-1.5 rounded-md hover:bg-gray-100/50 transition-colors group">
                             <Repeat className={`w-[22px] h-[22px] group-hover:scale-110 transition-transform ${isDarkMode ? 'text-[#a0a0a0]' : 'text-[#666666]'}`} strokeWidth={1.5} />
                             <span className={`text-[14px] font-semibold ${isDarkMode ? 'text-[#a0a0a0]' : 'text-[#666666]'}`}>Repost</span>
                         </button>
                         <button className="flex-1 py-3 flex items-center justify-center gap-1.5 rounded-md hover:bg-gray-100/50 transition-colors group">
                             <Send className={`w-[22px] h-[22px] group-hover:scale-110 transition-transform ${isDarkMode ? 'text-[#a0a0a0]' : 'text-[#666666]'}`} strokeWidth={1.5} />
                             <span className={`text-[14px] font-semibold ${isDarkMode ? 'text-[#a0a0a0]' : 'text-[#666666]'}`}>Send</span>
                         </button>
                     </div>
                 </div>
             </div>
             
              {/* Bottom Nav Mock */}
              <div className={`px-2 py-1.5 border-t flex items-center justify-around h-[52px] ${isDarkMode ? 'bg-[#1b1f23] border-[#31363b]' : 'bg-white border-gray-200'}`}>
                 <div className="flex flex-col items-center gap-0.5 opacity-60">
                     <div className="w-6 h-6 bg-current rounded-sm" />
                     <span className="text-[10px]">Home</span>
                 </div>
                 <div className="flex flex-col items-center gap-0.5 opacity-60">
                     <div className="w-6 h-6 bg-current rounded-sm" />
                     <span className="text-[10px]">My Network</span>
                 </div>
                 <div className="flex flex-col items-center gap-0.5 opacity-60">
                     <div className="w-6 h-6 bg-current rounded-sm" />
                     <span className="text-[10px]">Post</span>
                 </div>
                 <div className="flex flex-col items-center gap-0.5 opacity-60">
                     <div className="w-6 h-6 bg-current rounded-sm" />
                     <span className="text-[10px]">Notifications</span>
                 </div>
                 <div className="flex flex-col items-center gap-0.5 opacity-60">
                     <div className="w-6 h-6 bg-current rounded-sm" />
                     <span className="text-[10px]">Jobs</span>
                 </div>
            </div>
        </div>
    );
};
