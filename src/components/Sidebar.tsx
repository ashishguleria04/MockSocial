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
  TvMinimal
} from "lucide-react";
// We'll import toPng dynamically or normally if it works client-side.
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
    <div className="w-[400px] h-screen bg-white shadow-xl flex flex-col border-r border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Chat Mockup</h1>
        
        {/* Platform Picker */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {(["signal", "imessage", "whatsapp"] as const).map((p) => (
            <button
              key={p}
              onClick={() => store.setPlatform(p)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                store.platform === p
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-200 hover:border-gray-300 text-gray-500"
              }`}
            >
              {p === 'signal' && <TvMinimal className="w-6 h-6 mb-1" />}
              {p === 'imessage' && <MessageSquare className="w-6 h-6 mb-1" />}
              {p === 'whatsapp' && <Smartphone className="w-6 h-6 mb-1" />}
              <span className="text-xs font-semibold capitalize">{p}</span>
            </button>
          ))}
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Contact Info</h3>
            <input
              type="text"
              placeholder="Name"
              value={store.contact.name}
              onChange={(e) => store.updateContact({ name: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 text-sm"
            />
             <input
              type="text"
              placeholder="Status (e.g. Online)"
              value={store.contact.status}
              onChange={(e) => store.updateContact({ status: e.target.value })}
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 text-sm"
            />
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
         <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Messages</h3>
         {store.messages.map((msg) => (
            <div key={msg.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 group">
                <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${msg.sender === 'me' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                        {msg.sender.toUpperCase()}
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                            onClick={() => store.updateMessage(msg.id, { sender: msg.sender === 'me' ? 'them' : 'me' })}
                            className="p-1 hover:bg-gray-100 rounded text-gray-500"
                            title="Toggle Sender"
                         >
                            <ArrowLeftRight className="w-4 h-4" />
                         </button>
                         <button 
                            onClick={() => store.deleteMessage(msg.id)}
                            className="p-1 hover:bg-red-50 rounded text-red-500"
                            title="Delete"
                         >
                            <Trash2 className="w-4 h-4" />
                         </button>
                    </div>
                </div>
                <textarea
                    value={msg.text}
                    onChange={(e) => store.updateMessage(msg.id, { text: e.target.value })}
                    className="w-full text-sm text-gray-700 bg-transparent outline-none resize-none font-medium"
                    rows={2}
                />
            </div>
         ))}
      </div>

      {/* Add Message & Actions */}
      <div className="p-4 border-t border-gray-200 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex gap-2 mb-4">
            <input
                type="text"
                placeholder="Type a message..."
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddMessage()}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800"
            />
            <button 
                onClick={handleAddMessage}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
                <Plus className="w-5 h-5" />
            </button>
        </div>
        
        <button
            onClick={downloadScreenshot}
            className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center justify-center gap-2 font-medium transition-all transform hover:scale-[1.02]"
        >
            <Download className="w-4 h-4" />
            Download Screenshot
        </button>
      </div>
    </div>
  );
};
