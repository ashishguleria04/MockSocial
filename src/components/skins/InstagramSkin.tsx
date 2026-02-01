"use client";

import React, { useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { ArrowLeft, Phone, Video, Camera, Mic, Image as ImageIcon, Heart, Smile } from "lucide-react";
import { StatusBar } from "@/components/shared/StatusBar";
import { motion, AnimatePresence } from "framer-motion";
import EmojiPicker from "emoji-picker-react";

export const InstagramSkin = () => {
    const { contact, messages, isDarkMode, wallpaper, statusBar, addMessage, deleteMessage } = useChatStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = React.useState("");
    const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                addMessage({
                    text: "",
                    image: e.target?.result as string,
                    sender: "me",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    status: "sent"
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleHeartClick = () => {
        addMessage({
            text: "❤️",
            sender: "me",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "sent"
        });
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;
        addMessage({
            text: inputValue,
            sender: "me",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "sent"
        });
        setInputValue("");
        setShowEmojiPicker(false);
    };

    const handleEmojiClick = (emojiObject: any) => {
        setInputValue((prev) => prev + emojiObject.emoji);
    };

    return (
        <div className={`flex flex-col h-full font-sans relative overflow-hidden ${wallpaper ? 'bg-transparent' : (isDarkMode ? 'bg-black' : 'bg-white')} ${isDarkMode ? 'text-white' : 'text-black'}`}>
            
            {/* Status Bar */}
            <div className={`sticky top-0 z-50 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                <StatusBar variant={isDarkMode ? 'dark' : 'light'} />
            
                {/* Header */}
                <div className={`flex items-center justify-between px-4 pb-3 pt-1 border-b ${isDarkMode ? 'border-[#262626]' : 'border-gray-100'}`}>
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
                    <div className={`flex items-center gap-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        <Phone className="w-[26px] h-[26px]" strokeWidth={1.5} />
                        <Video className="w-[28px] h-[28px]" strokeWidth={1.5} />
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1.5 ">
                 {/* Date Header */}
                 <div className="flex justify-center mb-4 mt-2">
                     <span className="text-[12px] font-medium text-gray-400">
                         Today 9:41 AM
                     </span>
                 </div>

                 <AnimatePresence mode="popLayout">
                 {messages.map((msg, index) => {
                     const isMe = msg.sender === 'me';
                     const nextMsg = messages[index + 1];
                     const isLast = !nextMsg || nextMsg.sender !== msg.sender;

                     return (
                         <motion.div 
                            layout
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            key={msg.id} 
                            className={`flex w-full ${isMe ? "justify-end" : "justify-start"} mb-0.5 items-end group`}
                        >
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
                                     max-w-[70%] text-[15px] leading-snug overflow-hidden
                                     ${msg.image ? 'p-0 bg-transparent' : 'px-4 py-3'}
                                     ${!msg.image && (isMe 
                                         ? "bg-[#3797f0] text-white"
                                         : (isDarkMode ? "bg-[#262626] text-white" : "bg-[#efefef] text-black"))
                                     }
                                 `}
                                 style={{
                                     borderRadius: '22px',
                                     borderBottomRightRadius: isMe && isLast ? '4px' : '22px',
                                     borderBottomLeftRadius: !isMe && isLast ? '4px' : '22px',
                                 }}
                             >
                                 {msg.image ? (
                                     <img src={msg.image} alt="Sent image" className="rounded-[22px]" />
                                 ) : (
                                     msg.text
                                 )}
                             </div>
                             {isMe && isLast && (
                                 <motion.span 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={`text-[10px] ml-1 mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                                >
                                    Seen
                                </motion.span>
                             )}
                         </motion.div>
                     );
                 })}
                 </AnimatePresence>
            </div>

            {/* Footer */}
            <div className={`px-3 pt-2 pb-6 flex items-center gap-3 min-h-[50px] z-20 ${isDarkMode ? 'bg-black' : 'bg-white'} relative`}>
                <div className="w-10 h-10 bg-[#3797f0] rounded-full flex items-center justify-center shrink-0">
                    <Camera className="w-5 h-5 text-white" fill="white" />
                </div>
                
                <div className={`flex-1 relative rounded-full h-11 flex items-center px-4 pl-4 overflow-hidden ${isDarkMode ? 'bg-[#262626]' : 'bg-[#efefef]'}`}>
                    <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Message..." 
                        className={`bg-transparent border-none outline-none w-full text-[15px] placeholder:text-gray-500 min-w-0 ${isDarkMode ? 'text-white' : 'text-black'}`}
                    />
                    <div className={`flex items-center gap-3 ml-2 shrink-0 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        {messages.length > 0 && inputValue.length === 0 && (
                             <Mic className="w-6 h-6" />
                        )}
                        {inputValue.length > 0 && (
                            <span onClick={handleSend} className="text-[#3797f0] font-semibold text-sm cursor-pointer hover:opacity-70 transition-opacity">
                                Send
                            </span>
                        )}
                        <ImageIcon 
                            className="w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity" 
                            onClick={() => fileInputRef.current?.click()}
                        />
                        <input 
                            type="file" 
                            hidden 
                            ref={fileInputRef} 
                            accept="image/*" 
                            onChange={handleImageUpload}
                        />
                        <Smile 
                            className="w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity" 
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        />
                    </div>
                </div>

                 {messages.length === 0 && inputValue.length === 0 ? (
                     <div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>
                         <Mic className="w-6 h-6" />
                     </div>
                 ) : (
                    inputValue.length === 0 && (
                        <div 
                            className={`${isDarkMode ? 'text-white' : 'text-black'} cursor-pointer active:scale-90 transition-transform`}
                            onClick={handleHeartClick}
                        >
                            <Heart className="w-7 h-7" />
                        </div>
                    )
                 )}
                 
                 {/* Emoji Picker Popover */}
                 <AnimatePresence>
                    {showEmojiPicker && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="absolute bottom-16 right-4 z-50 shadow-2xl rounded-2xl overflow-hidden"
                        >
                            <EmojiPicker 
                                theme={isDarkMode ? 'dark' as any : 'light' as any}
                                onEmojiClick={handleEmojiClick}
                                width={300}
                                height={400}
                            />
                        </motion.div>
                    )}
                 </AnimatePresence>
            </div>
        </div>
    );
};
