"use client";

import React, { useState } from "react";
import { useChatStore, Platform, MockupType } from "@/store/useChatStore";
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
  ChevronRight,
  Linkedin,
  AtSign,
  Heart,
  MessageCircle,
  Repeat2,
  Sun,
  Moon,
  Upload,
  Wand2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableMessage } from "./SortableMessage";

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
import { Icons } from "@/components/shared/icons";
import { UserAuthButton } from "@/components/shared/user-auth-button";
import { ShareDialog } from "@/components/shared/share-dialog";

interface PlatformItem {
  id: Platform;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  locked: boolean;
  types: MockupType[];
}

const platforms: PlatformItem[] = [
  { id: 'whatsapp', name: 'WhatsApp', icon: <Icons.WhatsApp className="w-5 h-5 fill-current" />, color: 'text-green-600', bgColor: 'bg-green-50', locked: false, types: ['chat'] },
  { id: 'messenger', name: 'Messenger', icon: <Icons.Messenger className="w-5 h-5 fill-current" />, color: 'text-blue-500', bgColor: 'bg-blue-50', locked: false, types: ['chat'] },
  { id: 'telegram', name: 'Telegram', icon: <Icons.Telegram className="w-5 h-5 fill-current" />, color: 'text-sky-500', bgColor: 'bg-sky-50', locked: false, types: ['chat'] },
  { id: 'discord', name: 'Discord', icon: <Icons.Discord className="w-5 h-5 fill-current" />, color: 'text-indigo-600', bgColor: 'bg-indigo-50', locked: false, types: ['chat'] },
  { id: 'imessage', name: 'iMessage', icon: <Icons.Apple className="w-5 h-5 fill-current" />, color: 'text-slate-800', bgColor: 'bg-slate-100', locked: false, types: ['chat'] },
  { id: 'instagram', name: 'Instagram', icon: <Icons.Instagram className="w-5 h-5" />, color: 'text-pink-600', bgColor: 'bg-pink-50', locked: false, types: ['chat', 'post'] },
  { id: 'slack', name: 'Slack', icon: <Icons.Slack className="w-5 h-5 fill-current" />, color: 'text-purple-700', bgColor: 'bg-purple-50', locked: false, types: ['chat'] },
  { id: 'teams', name: 'Teams', icon: <Users className="w-5 h-5" />, color: 'text-blue-700', bgColor: 'bg-blue-50', locked: false, types: ['chat'] },
  { id: 'signal', name: 'Signal', icon: <Icons.Signal className="w-5 h-5 fill-current" />, color: 'text-blue-600', bgColor: 'bg-blue-50', locked: false, types: ['chat'] },
  { id: 'x', name: 'X / Twitter', icon: <Icons.Twitter className="w-5 h-5 fill-current" />, color: 'text-slate-900', bgColor: 'bg-slate-100', locked: false, types: ['chat', 'post'] },
  { id: 'snapchat', name: 'Snapchat', icon: <MessageSquare className="w-5 h-5" />, color: 'text-yellow-500', bgColor: 'bg-yellow-50', locked: false, types: ['chat'] },
  { id: 'tiktok', name: 'TikTok', icon: <Smartphone className="w-5 h-5" />, color: 'text-slate-900', bgColor: 'bg-slate-100', locked: false, types: ['chat'] }, // TikTok post? Maybe later
  { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, color: 'text-blue-700', bgColor: 'bg-blue-50', locked: false, types: ['post'] },
  { id: 'threads', name: 'Threads', icon: <AtSign className="w-5 h-5" />, color: 'text-slate-900', bgColor: 'bg-slate-100', locked: false, types: ['post'] },
];

export const Sidebar = () => {
  const store = useChatStore();
  const [newMessageText, setNewMessageText] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = store.messages.findIndex((msg) => msg.id === active.id);
      const newIndex = store.messages.findIndex((msg) => msg.id === over.id);
      store.reorderMessages(oldIndex, newIndex);
    }
  }

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

  const validPlatforms = platforms.filter(p => p.types.includes(store.mockupType));

  return (
    <div className="w-full lg:w-[440px] lg:max-w-[440px] max-h-[45vh] lg:max-h-none lg:h-screen bg-background/80 backdrop-blur-xl flex flex-col overflow-hidden font-sans border-b lg:border-b-0 lg:border-r border-border relative z-20 shrink-0">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 py-5 border-b border-border glass sticky top-0 z-50 bg-background/80 backdrop-blur-md"
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
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">v2.5</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => store.toggleDarkMode(!store.isDarkMode)}
              className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all"
            >
              {store.isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
            <Button
               variant="ghost"
               size="icon"
               onClick={() => store.generateRandomContent()}
               title="Smart Autofill (Populate random data)"
               className="h-9 w-9 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all group/wand"
            >
               <Wand2 className="w-4 h-4 group-hover/wand:animate-pulse" />
            </Button>
            <ShareDialog />
            <UserAuthButton />
            <Button className="h-9 px-4 rounded-xl font-bold text-xs gap-1.5 bg-foreground text-background shadow-medium hover:shadow-glow hover:-translate-y-0.5 transition-all duration-200">
              <Sparkles className="w-3.5 h-3.5" />
              Pro
            </Button>
          </div>
        </div>

        <Tabs value={store.mockupType} onValueChange={(v) => store.setMockupType(v as MockupType)} className="w-full">
          <TabsList className="w-full h-11 bg-secondary gap-1 rounded-xl p-1">
            <TabsTrigger 
              value="chat" 
              className="flex-1 rounded-lg gap-2 text-xs font-bold data-[state=active]:bg-background data-[state=active]:shadow-soft transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Chat Mockup
            </TabsTrigger>
            <TabsTrigger 
              value="post" 
              className="flex-1 rounded-lg gap-2 text-xs font-bold data-[state=active]:bg-background data-[state=active]:shadow-soft transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              Post Mockup
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
                  {validPlatforms.map((p, index) => {
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

            {/* POST CONFIGURATION SECTION */}
            {store.mockupType === 'post' && (
              <AccordionItem value="post_config" className="border border-border rounded-2xl overflow-hidden bg-card shadow-card">
                <AccordionTrigger className="hover:no-underline py-4 px-4 group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center transition-all duration-200 group-hover:scale-105">
                      <Share2 className="w-5 h-5 text-pink-500" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col items-start gap-0.5 text-left">
                      <span className="text-sm font-bold text-foreground leading-none">Post Content</span>
                      <span className="text-xs font-medium text-muted-foreground">Main content & metrics</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-0.5">Content</label>
                    <Textarea 
                      value={store.postConfig.text}
                      onChange={(e: { target: { value: any; }; }) => {
                        return store.updatePostConfig({ text: e.target.value });
                      }}
                      className="bg-secondary/50 border-border focus:bg-background min-h-[100px]" 
                      placeholder="Write your post caption..."
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                     <div className="space-y-1.5">
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3 text-muted-foreground" />
                          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Likes</label>
                        </div>
                        <Input 
                          value={store.postConfig.likes}
                          onChange={(e) => store.updatePostConfig({ likes: e.target.value })}
                          className="h-9 text-xs bg-secondary/50"
                        />
                     </div>
                     <div className="space-y-1.5">
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3 text-muted-foreground" />
                          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Comm</label>
                        </div>
                        <Input 
                          value={store.postConfig.comments}
                          onChange={(e) => store.updatePostConfig({ comments: e.target.value })}
                          className="h-9 text-xs bg-secondary/50"
                        />
                     </div>
                     <div className="space-y-1.5">
                        <div className="flex items-center gap-1">
                          <Repeat2 className="w-3 h-3 text-muted-foreground" />
                          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Share</label>
                        </div>
                        <Input 
                          value={store.postConfig.shares}
                          onChange={(e) => store.updatePostConfig({ shares: e.target.value })}
                          className="h-9 text-xs bg-secondary/50"
                        />
                     </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-0.5">Image URL</label>
                    <Input 
                      value={store.postConfig.image || ''}
                      onChange={(e) => store.updatePostConfig({ image: e.target.value })}
                      className="h-9 text-xs bg-secondary/50"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {/* PEOPLE / AUTHOR SECTION */}
            <AccordionItem value="people" className="border border-border rounded-2xl overflow-hidden bg-card shadow-card">
              <AccordionTrigger className="hover:no-underline py-4 px-4 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-section-purple/10 flex items-center justify-center transition-all duration-200 group-hover:scale-105">
                    <Users className="w-5 h-5 text-section-purple" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col items-start gap-0.5 text-left">
                    <span className="text-sm font-bold text-foreground leading-none">{store.mockupType === 'post' ? 'Author' : 'People'}</span>
                    <span className="text-xs font-medium text-muted-foreground">{store.mockupType === 'post' ? 'Edit author info' : 'Edit profiles'}</span>
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
                      {store.mockupType === 'chat' && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background rounded-full flex items-center justify-center shadow-soft border border-border">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-section-green opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-section-green border-2 border-background"></span>
                          </span>
                        </div>
                      )}
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
                    {store.mockupType === 'chat' && (
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
                    )}
                    
                    <div className="space-y-1.5 pt-3 border-t border-dashed border-border">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-0.5">Avatar URL</label>
                        <span className="text-[10px] text-muted-foreground font-medium">Optional</span>
                      </div>
                      <div className="relative group flex gap-2">
                        <div className="relative flex-1">
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
                        <input
                            type="file"
                            id="avatar-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                        store.updateContact({ avatar: ev.target?.result as string });
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 shrink-0 bg-secondary/50 border-border hover:bg-background hover:border-primary/50 transition-all"
                            onClick={() => document.getElementById('avatar-upload')?.click()}
                            title="Upload Image"
                        >
                            <Upload className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AccordionContent>
            </AccordionItem>

            {/* MESSAGES SECTION */}
            {store.mockupType === 'chat' && (
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
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                      >
                        <SortableContext
                          items={store.messages.map((m) => m.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          <AnimatePresence mode="popLayout">
                            {store.messages.map((msg) => (
                              <SortableMessage
                                key={msg.id}
                                message={msg}
                                updateMessage={store.updateMessage}
                                deleteMessage={store.deleteMessage}
                              />
                            ))}
                          </AnimatePresence>
                        </SortableContext>
                      </DndContext>
                    )}
                  </AnimatePresence>
                </div>
              </AccordionContent>
            </AccordionItem>
            )}

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
                  className="space-y-4"
                >
                  <div className="space-y-4 pt-1">
                      <div className="flex items-center justify-between">
                          <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-0.5">Status Bar</label>
                      </div>

                      <div className="space-y-3">
                          {/* Time */}
                          <div className="space-y-1.5">
                              <label className="text-[10px] font-medium text-muted-foreground ml-0.5">Time</label>
                              <Input
                                  type="text"
                                  value={store.statusBar.time}
                                  onChange={(e) => store.updateStatusBar({ time: e.target.value })}
                                  className="h-9 bg-secondary/50 border-border font-medium text-sm"
                              />
                          </div>

                          {/* Battery Level Slider */}
                          <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                  <label className="text-[10px] font-medium text-muted-foreground ml-0.5">Battery Level</label>
                                  <span className="text-[10px] font-bold text-foreground">{store.statusBar.batteryLevel}%</span>
                              </div>
                              <input 
                                  type="range" 
                                  min="0" 
                                  max="100" 
                                  value={store.statusBar.batteryLevel} 
                                  onChange={(e) => store.updateStatusBar({ batteryLevel: parseInt(e.target.value) })}
                                  className="w-full h-1.5 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                              />
                          </div>

                          {/* Signal Strength Slider */}
                          <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                  <label className="text-[10px] font-medium text-muted-foreground ml-0.5">Signal</label>
                                  <div className="flex gap-0.5">
                                      {[1, 2, 3, 4].map(bar => (
                                          <div key={bar} className={`w-1 h-2 rounded-[1px] ${bar <= store.statusBar.signalStrength ? 'bg-primary' : 'bg-secondary'}`} />
                                      ))}
                                  </div>
                              </div>
                              <input 
                                  type="range" 
                                  min="1" 
                                  max="4" 
                                  step="1"
                                  value={store.statusBar.signalStrength} 
                                  onChange={(e) => store.updateStatusBar({ signalStrength: parseInt(e.target.value) })}
                                  className="w-full h-1.5 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                              />
                          </div>
                      
                           {/* Toggles */}
                           <div className="flex items-center justify-between pt-1">
                                <label className="text-[11px] font-medium text-foreground ml-0.5">WiFi</label>
                                <Button 
                                    size="sm"
                                    variant={store.statusBar.wifi ? "default" : "outline"}
                                    onClick={() => store.updateStatusBar({ wifi: !store.statusBar.wifi })}
                                    className={`h-7 w-12 rounded-full transition-all ${store.statusBar.wifi ? 'bg-primary text-primary-foreground' : 'bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary'}`}
                                >
                                    {store.statusBar.wifi ? "On" : "Off"}
                                </Button>
                           </div>
                           
                           <div className="flex items-center justify-between">
                                <label className="text-[11px] font-medium text-foreground ml-0.5">Battery %</label>
                                <Button 
                                    size="sm"
                                    variant={store.statusBar.showBatteryPercentage ? "default" : "outline"}
                                    onClick={() => store.updateStatusBar({ showBatteryPercentage: !store.statusBar.showBatteryPercentage })}
                                    className={`h-7 w-12 rounded-full transition-all ${store.statusBar.showBatteryPercentage ? 'bg-primary text-primary-foreground' : 'bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary'}`}
                                >
                                    {store.statusBar.showBatteryPercentage ? "On" : "Off"}
                                </Button>
                           </div>
                   </div>

                   <Separator className="bg-border/50" />

                   {/* Dark Mode Config */}
                   <div className="space-y-3">
                       <div className="flex items-center justify-between">
                          <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-0.5">Theme</label>
                       </div>
                       
                       <div className="flex items-center justify-between">
                            <label className="text-[11px] font-medium text-foreground ml-0.5">Dark Mode</label>
                            <Button 
                                size="sm"
                                variant={store.isDarkMode ? "default" : "outline"}
                                onClick={() => store.toggleDarkMode(!store.isDarkMode)}
                                className={`h-7 w-12 rounded-full transition-all ${store.isDarkMode ? 'bg-primary text-primary-foreground' : 'bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary'}`}
                            >
                                {store.isDarkMode ? "On" : "Off"}
                            </Button>
                       </div>

                       <div className="flex items-center justify-between">
                            <label className="text-[11px] font-medium text-foreground ml-0.5">Watermark</label>
                            <Button 
                                size="sm"
                                variant={(store.showWatermark ?? true) ? "default" : "outline"}
                                onClick={() => store.toggleWatermark(!(store.showWatermark ?? true))}
                                className={`h-7 w-12 rounded-full transition-all ${(store.showWatermark ?? true) ? 'bg-primary text-primary-foreground' : 'bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary'}`}
                            >
                                {(store.showWatermark ?? true) ? "On" : "Off"}
                            </Button>
                       </div>

                       <div className="flex items-center justify-between">
                            <label className="text-[11px] font-medium text-foreground ml-0.5">Keyboard</label>
                            <Button 
                                size="sm"
                                variant={store.showKeyboard ? "default" : "outline"}
                                onClick={() => store.toggleKeyboard(!store.showKeyboard)}
                                className={`h-7 w-12 rounded-full transition-all ${store.showKeyboard ? 'bg-primary text-primary-foreground' : 'bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary'}`}
                            >
                                {store.showKeyboard ? "On" : "Off"}
                            </Button>
                       </div>

                       <div className="space-y-1.5 pt-1">
                          <label className="text-[11px] font-medium text-foreground ml-0.5">Wallpaper</label>
                          <div className="relative group">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                              <ImageIcon className="w-3.5 h-3.5" />
                            </div>
                            <Input
                              type="text"
                              value={store.wallpaper || ''}
                              onChange={(e) => store.setWallpaper(e.target.value)}
                              className="pl-9 h-8 bg-secondary/50 border-border focus:bg-background focus:border-primary/50 transition-all text-xs"
                              placeholder="Image URL"
                            />
                          </div>
                       </div>

                       </div>
                   </div>
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
