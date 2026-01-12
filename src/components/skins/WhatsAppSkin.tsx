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
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 whatsapp-bg"
        style={{ backgroundSize: '53%' }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#008069] text-white z-10 relative" style={{ height: '59px' }}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors flex-shrink-0" aria-label="Back">
             <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
             <div className="relative flex-shrink-0">
                {contact.avatar ? (
                    <img src={contact.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white overflow-hidden">
                        <svg className="w-full h-full text-gray-100 fill-current translate-y-1" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>
                )}
             </div>
             <div className="flex flex-col justify-center min-w-0 flex-1">
                <span className="text-[16px] leading-[21px] truncate" style={{ fontWeight: 400 }}>{contact.name}</span>
                <span className="text-[13px] leading-[20px] truncate opacity-90">
                    {contact.status || 'Online'}
                </span>
             </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6 pr-2 flex-shrink-0">
            <Video className="w-6 h-6 fill-white stroke-white cursor-pointer" strokeWidth={1.5} />
            <Phone className="w-6 h-6 fill-white stroke-white cursor-pointer" strokeWidth={1.5} />
            <MoreVertical className="w-6 h-6 cursor-pointer" strokeWidth={2} />
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-1 pb-2 flex flex-col z-10 relative" style={{ paddingTop: '6px', paddingBottom: '8px' }}>
        {/* Date Chip */}
        <div className="flex justify-center my-2">
          <div className="bg-white px-3 py-1 rounded-lg text-[12.5px] text-[#54656f]" style={{ 
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            fontWeight: 500,
            letterSpacing: '0.3px'
          }}>
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
                marginTop: isGroupedWithPrev ? '1px' : '2px',
                marginBottom: isGroupedWithNext ? '1px' : '2px'
              }}
            >
              <div
                className={`relative inline-block max-w-[65%] ${
                  msg.sender === "me" 
                    ? "bg-[#dcf8c6]" 
                    : "bg-white"
                }`}
                style={{
                  borderRadius: msg.sender === "me" 
                    ? (isGroupedWithNext ? '7.5px 7.5px 0 7.5px' : isGroupedWithPrev ? '7.5px 7.5px 7.5px 0' : '7.5px 7.5px 0 7.5px')
                    : (isGroupedWithNext ? '7.5px 0 7.5px 7.5px' : isGroupedWithPrev ? '0 7.5px 7.5px 7.5px' : '0 7.5px 7.5px 7.5px'),
                  boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
                  padding: '6px 7px 8px 9px',
                  fontSize: '14.2px',
                  lineHeight: '19px',
                  color: '#111b21',
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {/* Message Tail - Only on last message in group */}
                {!isGroupedWithNext && (
                  <div
                    className={`absolute ${msg.sender === "me" ? "right-0" : "left-0"} bottom-0`}
                    style={{
                      width: '8px',
                      height: '13px',
                      [msg.sender === "me" ? "marginRight" : "marginLeft"]: '-8px',
                      marginBottom: '0'
                    }}
                  >
                    {msg.sender === 'me' ? (
                      <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="none" style={{ display: 'block' }}>
                        <path 
                          d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" 
                          fill="#dcf8c6"
                          style={{ filter: 'drop-shadow(0 1px 0.5px rgba(0,0,0,0.13))' }}
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="none" style={{ display: 'block', transform: 'scaleX(-1)' }}>
                        <path 
                          d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" 
                          fill="white"
                          style={{ filter: 'drop-shadow(0 1px 0.5px rgba(0,0,0,0.13))' }}
                        />
                      </svg>
                    )}
                  </div>
                )}

                <div style={{ paddingRight: msg.sender === "me" ? '50px' : '50px', marginBottom: '2px' }}>
                  {msg.text}
                </div>
                
                <div 
                  className={`absolute flex items-center gap-1 ${msg.sender === "me" ? "right-[7px]" : "right-[7px]"}`}
                  style={{ bottom: '4px' }}
                >
                  <span style={{ 
                    fontSize: '11px', 
                    color: '#667781',
                    lineHeight: '15px',
                    marginRight: msg.sender === "me" ? '3px' : '0'
                  }}>
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
      <div className="px-2 py-2 flex items-end gap-2 z-10 relative" style={{ 
        backgroundColor: '#f0f2f5',
        paddingTop: '5px',
        paddingBottom: '5px',
        minHeight: '62px'
      }}>
        <div className="flex-1 bg-white rounded-[21px] flex items-center" style={{
          paddingLeft: '9px',
          paddingRight: '9px',
          paddingTop: '9px',
          paddingBottom: '9px',
          minHeight: '42px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        }}>
            <Smile className="w-7 h-7 text-[#8696a0] cursor-pointer flex-shrink-0" strokeWidth={1.5} style={{ marginRight: '8px' }} />
            <input 
                type="text" 
                placeholder="Type a message" 
                className="flex-1 outline-none text-[15px] text-[#111b21] placeholder-[#667781] bg-transparent"
                style={{ 
                  padding: '0',
                  lineHeight: '20px',
                  fontFamily: 'inherit'
                }}
                disabled
            />
            <div className="flex items-center gap-1 text-[#8696a0] flex-shrink-0" style={{ marginLeft: '8px' }}>
                <Paperclip className="w-6 h-6 -rotate-45 cursor-pointer" strokeWidth={2} />
                <Camera className="w-6 h-6 cursor-pointer" strokeWidth={2} style={{ marginLeft: '8px' }} />
            </div>
        </div>
        <div 
          className="bg-[#008069] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#00705a] shrink-0 transition-all flex-shrink-0" 
          style={{
            width: '42px',
            height: '42px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}
        >
            <Mic className="w-5 h-5 text-white fill-white" />
        </div>
      </div>
    </div>
  );
};

const WhatsAppStatusIcon = ({ status }: { status: string }) => {
    const baseStyle = {
      width: '16px',
      height: '16px',
      flexShrink: 0
    };

    if (status === 'sent') {
        return <Check className="text-[#8696a0]" strokeWidth={2.5} style={baseStyle} />
    }
    if (status === 'delivered') {
        return <CheckCheck className="text-[#8696a0]" strokeWidth={2.5} style={baseStyle} />
    }
    if (status === 'read') {
        return <CheckCheck className="text-[#53bdeb] fill-[#53bdeb]" strokeWidth={2.5} style={baseStyle} />
    }
    return null;
}
