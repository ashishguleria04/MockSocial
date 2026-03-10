
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, ArrowLeftRight, GripVertical, SmilePlus, Reply } from "lucide-react";
import { cn } from "@/lib/utils";
import { Message } from "@/store/useChatStore";

interface SortableMessageProps {
  message: Message;
  messages: Message[];
  updateMessage: (id: string, updates: Partial<Message>) => void;
  deleteMessage: (id: string) => void;
}

export function SortableMessage({ message, messages, updateMessage, deleteMessage }: SortableMessageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: message.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative bg-secondary/30 p-4 rounded-xl border border-border hover:border-primary/20 hover:bg-secondary/50 transition-all mb-2",
        isDragging && "border-primary/50 bg-secondary/80 ring-2 ring-primary/20"
      )}
    >
      <div className="flex justify-between items-center mb-2.5">
        <div className="flex items-center gap-2">
           <button 
             {...attributes} 
             {...listeners}
             className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
           >
             <GripVertical className="w-3.5 h-3.5" />
           </button>
           <Badge 
              variant={message.sender === 'me' ? 'default' : 'secondary'} 
              className={cn(
                "uppercase text-[10px] tracking-wider px-2 py-0.5 h-auto font-bold shadow-none border-0",
                message.sender === 'me' 
                  ? 'bg-primary/10 text-primary hover:bg-primary/10' 
                  : 'bg-secondary text-muted-foreground hover:bg-secondary'
              )}
            >
              {message.sender === 'me' ? 'You' : 'Them'}
            </Badge>
        </div>
        
        <div className="flex items-center gap-1">
          <span className="text-[11px] text-muted-foreground font-semibold mr-1">{message.time}</span>
          <Button 
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all" 
            onClick={() => deleteMessage(message.id)}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
          <Button 
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all" 
            onClick={() => updateMessage(message.id, { sender: message.sender === 'me' ? 'them' : 'me' })}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
      <textarea
        value={message.text}
        onChange={(e) => updateMessage(message.id, { text: e.target.value })}
        className="w-full text-sm text-foreground bg-transparent outline-none resize-none font-medium leading-relaxed placeholder:text-muted-foreground focus:ring-0"
        rows={Math.max(1, Math.ceil(message.text.length / 45))}
        spellCheck={false}
      />
      
      {/* Advanced Capabilities (Replies & Reactions) */}
      <div className="mt-3 flex flex-col gap-2 pt-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Reply className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <select
                value={message.replyToId || ""}
                onChange={(e) => updateMessage(message.id, { replyToId: e.target.value || undefined })}
                className="flex-1 bg-background/50 border border-border text-xs rounded-md px-2 py-1 text-muted-foreground focus:outline-none focus:border-primary/50"
            >
                <option value="">No Reply</option>
                {/* Dynamically list all messages — uses live prop so updates instantly */}
                {messages.map(m => (
                    m.id !== message.id && (
                        <option key={m.id} value={m.id}>
                            {m.sender === 'me' ? 'You' : 'Them'}: {m.text.substring(0, 20)}...
                        </option>
                    )
                ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <SmilePlus className="w-3.5 h-3.5 text-muted-foreground shrink-0 mr-1" />
            {message.reactions?.map((reaction, i) => (
                <div key={i} className="flex items-center bg-background/50 border border-border rounded-full pl-2 pr-1 py-0.5 text-[10px] gap-1">
                    <span>{reaction.emoji}</span>
                    <input 
                        type="number" 
                        value={reaction.count}
                        onChange={(e) => {
                            const newReactions = [...(message.reactions || [])];
                            newReactions[i].count = parseInt(e.target.value) || 1;
                            updateMessage(message.id, { reactions: newReactions });
                        }}
                        className="w-6 bg-transparent text-center outline-none"
                        min="1"
                    />
                    <button 
                        onClick={() => {
                            const newReactions = message.reactions!.filter((_, idx) => idx !== i);
                            updateMessage(message.id, { reactions: newReactions.length > 0 ? newReactions : undefined });
                        }}
                        className="text-muted-foreground hover:text-destructive shrink-0 ml-0.5"
                    >
                        ×
                    </button>
                </div>
            ))}
            
            <button 
                onClick={() => {
                    // Simple prompt for now, could be replaced with emoji-picker-react later
                    const emoji = prompt("Enter an emoji (e.g. ❤️, 😂, 👍):", "❤️");
                    if (emoji) {
                        const newReactions = [...(message.reactions || []), { emoji, count: 1 }];
                        updateMessage(message.id, { reactions: newReactions });
                    }
                }}
                className="px-2 py-0.5 text-[10px] bg-secondary/80 hover:bg-secondary text-muted-foreground rounded-full border border-dashed border-border transition-colors uppercase tracking-wider font-bold"
            >
                + Add
            </button>
          </div>
      </div>
    </div>
  );
}
