import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { MoreHorizontal, ThumbsUp, MessageSquare, Repeat, Send, Globe } from "lucide-react";

export const LinkedInPostSkin = () => {
    const { contact, postConfig, isDarkMode } = useChatStore();

    return (
        <div className={`flex flex-col h-full font-sans ${isDarkMode ? 'bg-[#000000] text-white' : 'bg-white text-black'}`}>
             {/* Header */}
             <div className="flex items-start justify-between px-3 pt-4 pb-2">
                 <div className="flex gap-3">
                     <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-100">
                        {contact.avatar ? (
                            <img src={contact.avatar} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                                {contact.name.charAt(0)}
                            </div>
                        )}
                     </div>
                     <div className="flex flex-col">
                         <span className={`font-semibold text-[14px] leading-tight hover:underline cursor-pointer decoration-1 ${isDarkMode ? 'text-white' : 'text-[#000000]/90'}`}>
                            {contact.name}
                         </span>
                         <span className="text-[12px] text-gray-500 leading-tight mt-0.5 line-clamp-1">
                             Product Designer @ Tech | UI/UX Enthusiast
                         </span>
                         <span className="text-[12px] text-gray-500 flex items-center gap-1 mt-0.5">
                             2h • <Globe className="w-3 h-3 text-gray-500" />
                         </span>
                     </div>
                 </div>
                 <button className="text-gray-500">
                    <MoreHorizontal className="w-6 h-6" />
                 </button>
             </div>

             {/* Content */}
             <div className="flex-1 overflow-y-auto">
                 {/* Text */}
                 <div className={`px-4 pb-2 text-[14px] whitespace-pre-wrap ${isDarkMode ? 'text-gray-200' : 'text-[#000000]/90'}`}>
                     {postConfig.text}
                 </div>

                 {/* Image */}
                 {postConfig.image && (
                     <div className="w-full mt-2">
                         <img src={postConfig.image} alt="Post" className="w-full h-auto object-cover" />
                     </div>
                 )}

                 {/* Social Counts */}
                 <div className="px-3 py-2 flex items-center justify-between text-[12px] text-gray-500 border-b border-gray-100/10">
                     <div className="flex items-center gap-1">
                         <div className="flex -space-x-1">
                             <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center z-20 ring-1 ring-white">
                                <ThumbsUp className="w-2.5 h-2.5 text-white bg-blue-500 rounded-full p-[1px]" fill="currentColor" />
                             </div>
                             <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center z-10 ring-1 ring-white">
                                <span className="text-[6px] text-white">❤️</span>
                             </div>
                             <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center ring-1 ring-white">
                                <span className="text-[6px] text-white">👏</span>
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
                 <div className="px-2 py-1 flex items-center justify-between mt-1">
                     <button className="flex-1 py-3 flex items-center justify-center gap-2 rounded-md hover:bg-gray-100/50 transition-colors text-gray-500 font-semibold text-sm group">
                         <ThumbsUp className={`w-5 h-5 group-hover:scale-110 transition-transform ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} strokeWidth={1.5} />
                         <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Like</span>
                     </button>
                     <button className="flex-1 py-3 flex items-center justify-center gap-2 rounded-md hover:bg-gray-100/50 transition-colors text-gray-500 font-semibold text-sm group">
                         <MessageSquare className={`w-5 h-5 group-hover:scale-110 transition-transform ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} strokeWidth={1.5} />
                         <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Comment</span>
                     </button>
                     <button className="flex-1 py-3 flex items-center justify-center gap-2 rounded-md hover:bg-gray-100/50 transition-colors text-gray-500 font-semibold text-sm group">
                         <Repeat className={`w-5 h-5 group-hover:scale-110 transition-transform ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} strokeWidth={1.5} />
                         <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Repost</span>
                     </button>
                     <button className="flex-1 py-3 flex items-center justify-center gap-2 rounded-md hover:bg-gray-100/50 transition-colors text-gray-500 font-semibold text-sm group">
                         <Send className={`w-5 h-5 group-hover:scale-110 transition-transform ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} strokeWidth={1.5} />
                         <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Send</span>
                     </button>
                 </div>
             </div>
        </div>
    );
};
