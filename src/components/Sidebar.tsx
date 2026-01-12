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
  Clock
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
    <div className="w-[440px] h-screen bg-slate-800/95 backdrop-blur-xl border-r border-slate-700/50 flex flex-col overflow-hidden flex-shrink-0 shadow-2xl">
      {/* Header */}
      <div className="px-10 pt-12 pb-8 border-b border-slate-700/50">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">MockSocial</h1>
            <p className="text-sm text-slate-400 font-medium mt-1">Create realistic screenshots</p>
          </div>
        </div>
      </div>

      {/* Platform Picker */}
      <div className="px-10 py-8 border-b border-slate-700/50">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 block">
          Platform
        </label>
        <div className="grid grid-cols-3 gap-4">
          {(["signal", "imessage", "whatsapp"] as const).map((p) => (
            <button
              key={p}
              onClick={() => store.setPlatform(p)}
              className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-200 ${
                store.platform === p
                  ? "border-blue-500 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-400 shadow-lg shadow-blue-500/20 scale-105"
                  : "border-slate-700/60 hover:border-slate-600 hover:bg-slate-700/30 text-slate-400 hover:text-slate-300 hover:scale-[1.02]"
              }`}
            >
              <div className={`mb-3 transition-transform ${store.platform === p ? 'scale-110' : ''}`}>
                {p === 'signal' && <TvMinimal className="w-6 h-6" />}
                {p === 'imessage' && <MessageSquare className="w-6 h-6" />}
                {p === 'whatsapp' && <Smartphone className="w-6 h-6" />}
              </div>
              <span className="text-xs font-bold capitalize">{p}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="px-10 py-8 border-b border-slate-700/50">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 block">
          Contact
        </label>
        <div className="space-y-4">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            <input
              type="text"
              placeholder="Contact name"
              value={store.contact.name}
              onChange={(e) => store.updateContact({ name: e.target.value })}
              className="w-full pl-14 pr-5 py-4 bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-slate-100 text-sm transition-all placeholder:text-slate-500 shadow-inner hover:bg-slate-700/60"
            />
          </div>
          <div className="relative group">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            <input
              type="text"
              placeholder="Status (e.g., Online)"
              value={store.contact.status}
              onChange={(e) => store.updateContact({ status: e.target.value })}
              className="w-full pl-14 pr-5 py-4 bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-slate-100 text-sm transition-all placeholder:text-slate-500 shadow-inner hover:bg-slate-700/60"
            />
          </div>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto px-10 py-8 space-y-4">
        <div className="flex items-center justify-between mb-6">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Messages
          </label>
          <span className="text-xs text-slate-300 font-bold bg-slate-700/60 px-3 py-1.5 rounded-lg">{store.messages.length}</span>
        </div>
        
        {store.messages.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border border-slate-700/50">
              <MessageSquare className="w-10 h-10 text-blue-400" />
            </div>
            <p className="text-sm font-semibold text-slate-300">No messages yet</p>
            <p className="text-xs mt-2.5 text-slate-500">Add a message below to get started</p>
          </div>
        ) : (
          store.messages.map((msg, index) => (
            <div 
              key={msg.id} 
              className="bg-slate-700/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-600/50 group hover:border-slate-500 hover:bg-slate-700/50 hover:shadow-xl transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-bold px-3.5 py-2 rounded-lg ${
                    msg.sender === 'me' 
                      ? 'bg-gradient-to-r from-blue-500/30 to-indigo-500/30 text-blue-300 border border-blue-500/30' 
                      : 'bg-slate-600/50 text-slate-300 border border-slate-600'
                  }`}>
                    {msg.sender === 'me' ? 'You' : 'Them'}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{msg.time}</span>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <button 
                    onClick={() => store.updateMessage(msg.id, { sender: msg.sender === 'me' ? 'them' : 'me' })}
                    className="p-2.5 hover:bg-slate-600/50 rounded-xl text-slate-400 hover:text-slate-200 transition-all"
                    title="Toggle sender"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => store.deleteMessage(msg.id)}
                    className="p-2.5 hover:bg-red-500/20 rounded-xl text-red-400 hover:text-red-300 transition-all"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <textarea
                value={msg.text}
                onChange={(e) => store.updateMessage(msg.id, { text: e.target.value })}
                className="w-full text-sm text-slate-100 bg-transparent outline-none resize-none leading-relaxed min-h-[52px] placeholder:text-slate-500 font-medium"
                rows={Math.max(2, Math.ceil(msg.text.length / 40))}
                placeholder="Message text..."
              />
            </div>
          ))
        )}
      </div>

      {/* Add Message & Actions */}
      <div className="px-10 py-7 border-t border-slate-700/50 bg-slate-800/80 backdrop-blur-xl">
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessageText}
            onChange={(e) => setNewMessageText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddMessage()}
            className="flex-1 px-5 py-4 bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none text-sm text-slate-100 transition-all placeholder:text-slate-500 shadow-inner hover:bg-slate-700/60"
          />
          <button 
            onClick={handleAddMessage}
            className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl transition-all flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95"
            title="Add message"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        <button
          onClick={downloadScreenshot}
          className="w-full py-4 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white rounded-2xl flex items-center justify-center gap-3 font-bold transition-all text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] border border-slate-600/50"
        >
          <Download className="w-5 h-5" />
          Download Screenshot
        </button>
      </div>
    </div>
  );
};
