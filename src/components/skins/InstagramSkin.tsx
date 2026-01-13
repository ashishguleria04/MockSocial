"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { ArrowLeft, Phone, Video, Camera, Mic, Image as ImageIcon, Heart, Smile } from "lucide-react";

export const InstagramSkin = () => {
    const { contact, messages, isDarkMode } = useChatStore();

    return (
        <div className={`flex flex-col h-full font-sans ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
            {/* Header */}
            <div className={`flex items-center justify-between px-4 pt-12 pb-3 border-b z-10 sticky top-0 ${isDarkMode ? 'bg-black border-[#262626]' : 'bg-white border-gray-100'}`}>
                <div className="flex items-center gap-3">
                    <ArrowLeft className={`w-7 h-7 ${isDarkMode ? 'text-white' : 'text-black'}`} />
                    <div className="flex items-center gap-3">
                        {contact.avatar ? (
                            <img src={contact.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm">
                                {contact.name.charAt(0)}
                            </div>
                        )}
                        <div className="flex flex-col">
                            <span className={`font-semibold text-[16px] leading-tight flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                {contact.name} 
                            </span>
                            <span className="text-[12px] text-gray-400 font-normal">Active now</span>
                        </div>
                    </div>
                </div>
                <div className={`flex items-center gap-5 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    <Phone className="w-[26px] h-[26px]" strokeWidth={1.5} />
                    <Video className="w-[28px] h-[28px]" strokeWidth={1.5} />
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1.5 pt-4">
                 {/* Date Header */}
                 <div className="flex justify-center mb-4 mt-2">
                     <span className="text-[12px] font-medium text-gray-400">
                         Today 9:41 AM
                     </span>
                 </div>

                 {messages.map((msg, index) => {
                     const isMe = msg.sender === 'me';
                     const prevMsg = messages[index - 1];
                     const nextMsg = messages[index + 1];
                     
                     // Grouping logic for rounding
                     const isLast = !nextMsg || nextMsg.sender !== msg.sender;

                     return (
                         <div key={msg.id} className={`flex w-full ${isMe ? "justify-end" : "justify-start"} mb-0.5 items-end`}>
                             {!isMe && (
                                <div className={`w-7 h-7 rounded-full overflow-hidden shrink-0 mr-2 ${!isLast ? 'invisible' : ''}`}>
                                     {contact.avatar ? (
                                         <img src={contact.avatar || ''} className="w-full h-full object-cover" />
                                     ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-[10px]">
                                            {contact.name.charAt(0)}
                                        </div>
                                     )}
                                </div>
                             )}

                             <div
                                 className={`
                                     px-4 py-3 max-w-[70%] text-[15px] leading-snug
                                     ${isMe 
                                         ? "bg-[#3797f0] text-white"
                                         : (isDarkMode ? "bg-[#262626] text-white" : "bg-[#efefef] text-black")
                                     }
                                 `}
                                 style={{
                                     borderRadius: '22px',
                                     borderBottomRightRadius: isMe && isLast ? '4px' : '22px',
                                     borderBottomLeftRadius: !isMe && isLast ? '4px' : '22px',
                                 }}
                             >
                                 {msg.text}
                             </div>
                             {isMe && isLast && (
                                 <span className="text-[10px] text-gray-400 ml-1 mb-1">Seen</span>
                             )}
                         </div>
                     );
                 })}
            </div>

            {/* Footer */}
            <div className={`px-3 pt-2 pb-8 flex items-center gap-3 min-h-[50px] z-20 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                <div className="w-10 h-10 bg-[#3797f0] rounded-full flex items-center justify-center shrink-0">
                    <Camera className="w-5 h-5 text-white" fill="white" />
                </div>
                
                <div className={`flex-1 relative rounded-full h-11 flex items-center px-4 pl-4 overflow-hidden ${isDarkMode ? 'bg-[#262626]' : 'bg-[#efefef]'}`}>
                    <input 
                        type="text" 
                        placeholder="Message..." 
                        className={`bg-transparent border-none outline-none w-full text-[15px] placeholder:text-gray-500 min-w-0 ${isDarkMode ? 'text-white' : 'text-black'}`}
                    />
                    <div className={`flex items-center gap-3 ml-2 shrink-0 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        <Mic className="w-6 h-6" />
                        <ImageIcon className="w-6 h-6" />
                        <Smile className="w-6 h-6" />
                    </div>
                </div>

                 {messages.length === 0 && (
                     <div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>
                         <Heart className="w-7 h-7" />
                     </div>
                 )}
            </div>
        </div>
    );
};
