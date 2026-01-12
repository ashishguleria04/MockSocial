"use client";

import React, { useState } from "react";
import { useChatStore } from "@/store/useChatStore";
import { 
  MessageSquare, 
  Smartphone, 
  Trash2, 
  ArrowLeftRight, 
  Download, 
  Plus,
  TvMinimal,
  User,
  Clock,
  Sparkles
} from "lucide-react";
import { toPng } from "html-to-image";

export const Sidebar = () => {
  const store = useChatStore();
  const [newMessageText, setNewMessageText] = useState("");

  const handleAddMessage = () => {
    if (!newMessageText.trim()) return;
    store.addMessage({
      text: newMessageText,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "read",
    });
    setNewMessageText("");
  };

  const downloadScreenshot = async () => {
    const node = document.getElementById("chat-canvas");
    if (!node) return;

    try {
      const dataUrl = await toPng(node, { pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `mockup_${store.platform}_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate screenshot", err);
    }
  };

  return (
    <div className="w-[460px] h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/60 flex flex-col overflow-hidden flex-shrink-0 shadow-[4px_0_30px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="px-12 pt-14 pb-10 border-b border-slate-700/50 bg-gradient-to-b from-slate-800/50 to-transparent">
        <div className="flex items-center gap-5 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-blue-500/30 ring-2 ring-blue-500/20">
            <Sparkles className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-50 tracking-tight mb-1">MockSocial</h1>
            <p className="text-sm text-slate-400 font-medium">Create realistic chat screenshots</p>
          </div>
        </div>
      </div>

      {/* Platform Picker */}
      <div className="px-12 py-10 border-b border-slate-700/50 bg-slate-800/30">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-7 block">
          Choose Platform
        </label>
        <div className="grid grid-cols-3 gap-4">
          {(["signal", "imessage", "whatsapp"] as const).map((p) => (
            <button
              key={p}
              onClick={() => store.setPlatform(p)}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 ${
                store.platform === p
                  ? "border-blue-500 bg-gradient-to-br from-blue-500/25 via-indigo-500/20 to-purple-500/15 text-blue-300 shadow-xl shadow-blue-500/25 scale-105 ring-2 ring-blue-500/30"
                  : "border-slate-700/70 hover:border-slate-600 hover:bg-slate-700/40 text-slate-400 hover:text-slate-300 hover:scale-[1.02] bg-slate-800/40"
              }`}
            >
              <div className={`mb-3.5 transition-transform duration-300 ${store.platform === p ? 'scale-110' : ''}`}>
                {p === 'signal' && <TvMinimal className="w-7 h-7" strokeWidth={2} />}
                {p === 'imessage' && <MessageSquare className="w-7 h-7" strokeWidth={2} />}
                {p === 'whatsapp' && <Smartphone className="w-7 h-7" strokeWidth={2} />}
              </div>
              <span className="text-xs font-bold capitalize tracking-wide">{p}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="px-12 py-10 border-b border-slate-700/50 bg-slate-800/30">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-7 block">
          Contact Information
        </label>
        <div className="space-y-5">
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
              <User className="w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors duration-200" strokeWidth={2.5} />
            </div>
            <input
              type="text"
              placeholder="Enter contact name"
              value={store.contact.name}
              onChange={(e) => store.updateContact({ name: e.target.value })}
              className="w-full pl-16 pr-6 py-5 bg-slate-700/60 backdrop-blur-sm border-2 border-slate-600/60 rounded-2xl focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60 outline-none text-slate-100 text-[15px] font-medium transition-all duration-200 placeholder:text-slate-500 hover:border-slate-500/60 hover:bg-slate-700/70"
            />
          </div>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
              <Clock className="w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors duration-200" strokeWidth={2.5} />
            </div>
            <input
              type="text"
              placeholder="Status (e.g., Online, Typing...)"
              value={store.contact.status}
              onChange={(e) => store.updateContact({ status: e.target.value })}
              className="w-full pl-16 pr-6 py-5 bg-slate-700/60 backdrop-blur-sm border-2 border-slate-600/60 rounded-2xl focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60 outline-none text-slate-100 text-[15px] font-medium transition-all duration-200 placeholder:text-slate-500 hover:border-slate-500/60 hover:bg-slate-700/70"
            />
          </div>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto px-12 py-10 space-y-5 bg-gradient-to-b from-slate-800/20 to-transparent">
        <div className="flex items-center justify-between mb-7">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">
            Messages
          </label>
          <span className="text-xs text-slate-300 font-bold bg-gradient-to-r from-blue-500/20 to-indigo-500/20 px-4 py-2 rounded-xl border border-blue-500/30">{store.messages.length}</span>
        </div>
        
        {store.messages.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-purple-500/10 flex items-center justify-center border-2 border-slate-700/50 shadow-lg">
              <MessageSquare className="w-12 h-12 text-blue-400" strokeWidth={2} />
            </div>
            <p className="text-base font-semibold text-slate-300 mb-2">No messages yet</p>
            <p className="text-sm text-slate-500">Add a message below to get started</p>
          </div>
        ) : (
          store.messages.map((msg, index) => (
            <div 
              key={msg.id} 
              className="bg-slate-700/50 backdrop-blur-sm p-6 rounded-2xl border-2 border-slate-600/60 group hover:border-slate-500/80 hover:bg-slate-700/60 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3.5">
                  <span className={`text-[11px] font-bold px-4 py-2 rounded-xl border-2 ${
                    msg.sender === 'me' 
                      ? 'bg-gradient-to-r from-blue-500/30 to-indigo-500/30 text-blue-200 border-blue-500/40' 
                      : 'bg-slate-600/50 text-slate-300 border-slate-600/60'
                  }`}>
                    {msg.sender === 'me' ? 'You' : 'Them'}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{msg.time}</span>
                </div>
                <div className="flex gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button 
                    onClick={() => store.updateMessage(msg.id, { sender: msg.sender === 'me' ? 'them' : 'me' })}
                    className="p-2.5 hover:bg-slate-600/60 rounded-xl text-slate-400 hover:text-slate-200 transition-all border border-transparent hover:border-slate-500/40"
                    title="Toggle sender"
                  >
                    <ArrowLeftRight className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                  <button 
                    onClick={() => store.deleteMessage(msg.id)}
                    className="p-2.5 hover:bg-red-500/20 rounded-xl text-red-400 hover:text-red-300 transition-all border border-transparent hover:border-red-500/30"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
              <textarea
                value={msg.text}
                onChange={(e) => store.updateMessage(msg.id, { text: e.target.value })}
                className="w-full text-[15px] text-slate-100 bg-transparent outline-none resize-none leading-relaxed min-h-[56px] placeholder:text-slate-500 font-medium"
                rows={Math.max(2, Math.ceil(msg.text.length / 40))}
                placeholder="Enter message text..."
              />
            </div>
          ))
        )}
      </div>

      {/* Add Message & Actions */}
      <div className="px-12 py-8 border-t border-slate-700/50 bg-gradient-to-t from-slate-800/90 to-slate-800/50 backdrop-blur-xl">
        <div className="flex gap-3.5 mb-5">
          <input
            type="text"
            placeholder="Type a new message..."
            value={newMessageText}
            onChange={(e) => setNewMessageText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddMessage()}
            className="flex-1 px-6 py-5 bg-slate-700/60 backdrop-blur-sm border-2 border-slate-600/60 rounded-2xl focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60 outline-none text-[15px] text-slate-100 font-medium transition-all duration-200 placeholder:text-slate-500 hover:border-slate-500/60 hover:bg-slate-700/70"
          />
          <button 
            onClick={handleAddMessage}
            className="px-7 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white rounded-2xl transition-all flex items-center justify-center shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95 border-2 border-blue-500/20"
            title="Add message"
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
        
        <button
          onClick={downloadScreenshot}
          className="w-full py-5 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 hover:from-slate-600 hover:via-slate-500 hover:to-slate-600 text-white rounded-2xl flex items-center justify-center gap-3.5 font-bold transition-all text-[15px] shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] border-2 border-slate-600/50"
        >
          <Download className="w-5 h-5" strokeWidth={2.5} />
          Download Screenshot
        </button>
      </div>
    </div>
  );
};
