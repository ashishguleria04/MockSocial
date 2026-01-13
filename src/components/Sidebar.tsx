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
  Menu,
  X,
  CheckCircle2,
  Image as ImageIcon
} from "lucide-react";
import { toPng } from "html-to-image";

// Icons for platforms (using Lucide proxies where specific brand icons aren't available)
const BrandIcon = ({ name, className }: { name: string; className?: string }) => {
  // In a real app, use SVGs for brands. Here we map to lucide or simple text fallback
  switch(name.toLowerCase()) {
    case 'whatsapp': return <Smartphone className={className} />;
    case 'imessage': return <MessageSquare className={className} />;
    case 'signal': return <TvMinimal className={className} />;
    default: return <MessageSquare className={className} />;
  }
};

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
    { id: 'whatsapp', name: 'WhatsApp', color: 'bg-[#25D366] text-white', border: 'border-transparent', available: true },
    { id: 'imessage', name: 'iMessage', color: 'bg-black text-white', border: 'border-transparent', available: true },
    { id: 'signal', name: 'Signal', color: 'bg-[#3A76F0] text-white', border: 'border-transparent', available: true },
    { id: 'discord', name: 'Discord', color: 'bg-[#5865F2] text-white', border: 'border-transparent', available: false },
    { id: 'instagram', name: 'Instagram', color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white', border: 'border-transparent', available: false },
    { id: 'messenger', name: 'Messenger', color: 'bg-blue-500 text-white', border: 'border-transparent', available: false },
    { id: 'telegram', name: 'Telegram', color: 'bg-[#0088cc] text-white', border: 'border-transparent', available: false },
    { id: 'twitter', name: 'Twitter', color: 'bg-black text-white', border: 'border-transparent', available: false },
  ];

  return (
    <div className="w-[450px] h-screen bg-white border-r border-gray-100 flex flex-col overflow-hidden font-sans shadow-xl shadow-gray-100/50 z-20">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 bg-white/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl">M</div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">MockSocial</h1>
          </div>
          
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-full flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg shadow-gray-200">
              <Lock className="w-3 h-3" />
              Unlock all features
            </button>
          </div>
        </div>

        <div className="p-1 bg-gray-100 rounded-xl flex gap-1">
          {['Chat', 'AI Chat', 'Social Post'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === tab.toLowerCase().split(' ')[0]
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                {tab === 'Chat' && <MessageSquare className="w-3.5 h-3.5" />}
                {tab === 'AI Chat' && <Bot className="w-3.5 h-3.5" />}
                {tab === 'Social Post' && <Share2 className="w-3.5 h-3.5" />}
                {tab}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-6 space-y-8">
          
          {/* Apps Grid */}
          <section>
            <button 
              onClick={() => toggleSection('app')}
              className="flex items-center justify-between w-full mb-4 group"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <Smartphone className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                App
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.app ? 'rotate-180' : ''}`} />
            </button>
            
            {expandedSections.app && (
              <div className="grid grid-cols-3 gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                {platforms.map((p) => {
                  const isSelected = store.platform === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => p.available && store.setPlatform(p.id as any)}
                      className={`relative px-3 py-3 rounded-xl flex items-center gap-2 transition-all border ${
                        isSelected 
                          ? 'bg-blue-50 border-blue-200 shadow-sm' 
                          : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                      } ${!p.available && 'opacity-60 cursor-not-allowed'}`}
                    >
                      <div className={`w-2 h-2 rounded-full ${p.id === 'whatsapp' ? 'bg-green-500' : p.id === 'imessage' ? 'bg-black' : p.id === 'signal' ? 'bg-blue-500' : 'bg-gray-300'}`} />
                      <span className={`text-[11px] font-semibold truncate ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>{p.name}</span>
                      {!p.available && <Lock className="w-3 h-3 text-gray-300 absolute right-2" />}
                    </button>
                  )
                })}
              </div>
            )}
          </section>

          {/* Type */}
          <section>
            <div className="flex items-center justify-between w-full mb-4">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                Type
              </div>
            </div>
            <div className="w-full bg-white border border-gray-200 px-4 py-3 rounded-xl text-xs font-semibold text-gray-700 flex justify-between items-center cursor-pointer hover:border-gray-300 transition-all shadow-sm">
              Direct Message
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
          </section>

          {/* People */}
          <section>
             <button 
              onClick={() => toggleSection('people')}
              className="flex items-center justify-between w-full mb-4 group"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <Users className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                People
                <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-md text-[10px]">2</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.people ? 'rotate-180' : ''}`} />
            </button>

            {expandedSections.people && (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="group relative">
                  <label className="text-[10px] font-semibold text-gray-400 mb-1.5 block uppercase tracking-wider ml-1">Contact Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      value={store.contact.name}
                      onChange={(e) => store.updateContact({ name: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium text-gray-800 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all placeholder:text-gray-400"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                </div>
                
                <div className="group relative">
                  <label className="text-[10px] font-semibold text-gray-400 mb-1.5 block uppercase tracking-wider ml-1">Status / Info</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      value={store.contact.status}
                      onChange={(e) => store.updateContact({ status: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium text-gray-800 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all placeholder:text-gray-400"
                      placeholder="e.g. Online"
                    />
                  </div>
                </div>

                 <div className="group relative">
                  <label className="text-[10px] font-semibold text-gray-400 mb-1.5 block uppercase tracking-wider ml-1">Profile Picture</label>
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                        {store.contact.avatar ? (
                            <img src={store.contact.avatar} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-5 h-5 text-gray-300" />
                        )}
                    </div>
                     <input
                      type="text"
                      value={store.contact.avatar || ''}
                      onChange={(e) => store.updateContact({ avatar: e.target.value })}
                      className="flex-1 px-4 py-3 bg-gray-50 border-none rounded-2xl text-[11px] font-medium text-gray-800 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all placeholder:text-gray-400"
                      placeholder="Paste image URL..."
                    />
                  </div>
                </div>

              </div>
            )}
          </section>

          {/* Messages */}
          <section>
            <button 
              onClick={() => toggleSection('messages')}
              className="flex items-center justify-between w-full mb-4 group"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <MessageSquare className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                Messages
                <span className="bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-md text-[10px]">{store.messages.length}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.messages ? 'rotate-180' : ''}`} />
            </button>

            {expandedSections.messages && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                 {/* Input Area */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type new message..."
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddMessage()}
                    className="flex-1 px-4 py-3 bg-gray-50 border-none rounded-full text-sm font-medium text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-400"
                  />
                  <button
                    onClick={handleAddMessage}
                    className="w-11 h-11 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all shadow-lg hover:scale-105 active:scale-95"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {store.messages.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                      <p className="text-xs text-gray-400 font-medium">No messages yet. Start typing!</p>
                    </div>
                  ) : (
                    store.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className="group relative bg-white p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200"
                      >
                         <div className="flex justify-between items-center mb-2">
                             <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide ${
                                msg.sender === 'me' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'
                             }`}>
                                {msg.sender === 'me' ? 'You' : 'Them'}
                             </span>
                             <div className="flex items-center gap-1">
                                <span className="text-[10px] text-gray-300 font-medium">{msg.time}</span>
                                <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 text-gray-300 hover:text-red-500 rounded-lg transition-all" onClick={() => store.deleteMessage(msg.id)}>
                                    <Trash2 className="w-3 h-3" />
                                </button>
                                <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-blue-50 text-gray-300 hover:text-blue-500 rounded-lg transition-all" onClick={() => store.updateMessage(msg.id, { sender: msg.sender === 'me' ? 'them' : 'me' })}>
                                    <ArrowLeftRight className="w-3 h-3" />
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

          {/* Appearance (Placeholder) */}
           <section>
            <button 
              onClick={() => toggleSection('appearance')}
              className="flex items-center justify-between w-full mb-4 group"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <Palette className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                Appearance
                <span className="text-[9px] bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded shadow-sm font-bold">NEW</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.appearance ? 'rotate-180' : ''}`} />
            </button>
             {expandedSections.appearance && (
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                    <p className="text-xs text-gray-500">More customization coming soon!</p>
                </div>
             )}
           </section>

        </div>
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="flex justify-between items-center">
            <div className="flex gap-4 text-[10px] font-semibold text-gray-400">
                <a href="#" className="hover:text-gray-600 transition-colors">Terms</a>
                <a href="#" className="hover:text-gray-600 transition-colors">Privacy</a>
                <a href="#" className="hover:text-gray-600 transition-colors">API</a>
            </div>
            <span className="text-[10px] text-gray-300 font-mono">v1.0.2</span>
        </div>
      </div>
    </div>
  );
};
