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
  Lock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Bot,
  Share2,
  Users,
  Palette,
  Info,
  Play,
  X
} from "lucide-react";
import { toPng } from "html-to-image";

export const Sidebar = () => {
  const store = useChatStore();
  const [newMessageText, setNewMessageText] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [expandedSections, setExpandedSections] = useState({
    app: true,
    directMessage: false,
    people: false,
    messages: false,
    appearance: false,
    about: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

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

  const platforms = [
    { id: 'signal', name: 'Signal', icon: TvMinimal, color: 'bg-blue-500', available: true },
    { id: 'imessage', name: 'iMessage', icon: MessageSquare, color: 'bg-black', available: true },
    { id: 'whatsapp', name: 'WhatsApp', icon: Smartphone, color: 'bg-green-500', available: true },
  ];

  return (
    <div className="w-[400px] h-screen bg-gray-50 border-r border-gray-200 flex flex-col overflow-hidden flex-shrink-0">
      {/* Top Header */}
      <div className="px-8 py-6 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">MockSocial</h1>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-full flex items-center gap-2 transition-all">
              <Lock className="w-4 h-4" />
              Unlock
            </button>
            <button className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium rounded-full flex items-center gap-2 transition-all">
              Sign In
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex-1 px-5 py-3 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === "chat"
                ? "bg-gray-900 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Chat
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`flex-1 px-5 py-3 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === "ai"
                ? "bg-gray-900 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            <Bot className="w-4 h-4" />
            AI Chat
          </button>
          <button
            onClick={() => setActiveTab("social")}
            className={`flex-1 px-5 py-3 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === "social"
                ? "bg-gray-900 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            <Share2 className="w-4 h-4" />
            Social Post
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {/* App Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection("app")}
            className="w-full px-8 py-5 flex items-center justify-between hover:bg-gray-100 transition-colors rounded-lg mx-3 my-2"
          >
            <div className="flex items-center gap-4">
              <Smartphone className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-900">App</span>
            </div>
            {expandedSections.app ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
          
          {expandedSections.app && (
            <div className="px-8 pb-8">
              <div className="grid grid-cols-4 gap-4">
                {platforms.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <button
                      key={platform.id}
                      onClick={() => store.setPlatform(platform.id as any)}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all ${
                        store.platform === platform.id
                          ? "bg-white ring-2 ring-blue-500 scale-105 shadow-md"
                          : "bg-white hover:bg-gray-50 hover:scale-105 shadow-sm"
                      }`}
                    >
                      <div className={`w-14 h-14 ${platform.color} rounded-2xl flex items-center justify-center mb-3 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-[10px] text-gray-700 font-medium text-center leading-tight">
                        {platform.name}
                      </span>
                      {!platform.available && (
                        <Lock className="absolute top-2 right-2 w-4 h-4 text-yellow-500 bg-white rounded-full p-0.5 shadow-sm" />
                      )}
                    </button>
                  );
                })}
                <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white hover:bg-gray-50 transition-all hover:scale-105 shadow-sm">
                  <div className="w-14 h-14 bg-gray-200 rounded-2xl flex items-center justify-center mb-3">
                    <X className="w-7 h-7 text-gray-400" />
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Type Direct Message */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection("directMessage")}
            className="w-full px-8 py-5 flex items-center justify-between hover:bg-gray-100 transition-colors rounded-lg mx-3 my-2"
          >
            <div className="flex items-center gap-4">
              <MessageSquare className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-900">Type Direct Message</span>
            </div>
            {expandedSections.directMessage ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
          
          {expandedSections.directMessage && (
            <div className="px-8 pb-8 space-y-5">
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Contact name"
                  value={store.contact.name}
                  onChange={(e) => store.updateContact({ name: e.target.value })}
                  className="w-full pl-14 pr-5 py-4 bg-white border border-gray-300 rounded-full text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Status"
                  value={store.contact.status}
                  onChange={(e) => store.updateContact({ status: e.target.value })}
                  className="w-full pl-14 pr-5 py-4 bg-white border border-gray-300 rounded-full text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* People Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection("people")}
            className="w-full px-8 py-5 flex items-center justify-between hover:bg-gray-100 transition-colors rounded-lg mx-3 my-2"
          >
            <div className="flex items-center gap-4">
              <Users className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-900">People</span>
              <span className="text-xs text-gray-500 bg-gray-200 px-3 py-1.5 rounded-full">2</span>
            </div>
            {expandedSections.people ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>

        {/* Messages Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection("messages")}
            className="w-full px-8 py-5 flex items-center justify-between hover:bg-gray-100 transition-colors rounded-lg mx-3 my-2"
          >
            <div className="flex items-center gap-4">
              <MessageSquare className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-900">Messages</span>
              <span className="text-xs text-gray-500 bg-gray-200 px-3 py-1.5 rounded-full">{store.messages.length}</span>
            </div>
            {expandedSections.messages ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
          
          {expandedSections.messages && (
            <div className="px-8 pb-8 space-y-4 max-h-[400px] overflow-y-auto">
              {store.messages.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-sm">
                  No messages yet
                </div>
              ) : (
                store.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="bg-white p-5 rounded-2xl border border-gray-200 group hover:border-gray-300 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-medium px-4 py-2 rounded-full ${
                          msg.sender === 'me' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {msg.sender === 'me' ? 'You' : 'Them'}
                        </span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => store.updateMessage(msg.id, { sender: msg.sender === 'me' ? 'them' : 'me' })}
                          className="p-2.5 hover:bg-gray-100 rounded-full text-gray-500 transition-all"
                        >
                          <ArrowLeftRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => store.deleteMessage(msg.id)}
                          className="p-2.5 hover:bg-red-50 rounded-full text-red-500 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <textarea
                      value={msg.text}
                      onChange={(e) => store.updateMessage(msg.id, { text: e.target.value })}
                      className="w-full text-sm text-gray-900 bg-transparent outline-none resize-none min-h-[48px] rounded-lg"
                      rows={2}
                    />
                  </div>
                ))
              )}
              
              {/* Add Message Input */}
              <div className="flex gap-3 pt-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddMessage()}
                  className="flex-1 px-5 py-3.5 bg-white border border-gray-300 rounded-full text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  onClick={handleAddMessage}
                  className="px-5 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Appearance Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection("appearance")}
            className="w-full px-8 py-5 flex items-center justify-between hover:bg-gray-100 transition-colors rounded-lg mx-3 my-2"
          >
            <div className="flex items-center gap-4">
              <Palette className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-900">Appearance</span>
              <span className="text-[10px] text-yellow-600 bg-yellow-100 px-2.5 py-1 rounded-full">NEW ✨</span>
            </div>
            {expandedSections.appearance ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>

        {/* About Section */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleSection("about")}
            className="w-full px-8 py-5 flex items-center justify-between hover:bg-gray-100 transition-colors rounded-lg mx-3 my-2"
          >
            <div className="flex items-center gap-4">
              <Info className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-900">About</span>
            </div>
            {expandedSections.about ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-5 border-t border-gray-200 bg-white">
        <div className="flex gap-5 text-xs text-gray-500">
          <button className="hover:text-gray-700 transition-colors rounded-lg px-3 py-1.5">Terms</button>
          <button className="hover:text-gray-700 transition-colors rounded-lg px-3 py-1.5">Privacy</button>
          <button className="hover:text-gray-700 transition-colors rounded-lg px-3 py-1.5">API</button>
        </div>
      </div>
    </div>
  );
};
