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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
    <div className="w-full max-w-[680px] h-screen bg-white flex flex-col overflow-hidden font-sans border-r border-gray-200">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black text-gray-700 tracking-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>MockSocial</h1>
          </div>
          
          <div className="flex gap-3">
            <Button variant="default" className="gap-2 rounded-xl text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              Unlock all features
            </Button>
            <Button variant="outline" className="gap-2 rounded-xl text-xs font-semibold hover:bg-gray-50">
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </Button>
          </div>
        </div>

        <div className="flex gap-2 p-1 bg-gray-50/50 rounded-xl border border-gray-100">
          {[
            { id: 'chat', label: 'Chat', icon: MessageSquare },
            { id: 'ai', label: 'AI Chat', icon: Bot },
            { id: 'social', label: 'Social Post', icon: Share2 }
          ].map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={`flex-1 gap-2 rounded-lg text-sm font-semibold h-11 transition-all ${
                activeTab === tab.id 
                  ? "shadow-sm" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-8">
          
          {/* App Section */}
          <section>
            <button 
              onClick={() => toggleSection('app')}
              className="flex items-center justify-between w-full mb-4 group hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                   <Smartphone className="w-4 h-4 text-gray-900" />
                </div>
                <span className="text-base font-bold text-gray-900">App</span>
                <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-white border-none h-5 px-1.5">
                  ✓
                </Badge>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.app ? 'rotate-180' : ''}`} />
            </button>
            
            {expandedSections.app && (
              <div className="grid grid-cols-2 gap-3 animate-in slide-in-from-top-2 duration-200">
                {platforms.map((p) => {
                  const isSelected = store.platform === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => !p.locked && store.setPlatform(p.id as any)}
                      className={`relative px-4 py-3 rounded-xl flex items-center gap-3 transition-all border-2 group ${
                        p.special && isSelected
                          ? 'bg-green-600 border-green-600 text-white shadow-md' 
                          : isSelected
                          ? 'bg-gray-900 border-gray-900 text-white shadow-md'
                          : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                      } ${p.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]'}`}
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">{p.icon}</span>
                      <span className={`text-sm font-semibold ${isSelected ? 'text-white' : p.color}`}>{p.name}</span>
                      {p.locked && <Lock className="w-3.5 h-3.5 text-gray-400 ml-auto" />}
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
              className="flex items-center justify-between w-full mb-4 group hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-gray-900" />
                 </div>
                <span className="text-base font-bold text-gray-900">Type</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.type ? 'rotate-180' : ''}`} />
            </button>
            
            {expandedSections.type && (
              <div className="w-full bg-white border border-gray-200 px-4 py-3.5 rounded-xl text-sm font-medium text-gray-900 flex justify-between items-center cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all animate-in slide-in-from-top-2 duration-200">
                Direct Message
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            )}
          </section>

          {/* People Section */}
          <section>
            <button 
              onClick={() => toggleSection('people')}
              className="flex items-center justify-between w-full mb-4 group hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Users className="w-4 h-4 text-gray-900" />
                 </div>
                <span className="text-base font-bold text-gray-900">People</span>
                <Badge variant="secondary" className="px-2">2</Badge>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.people ? 'rotate-180' : ''}`} />
            </button>

            {expandedSections.people && (
              <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-gray-500 ml-1">Contact Name</span>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      value={store.contact.name}
                      onChange={(e) => store.updateContact({ name: e.target.value })}
                      className="pl-10"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-gray-500 ml-1">Status</span>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      value={store.contact.status}
                      onChange={(e) => store.updateContact({ status: e.target.value })}
                      className="pl-10"
                      placeholder="e.g. Online"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                   <span className="text-xs font-semibold text-gray-500 ml-1">Avatar</span>
                   <div className="flex gap-3 items-center">
                    <div className="w-11 h-11 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm">
                        {store.contact.avatar ? (
                        <img src={store.contact.avatar} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                        <User className="w-5 h-5 text-gray-400" />
                        )}
                    </div>
                    <Input
                        type="text"
                        value={store.contact.avatar || ''}
                        onChange={(e) => store.updateContact({ avatar: e.target.value })}
                        className="flex-1"
                        placeholder="Image URL..."
                    />
                   </div>
                </div>
              </div>
            )}
          </section>

          {/* Messages Section */}
          <section>
            <button 
              onClick={() => toggleSection('messages')}
              className="flex items-center justify-between w-full mb-4 group hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-gray-900" />
                 </div>
                <span className="text-base font-bold text-gray-900">Messages</span>
                <Badge variant="secondary">{store.messages.length}</Badge>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.messages ? 'rotate-180' : ''}`} />
            </button>

            {expandedSections.messages && (
              <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Type new message..."
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleAddMessage}
                    size="icon"
                    className="shrink-0"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {store.messages.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                      <p className="text-sm text-gray-500 font-medium">No messages yet</p>
                    </div>
                  ) : (
                    store.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className="group relative bg-white p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <Badge variant={msg.sender === 'me' ? 'default' : 'secondary'} className="uppercase text-[10px] tracking-wider px-2 py-0.5 h-auto">
                            {msg.sender === 'me' ? 'You' : 'Them'}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-400 font-medium">{msg.time}</span>
                            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded transition-all" onClick={() => store.deleteMessage(msg.id)}>
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 text-gray-400 hover:text-gray-700 rounded transition-all" onClick={() => store.updateMessage(msg.id, { sender: msg.sender === 'me' ? 'them' : 'me' })}>
                              <ArrowLeftRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <textarea
                          value={msg.text}
                          onChange={(e) => store.updateMessage(msg.id, { text: e.target.value })}
                          className="w-full text-sm text-gray-700 bg-transparent outline-none resize-none font-medium leading-relaxed"
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
              className="flex items-center justify-between w-full mb-4 group hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Palette className="w-4 h-4 text-gray-900" />
                 </div>
                <span className="text-base font-bold text-gray-900">Appearance</span>
                <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-700 gap-1">
                  NEW <Sparkles className="w-3 h-3" />
                </Badge>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.appearance ? 'rotate-180' : ''}`} />
            </button>
            {expandedSections.appearance && (
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 text-center animate-in slide-in-from-top-2 duration-200">
                <p className="text-sm text-gray-500 font-medium">More customization coming soon!</p>
              </div>
            )}
          </section>

          {/* About Section */}
          <section>
            <button 
              onClick={() => toggleSection('about')}
              className="flex items-center justify-between w-full mb-4 group hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Info className="w-4 h-4 text-gray-900" />
                 </div>
                <span className="text-base font-bold text-gray-900">About</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.about ? 'rotate-180' : ''}`} />
            </button>
          </section>

        </div>
      </div>
      
      {/* Footer */}
      <div className="p-6 border-t border-gray-200 bg-gray-50/40 backdrop-blur-sm">
        <div className="flex justify-center items-center gap-4 text-xs font-medium text-gray-500">
          <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
          <span className="text-gray-300">·</span>
          <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
          <span className="text-gray-300">·</span>
          <a href="#" className="hover:text-gray-900 transition-colors">API</a>
        </div>
      </div>
    </div>
  );
};