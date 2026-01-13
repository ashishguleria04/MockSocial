"use client";

import React, { useState } from "react";
import { useChatStore } from "@/store/useChatStore";
import { 
  MessageSquare, 
  Smartphone, 
  Trash2, 
  ArrowLeftRight, 
  User,
  Clock,
  Lock,
  ArrowRight,
  ChevronDown,
  Bot,
  Share2,
  Users,
  Palette,
  Info,
  LogIn,
  Sparkles
} from "lucide-react";

export const Sidebar = () => {
  const store = useChatStore();
  const [newMessageText, setNewMessageText] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [expandedSections, setExpandedSections] = useState({
    app: true,
    type: true,
    people: true,
    messages: true,
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

  const platforms = [
    { id: 'discord', name: 'Discord', icon: '🎮', color: 'text-indigo-600', locked: true },
    { id: 'imessage', name: 'iMessage', icon: '🍎', color: 'text-gray-900', locked: true },
    { id: 'instagram', name: 'Instagram', icon: '📷', color: 'text-pink-600', locked: true },
    { id: 'line', name: 'LINE', icon: '💬', color: 'text-green-600', locked: false },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'text-blue-700', locked: true },
    { id: 'messenger', name: 'Messenger', icon: '📱', color: 'text-blue-500', locked: false },
    { id: 'teams', name: 'Microsoft Teams', icon: '🏢', color: 'text-indigo-500', locked: false },
    { id: 'reddit', name: 'Reddit', icon: '🔴', color: 'text-orange-600', locked: false },
    { id: 'signal', name: 'Signal', icon: '🔒', color: 'text-blue-600', locked: false },
    { id: 'slack', name: 'Slack', icon: '💼', color: 'text-gray-900', locked: false },
    { id: 'snapchat', name: 'Snapchat', icon: '👻', color: 'text-gray-900', locked: false },
    { id: 'telegram', name: 'Telegram', icon: '✈️', color: 'text-blue-400', locked: true },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'text-gray-900', locked: false },
    { id: 'tinder', name: 'Tinder', icon: '🔥', color: 'text-orange-500', locked: false },
    { id: 'wechat', name: 'WeChat', icon: '💚', color: 'text-green-600', locked: false },
    { id: 'whatsapp', name: 'WhatsApp', icon: '💚', color: 'text-white', locked: false, special: true },
    { id: 'x', name: 'X', icon: '✖️', color: 'text-gray-900', locked: false },
  ];

  return (
    <div className="w-full max-w-[680px] h-screen bg-white flex flex-col overflow-hidden font-sans">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black text-gray-900" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '-0.02em' }}>MockSocial</h1>
          </div>
          
          <div className="flex gap-3">
            <button className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-all">
              <Lock className="w-4 h-4" />
              Unlock all features
            </button>
            <button className="px-5 py-2.5 border-2 border-gray-200 text-gray-700 text-sm font-semibold rounded-xl flex items-center gap-2 hover:bg-gray-50 transition-all">
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          {[
            { id: 'chat', label: 'Chat', icon: MessageSquare },
            { id: 'ai', label: 'AI Chat', icon: Bot },
            { id: 'social', label: 'Social Post', icon: Share2 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? "bg-gray-900 text-white"
                  : "bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          
          {/* App Section */}
          <section>
            <button 
              onClick={() => toggleSection('app')}
              className="flex items-center justify-between w-full mb-4 group"
            >
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-gray-900" />
                <span className="text-base font-semibold text-gray-900">App</span>
                <div className="w-6 h-6 rounded-lg bg-green-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.app ? 'rotate-180' : ''}`} />
            </button>
            
            {expandedSections.app && (
              <div className="grid grid-cols-2 gap-3">
                {platforms.map((p) => {
                  const isSelected = store.platform === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => !p.locked && store.setPlatform(p.id as any)}
                      className={`relative px-4 py-3 rounded-xl flex items-center gap-3 transition-all border-2 ${
                        p.special && isSelected
                          ? 'bg-green-500 border-green-500 text-white' 
                          : isSelected
                          ? 'bg-white border-gray-900'
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      } ${p.locked && 'opacity-60 cursor-not-allowed'}`}
                    >
                      <span className="text-lg">{p.icon}</span>
                      <span className={`text-sm font-semibold ${p.special && isSelected ? 'text-white' : p.color}`}>{p.name}</span>
                      {p.locked && <Lock className="w-3.5 h-3.5 text-amber-500 ml-auto" />}
                    </button>
                  )
                })}
              </div>
            )}
          </section>

          {/* Type Section */}
          <section>
            <button 
              onClick={() => toggleSection('type')}
              className="flex items-center justify-between w-full mb-4"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-gray-900" />
                <span className="text-base font-semibold text-gray-900">Type</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.type ? 'rotate-180' : ''}`} />
            </button>
            
            {expandedSections.type && (
              <div className="w-full bg-white border-2 border-gray-200 px-4 py-3 rounded-xl text-sm font-medium text-gray-900 flex justify-between items-center cursor-pointer hover:border-gray-300 transition-all">
                Direct Message
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            )}
          </section>

          {/* People Section */}
          <section>
            <button 
              onClick={() => toggleSection('people')}
              className="flex items-center justify-between w-full mb-4"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-900" />
                <span className="text-base font-semibold text-gray-900">People</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md text-xs font-semibold">2</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.people ? 'rotate-180' : ''}`} />
            </button>

            {expandedSections.people && (
              <div className="space-y-4">
                <div>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={store.contact.name}
                      onChange={(e) => store.updateContact({ name: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:border-gray-900 focus:outline-none transition-all placeholder:text-gray-400"
                      placeholder="Contact name"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={store.contact.status}
                      onChange={(e) => store.updateContact({ status: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:border-gray-900 focus:outline-none transition-all placeholder:text-gray-400"
                      placeholder="Status"
                    />
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                    {store.contact.avatar ? (
                      <img src={store.contact.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <input
                    type="text"
                    value={store.contact.avatar || ''}
                    onChange={(e) => store.updateContact({ avatar: e.target.value })}
                    className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:border-gray-900 focus:outline-none transition-all placeholder:text-gray-400"
                    placeholder="Profile picture URL"
                  />
                </div>
              </div>
            )}
          </section>

          {/* Messages Section */}
          <section>
            <button 
              onClick={() => toggleSection('messages')}
              className="flex items-center justify-between w-full mb-4"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-gray-900" />
                <span className="text-base font-semibold text-gray-900">Messages</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md text-xs font-semibold">{store.messages.length}</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.messages ? 'rotate-180' : ''}`} />
            </button>

            {expandedSections.messages && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type new message..."
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddMessage()}
                    className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:border-gray-900 focus:outline-none transition-all placeholder:text-gray-400"
                  />
                  <button
                    onClick={handleAddMessage}
                    className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center hover:bg-gray-800 transition-all"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {store.messages.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                      <p className="text-sm text-gray-500 font-medium">No messages yet</p>
                    </div>
                  ) : (
                    store.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className="group relative bg-white p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg uppercase ${
                            msg.sender === 'me' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {msg.sender === 'me' ? 'You' : 'Them'}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-400 font-medium">{msg.time}</span>
                            <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-all" onClick={() => store.deleteMessage(msg.id)}>
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-100 text-gray-400 hover:text-gray-700 rounded-lg transition-all" onClick={() => store.updateMessage(msg.id, { sender: msg.sender === 'me' ? 'them' : 'me' })}>
                              <ArrowLeftRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <textarea
                          value={msg.text}
                          onChange={(e) => store.updateMessage(msg.id, { text: e.target.value })}
                          className="w-full text-sm text-gray-800 bg-transparent outline-none resize-none font-medium leading-relaxed"
                          rows={Math.max(1, Math.ceil(msg.text.length / 40))}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </section>

          {/* Appearance Section */}
          <section>
            <button 
              onClick={() => toggleSection('appearance')}
              className="flex items-center justify-between w-full mb-4"
            >
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-gray-900" />
                <span className="text-base font-semibold text-gray-900">Appearance</span>
                <span className="bg-orange-100 text-orange-700 border border-orange-300 px-2 py-0.5 rounded-md text-xs font-bold flex items-center gap-1">
                  NEW <Sparkles className="w-3 h-3" />
                </span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.appearance ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.appearance && (
              <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200 text-center">
                <p className="text-sm text-gray-600 font-medium">More customization coming soon!</p>
              </div>
            )}
          </section>

          {/* About Section */}
          <section>
            <button 
              onClick={() => toggleSection('about')}
              className="flex items-center justify-between w-full mb-4"
            >
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-gray-900" />
                <span className="text-base font-semibold text-gray-900">About</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.about ? 'rotate-180' : ''}`} />
            </button>
          </section>

        </div>
      </div>
      
      {/* Footer */}
      <div className="p-6 border-t border-gray-200 bg-white">
        <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
          <a href="#" className="hover:text-gray-900 transition-colors font-medium">Terms</a>
          <span className="text-gray-300">·</span>
          <a href="#" className="hover:text-gray-900 transition-colors font-medium">Privacy</a>
          <span className="text-gray-300">·</span>
          <a href="#" className="hover:text-gray-900 transition-colors font-medium">API</a>
        </div>
      </div>
    </div>
  );
};