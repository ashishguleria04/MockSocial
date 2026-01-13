"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { 
  ArrowLeft, 
  Video, 
  Phone, 
  MoreVertical, 
  Smile, 
  Paperclip, 
  Camera, 
  Mic, 
  Check, 
  CheckCheck 
} from "lucide-react";

export const WhatsAppSkin = () => {
  const { contact, messages } = useChatStore();

  return (
    <div className="flex flex-col h-full bg-[#efe7dd] relative overflow-hidden" style={{ fontFamily: 'Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu, Cantarell, Fira Sans, sans-serif' }}>
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none z-0"
        style={{ 
          backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
          backgroundSize: '400px'
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-2 py-2 bg-[#008069] text-white z-10 relative shadow-sm" style={{ height: '60px' }}>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors flex-shrink-0" aria-label="Back">
             <ArrowLeft className="w-6 h-6" strokeWidth={2} />
          </button>
          
          <div className="flex flex-col justify-center min-w-0 flex-1 ml-1 cursor-pointer">
              <span className="text-[17px] leading-[22px] font-medium truncate">{contact.name}</span>
              <span className="text-[13px] leading-[18px] truncate opacity-80 font-normal">
                  {contact.status || 'Online'}
              </span>
          </div>
        </div>
        
        <div className="flex items-center gap-5 pr-2 flex-shrink-0">
            <Video className="w-6 h-6 fill-white stroke-white cursor-pointer" strokeWidth={1.5} />
            <Phone className="w-5 h-5 fill-white stroke-white cursor-pointer" strokeWidth={1.5} />
            <MoreVertical className="w-5 h-5 cursor-pointer" strokeWidth={2} />
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2 flex flex-col z-10 relative scrollbar-hide">
        {/* Date Chip */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#FFF] px-3 py-[5px] rounded-lg text-[12.5px] text-[#54656f] shadow-[0_1px_2px_rgba(0,0,0,0.1)] font-medium tracking-wide">
            Today
          </div>
        </div>

        {messages.map((msg, index) => {
          const prevMsg = index > 0 ? messages[index - 1] : null;
          const nextMsg = index < messages.length - 1 ? messages[index + 1] : null;
          const isGroupedWithPrev = prevMsg && prevMsg.sender === msg.sender;
          const isGroupedWithNext = nextMsg && nextMsg.sender === msg.sender;
          
          return (
            <div
              key={msg.id}
              className={`flex w-full ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
              style={{ 
                marginTop: isGroupedWithPrev ? '2px' : '8px',
                marginBottom: isGroupedWithNext ? '0px' : '0px'
              }}
            >
              <div
                className={`relative inline-block max-w-[85%] sm:max-w-[70%] ${
                  msg.sender === "me" 
                    ? "bg-[#d9fdd3]" 
                    : "bg-white"
                }`}
                style={{
                  borderRadius: msg.sender === "me" 
                    ? '7.5px 0 7.5px 7.5px' 
                    : '0 7.5px 7.5px 7.5px',
                   // On real whatsapp, grouped messages have rounded corners, but simpler to keep 'tailed' look or subtle 
                  boxShadow: '0 1px 0.5px rgba(11,20,26,0.13)',
                  padding: '6px 7px 8px 9px',
                  fontSize: '14.2px',
                  lineHeight: '19px',
                  color: '#111b21',
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {/* Message Tail - Logic simplified for visual fidelity */}
                <div
                    className={`absolute ${msg.sender === "me" ? "-right-2" : "-left-2"} top-0 z-10`}
                >
                    {msg.sender === 'me' ? (
                      <svg viewBox="0 0 8 13" height="13" width="8" aria-hidden="true" className="text-[#d9fdd3] fill-current block">
                        <path d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 8 13" height="13" width="8" aria-hidden="true" className="text-white fill-current block transform -scale-x-100">
                         <path d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" />
                      </svg>
                    )}
                </div>

                <div className="relative pr-7 pb-1">
                  {msg.text}
                </div>
                
                <div 
                  className="absolute bottom-1 right-2 flex items-center gap-0.5 select-none"
                >
                  <span className="text-[11px] text-[#667781] mr-1">
                    {msg.time}
                  </span>
                  {msg.sender === "me" && (
                    <WhatsAppStatusIcon status={msg.status} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-2 py-1.5 flex items-end gap-2 z-10 relative" style={{ 
        backgroundColor: '#f0f2f5',
        minHeight: '62px',
        paddingBottom: '8px'
      }}>
        <div className="flex-1 bg-white rounded-2xl flex items-end min-h-[42px] py-2 px-3 shadow-sm border border-transparent focus-within:border-transparent">
            <Smile className="w-6 h-6 text-[#8696a0] cursor-pointer mb-0.5 hover:text-[#54656f] transition-colors" />
            
            <input 
                type="text" 
                placeholder="Message" 
                className="flex-1 outline-none text-[15px] text-[#111b21] placeholder-[#667781] bg-transparent mx-3 mb-0.5"
                disabled
            />
            
            <div className="flex items-center gap-4 mb-0.5">
                <Paperclip className="w-5 h-5 text-[#8696a0] -rotate-45 cursor-pointer hover:text-[#54656f] transition-colors" />
                <Camera className="w-5 h-5 text-[#8696a0] cursor-pointer hover:text-[#54656f] transition-colors" />
            </div>
        </div>
        <button 
          className="w-12 h-12 bg-[#008069] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#00705a] shadow-sm transition-transform active:scale-95" 
        >
            <Mic className="w-5 h-5 text-white fill-white" />
        </button>
      </div>
    </div>
  );
};

const WhatsAppStatusIcon = ({ status }: { status: string }) => {
    // Current WhatsApp Web/Desktop colors
    // Read: #53bdeb (Blue)
    // Delivered/Sent: #8696a0 (Gray)
    const gray = "#8696a0";
    const blue = "#53bdeb";

    if (status === 'sent') {
        return <Check className="w-4 h-4" color={gray} strokeWidth={2} />
    }
    if (status === 'delivered') {
        return <CheckCheck className="w-4 h-4" color={gray} strokeWidth={2} />
    }
    if (status === 'read') {
        return <CheckCheck className="w-4 h-4" color={blue} strokeWidth={2} />
    }
    return null;
}
