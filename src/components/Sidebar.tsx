"use client";

import React, { useState } from "react";
import { useChatStore, Platform } from "@/store/useChatStore";
import { motion, AnimatePresence } from "framer-motion";
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
  Image as ImageIcon,
  Send,
  ChevronRight
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

interface PlatformItem {
  id: Platform;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  locked: boolean;
}

const platforms: PlatformItem[] = [
  { id: 'whatsapp', name: 'WhatsApp', icon: <Icons.WhatsApp className="w-5 h-5 fill-current" />, color: 'text-green-600', bgColor: 'bg-green-50', locked: false },
  { id: 'messenger', name: 'Messenger', icon: <Icons.Messenger className="w-5 h-5 fill-current" />, color: 'text-blue-500', bgColor: 'bg-blue-50', locked: false },
  { id: 'telegram', name: 'Telegram', icon: <Icons.Telegram className="w-5 h-5 fill-current" />, color: 'text-sky-500', bgColor: 'bg-sky-50', locked: false },
  { id: 'discord', name: 'Discord', icon: <Icons.Discord className="w-5 h-5 fill-current" />, color: 'text-indigo-600', bgColor: 'bg-indigo-50', locked: false },
  { id: 'imessage', name: 'iMessage', icon: <Icons.Apple className="w-5 h-5 fill-current" />, color: 'text-slate-800', bgColor: 'bg-slate-100', locked: true },
  { id: 'instagram', name: 'Instagram', icon: <Icons.Instagram className="w-5 h-5" />, color: 'text-pink-600', bgColor: 'bg-pink-50', locked: false },
  { id: 'slack', name: 'Slack', icon: <Icons.Slack className="w-5 h-5 fill-current" />, color: 'text-purple-700', bgColor: 'bg-purple-50', locked: false },
  { id: 'teams', name: 'Teams', icon: <Users className="w-5 h-5" />, color: 'text-blue-700', bgColor: 'bg-blue-50', locked: false },
  { id: 'signal', name: 'Signal', icon: <Icons.Signal className="w-5 h-5 fill-current" />, color: 'text-blue-600', bgColor: 'bg-blue-50', locked: false },
  { id: 'x', name: 'X', icon: <Icons.Twitter className="w-5 h-5 fill-current" />, color: 'text-slate-900', bgColor: 'bg-slate-100', locked: false },
  { id: 'snapchat', name: 'Snapchat', icon: <MessageSquare className="w-5 h-5" />, color: 'text-yellow-500', bgColor: 'bg-yellow-50', locked: false },
  { id: 'tiktok', name: 'TikTok', icon: <Smartphone className="w-5 h-5" />, color: 'text-slate-900', bgColor: 'bg-slate-100', locked: false },
];

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

  const sectionVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  } as const;

  return (
    <div className="w-full max-w-[440px] h-screen bg-background/60 backdrop-blur-2xl flex flex-col overflow-hidden font-sans border-r border-white/10 relative z-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 py-5 border-b border-border glass sticky top-0 z-20"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 group cursor-pointer">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow"
            >
              <span className="text-xl font-black text-primary-foreground tracking-tighter">M</span>
            </motion.div>
            <div>
              <h1 className="text-xl font-extrabold text-foreground tracking-tight leading-none group-hover:text-gradient transition-all">
                MockSocial
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">v2.4 Beta</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-primary/10 text-primary">
                  NEW
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-secondary">
              <LogIn className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Button className="h-9 px-4 rounded-xl font-bold text-xs gap-1.5 bg-foreground text-background shadow-medium hover:shadow-glow hover:-translate-y-0.5 transition-all duration-200">
              <Sparkles className="w-3.5 h-3.5" />
              Pro
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full h-11 bg-secondary gap-1 rounded-xl p-1">
            <TabsTrigger 
              value="chat" 
              className="flex-1 rounded-lg gap-2 text-xs font-bold data-[state=active]:bg-background data-[state=active]:shadow-soft transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Chat
            </TabsTrigger>
            <TabsTrigger 
              value="ai" 
              className="flex-1 rounded-lg gap-2 text-xs font-bold data-[state=active]:bg-background data-[state=active]:shadow-soft transition-all"
            >
              <Bot className="w-3.5 h-3.5" />
              AI Chat
            </TabsTrigger>
            <TabsTrigger 
              value="social" 
              className="flex-1 rounded-lg gap-2 text-xs font-bold data-[state=active]:bg-background data-[state=active]:shadow-soft transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              Social
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-5 pb-24 space-y-2">
          
          <Accordion type="single" collapsible defaultValue="platform" className="space-y-2">
            
            {/* PLATFORM SECTION */}
            <AccordionItem value="platform" className="border border-border rounded-2xl overflow-hidden bg-card shadow-card">
              <AccordionTrigger className="hover:no-underline py-4 px-4 group [&[data-state=open]>div>div:first-child]:bg-primary [&[data-state=open]>div>div:first-child>svg]:text-primary-foreground">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-section-indigo/10 flex items-center justify-center transition-all duration-200 group-hover:scale-105">
                    <Smartphone className="w-5 h-5 text-section-indigo" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col items-start gap-0.5 text-left">
                    <span className="text-sm font-bold text-foreground leading-none">Platform</span>
                    <span className="text-xs font-medium text-muted-foreground">Select app style</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <motion.div 
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 gap-2.5"
                >
                  {platforms.map((p, index) => {
                    const isSelected = store.platform === p.id;
                    return (
                      <motion.button
                        key={p.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        whileHover={!p.locked ? { scale: 1.02 } : {}}
                        whileTap={!p.locked ? { scale: 0.98 } : {}}
                        onClick={() => !p.locked && store.setPlatform(p.id)}
                        className={cn(
                          "relative px-3.5 py-3 rounded-xl flex items-center gap-3 transition-all border group text-left",
                          isSelected
                            ? 'bg-foreground border-foreground text-background shadow-medium'
                            : 'bg-card border-border hover:border-primary/30 hover:bg-secondary/50',
                          p.locked && "opacity-50 cursor-not-allowed hover:border-border hover:bg-card"
                        )}
                      >
                        <span className={cn(
                          "flex items-center justify-center transition-all duration-200", 
                          !p.locked && !isSelected && p.color,
                          isSelected && "text-background",
                          p.locked && "grayscale"
                        )}>
                          {p.icon}
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className={cn(
                            "text-sm font-semibold leading-tight truncate",
                            isSelected ? "text-background" : "text-foreground"
                          )}>
                            {p.name}
                          </span>
                          {p.locked && (
                            <span className="text-[10px] font-medium text-muted-foreground">Pro only</span>
                          )}
                        </div>
                        
                        {p.locked && (
                          <Lock className="w-3 h-3 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2" />
                        )}
                        {isSelected && !p.locked && (
                          <CheckCircle2 className="w-4 h-4 text-background absolute right-3 top-1/2 -translate-y-1/2" strokeWidth={2.5} />
                        )}
                      </motion.button>
                    );
                  })}
                </motion.div>
              </AccordionContent>
            </AccordionItem>

            {/* TYPE SECTION */}
            <AccordionItem value="type" className="border border-border rounded-2xl overflow-hidden bg-card shadow-card">
              <AccordionTrigger className="hover:no-underline py-4 px-4 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-section-blue/10 flex items-center justify-center transition-all duration-200 group-hover:scale-105">
                    <MessageSquare className="w-5 h-5 text-section-blue" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col items-start gap-0.5 text-left">
                    <span className="text-sm font-bold text-foreground leading-none">Type</span>
                    <span className="text-xs font-medium text-muted-foreground">Message style</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <button className="w-full bg-secondary/50 border border-border px-4 py-3.5 rounded-xl text-sm font-semibold text-foreground flex justify-between items-center cursor-pointer hover:border-primary/30 hover:bg-secondary transition-all group">
                    <span className="flex items-center gap-3">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-section-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-section-green"></span>
                      </span>
                      Direct Message
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                  </button>
                </motion.div>
              </AccordionContent>
            </AccordionItem>

            {/* PEOPLE SECTION */}
            <AccordionItem value="people" className="border border-border rounded-2xl overflow-hidden bg-card shadow-card">
              <AccordionTrigger className="hover:no-underline py-4 px-4 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-section-purple/10 flex items-center justify-center transition-all duration-200 group-hover:scale-105">
                    <Users className="w-5 h-5 text-section-purple" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col items-start gap-0.5 text-left">
                    <span className="text-sm font-bold text-foreground leading-none">People</span>
                    <span className="text-xs font-medium text-muted-foreground">Edit profiles</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-5">
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-5"
                >
                  {/* Profile Header */}
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 relative group cursor-pointer">
                      <Avatar className="w-16 h-16 rounded-2xl border-2 border-border shadow-soft group-hover:border-primary/30 transition-all">
                        <AvatarImage src={store.contact.avatar || undefined} className="object-cover" />
                        <AvatarFallback className="bg-secondary rounded-2xl">
                          <User className="w-7 h-7 text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background rounded-full flex items-center justify-center shadow-soft border border-border">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-section-green opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-section-green border-2 border-background"></span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3 pt-0.5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-0.5">Name</label>
                        <Input 
                          type="text"
                          value={store.contact.name}
                          onChange={(e) => store.updateContact({ name: e.target.value })}
                          className="h-10 bg-secondary/50 border-border focus:bg-background focus:border-primary/50 transition-all font-semibold text-foreground placeholder:text-muted-foreground"
                          placeholder="Display Name"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status & Avatar URL */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-0.5">Status</label>
                      <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                          <Clock className="w-4 h-4" />
                        </div>
                        <Input
                          type="text"
                          value={store.contact.status}
                          onChange={(e) => store.updateContact({ status: e.target.value })}
                          className="pl-10 h-10 bg-secondary/50 border-border focus:bg-background focus:border-primary/50 transition-all font-medium text-foreground"
                          placeholder="e.g. Online, Busy..."
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5 pt-3 border-t border-dashed border-border">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-0.5">Avatar URL</label>
                        <span className="text-[10px] text-muted-foreground font-medium">Optional</span>
                      </div>
                      <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                        <Input
                          type="text"
                          value={store.contact.avatar || ''}
                          onChange={(e) => store.updateContact({ avatar: e.target.value })}
                          className="pl-10 h-10 bg-secondary/50 border-border focus:bg-background focus:border-primary/50 transition-all text-xs font-mono text-muted-foreground"
                          placeholder="https://example.com/image.png"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AccordionContent>
            </AccordionItem>

            {/* MESSAGES SECTION */}
            <AccordionItem value="messages" className="border border-border rounded-2xl overflow-hidden bg-card shadow-card">
              <AccordionTrigger className="hover:no-underline py-4 px-4 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-section-green/10 flex items-center justify-center transition-all duration-200 group-hover:scale-105">
                    <MessageSquare className="w-5 h-5 text-section-green" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col items-start gap-0.5 text-left">
                    <span className="text-sm font-bold text-foreground leading-none">Messages</span>
                    <span className="text-xs font-medium text-muted-foreground">{store.messages.length} message{store.messages.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 space-y-4">
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Type a new message..."
                      value={newMessageText}
                      onChange={(e) => setNewMessageText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddMessage()}
                      className="flex-1 h-11 bg-secondary/50 border-border focus:bg-background focus:border-primary/50"
                    />
                    <Button
                      onClick={handleAddMessage}
                      size="icon"
                      className="shrink-0 w-11 h-11 rounded-xl bg-foreground hover:bg-foreground/90 text-background shadow-medium hover:shadow-glow transition-all"
                    >
                      <Send className="w-4 h-4" strokeWidth={2.5} />
                    </Button>
                  </div>
                </motion.div>

                <div className="space-y-2.5">
                  <AnimatePresence mode="popLayout">
                    {store.messages.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-10 bg-secondary/30 rounded-xl border border-dashed border-border"
                      >
                        <MessageSquare className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground font-medium">No messages yet</p>
                        <p className="text-xs text-muted-foreground/70 mt-1">Add your first message above</p>
                      </motion.div>
                    ) : (
                      store.messages.map((msg, index) => (
                        <motion.div
                          key={msg.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: -10 }}
                          transition={{ delay: index * 0.05 }}
                          className="group relative bg-secondary/30 p-4 rounded-xl border border-border hover:border-primary/20 hover:bg-secondary/50 transition-all"
                        >
                          <div className="flex justify-between items-center mb-2.5">
                            <Badge 
                              variant={msg.sender === 'me' ? 'default' : 'secondary'} 
                              className={cn(
                                "uppercase text-[10px] tracking-wider px-2 py-0.5 h-auto font-bold shadow-none border-0",
                                msg.sender === 'me' 
                                  ? 'bg-primary/10 text-primary hover:bg-primary/10' 
                                  : 'bg-secondary text-muted-foreground hover:bg-secondary'
                              )}
                            >
                              {msg.sender === 'me' ? 'You' : 'Them'}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <span className="text-[11px] text-muted-foreground font-semibold mr-1">{msg.time}</span>
                              <Button 
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all" 
                                onClick={() => store.deleteMessage(msg.id)}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                              <Button 
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all" 
                                onClick={() => store.updateMessage(msg.id, { sender: msg.sender === 'me' ? 'them' : 'me' })}
                              >
                                <ArrowLeftRight className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </div>
                          <textarea
                            value={msg.text}
                            onChange={(e) => store.updateMessage(msg.id, { text: e.target.value })}
                            className="w-full text-sm text-foreground bg-transparent outline-none resize-none font-medium leading-relaxed placeholder:text-muted-foreground focus:ring-0"
                            rows={Math.max(1, Math.ceil(msg.text.length / 45))}
                            spellCheck={false}
                          />
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* APPEARANCE SECTION */}
            <AccordionItem value="appearance" className="border border-border rounded-2xl overflow-hidden bg-card shadow-card">
              <AccordionTrigger className="hover:no-underline py-4 px-4 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-section-orange/10 flex items-center justify-center transition-all duration-200 group-hover:scale-105">
                    <Palette className="w-5 h-5 text-section-orange" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col items-start gap-0.5 text-left">
                    <span className="text-sm font-bold text-foreground leading-none">Appearance</span>
                    <span className="text-xs font-medium text-muted-foreground">Theme & style</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  className="p-6 bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-xl border border-dashed border-border text-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-background shadow-soft mx-auto mb-3 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm text-foreground font-bold">More customization coming soon!</p>
                  <p className="text-xs text-muted-foreground mt-1">Themes, colors, and fonts</p>
                </motion.div>
              </AccordionContent>
            </AccordionItem>

            {/* ABOUT SECTION */}
            <AccordionItem value="about" className="border border-border rounded-2xl overflow-hidden bg-card shadow-card">
              <AccordionTrigger className="hover:no-underline py-4 px-4 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center transition-all duration-200 group-hover:scale-105">
                    <Info className="w-5 h-5 text-muted-foreground" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col items-start gap-0.5 text-left">
                    <span className="text-sm font-bold text-foreground leading-none">About</span>
                    <span className="text-xs font-medium text-muted-foreground">Info & credits</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  className="p-4 bg-secondary/30 rounded-xl border border-border"
                >
                  <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                    MockSocial is a powerful tool designed to create high-fidelity social media and chat mockups. 
                    Built with React, Tailwind, Framer Motion, and ❤️
                  </p>
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      
      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-5 border-t border-border bg-card/50 backdrop-blur-sm"
      >
        <div className="flex justify-center items-center gap-4 text-xs font-semibold text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <span className="text-border">·</span>
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <span className="text-border">·</span>
          <a href="#" className="hover:text-foreground transition-colors">API</a>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
