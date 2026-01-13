"use client";

import React, { useState } from "react";
import { useChatStore } from "@/store/useChatStore";
import { 
  MessageSquare, 
  Trash2, 
  ArrowLeftRight, 
  User,
  Clock,
  Lock,
  ArrowRight,
  Bot,
  Share2,
  Users,
  Palette,
  Info,
  LogIn,
  Sparkles,
  Smartphone,
  CheckCircle2,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";

export const Sidebar = () => {
  const store = useChatStore();
  const [newMessageText, setNewMessageText] = useState("");
  const [activeTab, setActiveTab] = useState("chat");

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
    { id: 'discord', name: 'Discord', icon: <Icons.Discord className="w-6 h-6 fill-current" />, color: 'text-indigo-600', locked: true },
    { id: 'imessage', name: 'iMessage', icon: <Icons.Apple className="w-6 h-6 fill-current" />, color: 'text-slate-900', locked: true },
    { id: 'instagram', name: 'Instagram', icon: <Icons.Instagram className="w-6 h-6" />, color: 'text-pink-600', locked: true },
    { id: 'line', name: 'LINE', icon: <MessageSquare className="w-6 h-6" />, color: 'text-green-600', locked: false },
    { id: 'linkedin', name: 'LinkedIn', icon: <Smartphone className="w-6 h-6" />, color: 'text-blue-700', locked: true },
    { id: 'messenger', name: 'Messenger', icon: <Icons.Messenger className="w-6 h-6 fill-current" />, color: 'text-blue-500', locked: false },
    { id: 'teams', name: 'Microsoft Teams', icon: <Users className="w-6 h-6" />, color: 'text-indigo-500', locked: false },
    { id: 'reddit', name: 'Reddit', icon: <MessageSquare className="w-6 h-6" />, color: 'text-orange-600', locked: false },
    { id: 'signal', name: 'Signal', icon: <Icons.Signal className="w-6 h-6 fill-current" />, color: 'text-blue-600', locked: false },
    { id: 'slack', name: 'Slack', icon: <Icons.Slack className="w-6 h-6 fill-current" />, color: 'text-slate-900', locked: false },
    { id: 'snapchat', name: 'Snapchat', icon: <MessageSquare className="w-6 h-6" />, color: 'text-yellow-400', locked: false },
    { id: 'telegram', name: 'Telegram', icon: <Icons.Telegram className="w-6 h-6 fill-current" />, color: 'text-blue-400', locked: true },
    { id: 'tiktok', name: 'TikTok', icon: <Smartphone className="w-6 h-6" />, color: 'text-slate-900', locked: false },
    { id: 'tinder', name: 'Tinder', icon: <Smartphone className="w-6 h-6" />, color: 'text-red-500', locked: false },
    { id: 'wechat', name: 'WeChat', icon: <MessageSquare className="w-6 h-6" />, color: 'text-green-600', locked: false },
    { id: 'whatsapp', name: 'WhatsApp', icon: <Icons.WhatsApp className="w-6 h-6 fill-current" />, color: 'text-green-600', locked: false, special: false },
    { id: 'x', name: 'X', icon: <Icons.Twitter className="w-6 h-6 fill-current" />, color: 'text-slate-900', locked: false },
  ];

  return (
    <div className="w-full max-w-[460px] h-screen bg-white flex flex-col overflow-hidden font-sans border-r border-slate-200">
      {/* Header */}
      <div className="px-6 py-6 border-b border-slate-200 bg-white/80 backdrop-blur-xl sticky top-0 z-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
               <span className="text-xl font-black text-white tracking-tighter">M</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none group-hover:text-indigo-600 transition-colors">MockSocial</h1>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">v2.4 Beta</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
             <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-slate-100">
                <LogIn className="w-4 h-4 text-slate-500" />
             </Button>
             <Button className="h-9 px-4 rounded-xl font-bold text-xs gap-2 bg-slate-900 text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Pro
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full h-11 bg-slate-100 gap-1 rounded-xl p-1">
                <TabsTrigger value="chat" className="flex-1 rounded-lg gap-2 text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Chat
                </TabsTrigger>
                <TabsTrigger value="ai" className="flex-1 rounded-lg gap-2 text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <Bot className="w-3.5 h-3.5" />
                    AI Chat
                </TabsTrigger>
                <TabsTrigger value="social" className="flex-1 rounded-lg gap-2 text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <Share2 className="w-3.5 h-3.5" />
                    Social
                </TabsTrigger>
            </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 pb-20">
          
          <Accordion type="single" collapsible defaultValue="platform" className="space-y-4">
            
            {/* PLATFORM SECTION */}
            <AccordionItem value="platform" className="border-none">
                <AccordionTrigger className="hover:no-underline py-3 px-1 group">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center shadow-sm border border-indigo-100 group-hover:scale-105 transition-transform">
                            <Smartphone className="w-5 h-5 text-indigo-600" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col items-start gap-0.5 text-left">
                            <span className="text-base font-bold text-slate-900 leading-none">Platform</span>
                            <span className="text-xs font-medium text-slate-500">Select app style</span>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 px-1 pb-4">
                    <div className="grid grid-cols-2 gap-3">
                        {platforms.map((p) => {
                        const isSelected = store.platform === p.id;
                        return (
                            <button
                            key={p.id}
                            onClick={() => !p.locked && store.setPlatform(p.id as any)}
                            className={cn(
                                "relative px-4 py-3.5 rounded-2xl flex items-center gap-3 transition-all border group text-left",
                                p.special && isSelected
                                    ? 'bg-green-600 border-green-600 text-white shadow-lg shadow-green-600/20' 
                                    : isSelected
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/20'
                                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm active:scale-[0.98]',
                                p.locked && "opacity-60 cursor-not-allowed bg-slate-50/50 hover:border-slate-200 hover:shadow-none hover:bg-slate-50/50"
                            )}
                            >
                            <span className={cn(
                                "flex items-center justify-center transition-transform", 
                                !p.locked && "group-hover:scale-110 group-hover:rotate-6",
                                p.locked && "grayscale opacity-50"
                            )}>{p.icon}</span>
                            <div className="flex flex-col">
                                <span className={cn(
                                    "text-sm font-bold leading-tight",
                                    isSelected ? "text-white text-shadow-sm" : "text-slate-700"
                                )}>{p.name}</span>
                                {p.locked && <span className="text-[10px] font-semibold text-slate-400">Locked</span>}
                            </div>
                            
                            {p.locked && <Lock className="w-3.5 h-3.5 text-slate-300 absolute right-3 top-1/2 -translate-y-1/2" />}
                            {isSelected && !p.locked && <CheckCircle2 className="w-4 h-4 text-white absolute right-3 top-1/2 -translate-y-1/2" strokeWidth={3} />}
                            </button>
                        )
                        })}
                    </div>
                </AccordionContent>
            </AccordionItem>
            
            <Separator />

            {/* TYPE SECTION */}
            <AccordionItem value="type" className="border-none">
                <AccordionTrigger className="hover:no-underline py-3 px-1 group">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center shadow-sm border border-blue-100 group-hover:scale-105 transition-transform">
                            <MessageSquare className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col items-start gap-0.5 text-left">
                            <span className="text-base font-bold text-slate-900 leading-none">Type</span>
                            <span className="text-xs font-medium text-slate-500">Message style</span>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 px-1 pb-4">
                    <div className="w-full bg-white border border-slate-200 px-5 py-4 rounded-2xl text-sm font-bold text-slate-900 flex justify-between items-center cursor-pointer hover:border-slate-300 hover:shadow-md transition-all group">
                        <span className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                        Direct Message
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </div>
                </AccordionContent>
            </AccordionItem>

            <Separator />

            {/* PEOPLE SECTION */}
            <AccordionItem value="people" className="border-none">
                <AccordionTrigger className="hover:no-underline py-3 px-1 group">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center shadow-sm border border-purple-100 group-hover:scale-105 transition-transform">
                            <Users className="w-5 h-5 text-purple-600" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col items-start gap-0.5 text-left">
                            <span className="text-base font-bold text-slate-900 leading-none">People</span>
                            <span className="text-xs font-medium text-slate-500">Edit profiles</span>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 px-4 pb-6">
                    <div className="flex flex-col gap-5">
                        {/* Profile Header */}
                        <div className="flex items-start gap-4">
                            <div className="shrink-0 relative group cursor-pointer">
                                <Avatar className="w-16 h-16 rounded-2xl border-2 border-slate-100 shadow-sm group-hover:border-indigo-100 transition-colors">
                                    <AvatarImage src={store.contact.avatar || undefined} className="object-cover" />
                                    <AvatarFallback className="bg-slate-50 rounded-2xl">
                                        <User className="w-8 h-8 text-slate-300" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                                   <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                                </div>
                            </div>
                            
                            <div className="flex-1 space-y-3 pt-0.5">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Name</label>
                                    <Input 
                                        type="text"
                                        value={store.contact.name}
                                        onChange={(e) => store.updateContact({ name: e.target.value })}
                                        className="h-9 bg-slate-50/50 border-slate-200 focus:bg-white transition-all font-bold text-slate-700 placeholder:font-normal"
                                        placeholder="Display Name"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Status & Avatar URL */}
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Status</label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <Input
                                        type="text"
                                        value={store.contact.status}
                                        onChange={(e) => store.updateContact({ status: e.target.value })}
                                        className="pl-9 h-10 bg-slate-50/50 border-slate-200 focus:bg-white transition-all font-medium text-slate-600"
                                        placeholder="e.g. Online, Busy..."
                                    />
                                </div>
                            </div>
                            
                             <div className="space-y-1.5 pt-2 border-t border-dashed border-slate-200">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Avatar Image</label>
                                    <span className="text-[10px] text-slate-300 font-medium">URL</span>
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                        <ImageIcon className="w-4 h-4" />
                                    </div>
                                    <Input
                                        type="text"
                                        value={store.contact.avatar || ''}
                                        onChange={(e) => store.updateContact({ avatar: e.target.value })}
                                        className="pl-9 h-10 bg-slate-50/50 border-slate-200 focus:bg-white transition-all text-xs font-mono text-slate-500"
                                        placeholder="https://example.com/image.png"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
            
            <Separator />

            {/* MESSAGES SECTION */}
            <AccordionItem value="messages" className="border-none">
                <AccordionTrigger className="hover:no-underline py-3 px-1 group">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center shadow-sm border border-green-100 group-hover:scale-105 transition-transform">
                            <MessageSquare className="w-5 h-5 text-green-600" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col items-start gap-0.5 text-left">
                            <span className="text-base font-bold text-slate-900 leading-none">Messages</span>
                            <span className="text-xs font-medium text-slate-500">Content & Bubbles</span>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 px-1 pb-4 space-y-5">
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
                            className="shrink-0 w-12 h-12 rounded-2xl bg-slate-900 hover:bg-slate-800"
                        >
                            <ArrowRight className="w-5 h-5" strokeWidth={3} />
                        </Button>
                    </div>

                    <div className="space-y-3">
                    {store.messages.length === 0 ? (
                        <div className="text-center py-10 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-sm text-slate-400 font-medium">No messages yet</p>
                        </div>
                    ) : (
                        store.messages.map((msg) => (
                        <div
                            key={msg.id}
                            className="group relative bg-white p-4 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all"
                        >
                            <div className="flex justify-between items-center mb-3">
                            <Badge variant={msg.sender === 'me' ? 'default' : 'secondary'} className="uppercase text-[10px] tracking-wider px-2 py-0.5 h-auto font-bold shadow-none border-transparent">
                                {msg.sender === 'me' ? 'You' : 'Them'}
                            </Badge>
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-slate-400 font-bold mr-2">{msg.time}</span>
                                <Button 
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 hover:bg-red-50" 
                                    onClick={() => store.deleteMessage(msg.id)}
                                >
                                <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                                <Button 
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-slate-700 hover:bg-slate-100" 
                                    onClick={() => store.updateMessage(msg.id, { sender: msg.sender === 'me' ? 'them' : 'me' })}
                                >
                                <ArrowLeftRight className="w-3.5 h-3.5" />
                                </Button>
                            </div>
                            </div>
                            <textarea
                            value={msg.text}
                            onChange={(e) => store.updateMessage(msg.id, { text: e.target.value })}
                            className="w-full text-[13px] text-slate-700 bg-transparent outline-none resize-none font-semibold leading-relaxed tracking-wide placeholder:text-slate-300"
                            rows={Math.max(1, Math.ceil(msg.text.length / 40))}
                            spellCheck={false}
                            />
                        </div>
                        ))
                    )}
                    </div>
                </AccordionContent>
            </AccordionItem>
            
            <Separator />

            {/* APPEARANCE SECTION */}
            <AccordionItem value="appearance" className="border-none">
                <AccordionTrigger className="hover:no-underline py-3 px-1 group">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center shadow-sm border border-orange-100 group-hover:scale-105 transition-transform">
                            <Palette className="w-5 h-5 text-orange-600" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col items-start gap-0.5 text-left">
                            <span className="text-base font-bold text-slate-900 leading-none">Appearance</span>
                            <span className="text-xs font-medium text-slate-500">Theme & customizations</span>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 px-1 pb-4">
                    <div className="p-8 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 text-center">
                        <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-sm text-slate-500 font-bold">More customization coming soon!</p>
                    </div>
                </AccordionContent>
            </AccordionItem>

            <Separator />

            {/* ABOUT SECTION */}
            <AccordionItem value="about" className="border-none">
                <AccordionTrigger className="hover:no-underline py-3 px-1 group">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-105 transition-transform">
                            <Info className="w-5 h-5 text-slate-600" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col items-start gap-0.5 text-left">
                            <span className="text-base font-bold text-slate-900 leading-none">About</span>
                            <span className="text-xs font-medium text-slate-500">Info & updates</span>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 px-1 pb-4">
                     <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <p className="text-xs font-medium text-slate-500 leading-relaxed">
                            MockSocial is a powerful tool designed to create high-fidelity social media and chat mockups. 
                            Built with React, Tailwind, and Love.
                        </p>
                     </div>
                </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
      </div>
      
      {/* Footer */}
      <div className="p-6 border-t border-slate-200 bg-slate-50/40 backdrop-blur-sm">
        <div className="flex justify-center items-center gap-4 text-xs font-bold text-slate-400">
          <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
          <span className="text-slate-300">·</span>
          <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
          <span className="text-slate-300">·</span>
          <a href="#" className="hover:text-slate-900 transition-colors">API</a>
        </div>
      </div>
    </div>
  );
};