
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, ArrowLeftRight, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Message } from "@/store/useChatStore";

interface SortableMessageProps {
  message: Message;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  deleteMessage: (id: string) => void;
}

export function SortableMessage({ message, updateMessage, deleteMessage }: SortableMessageProps) {
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
    </div>
  );
}
