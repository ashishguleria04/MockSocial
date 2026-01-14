import React from "react";
import { cn } from "@/lib/utils";

interface WatermarkOverlayProps {
  className?: string;
  count?: number; // Number of times to repeat the watermark (grid size approx)
  opacity?: number;
}

export const WatermarkOverlay: React.FC<WatermarkOverlayProps> = ({ 
  className,
  count = 12,
  opacity = 15 // Increased default opacity for visibility
}) => {
  return (
    <div className={cn(
      "absolute inset-0 pointer-events-none z-[50] overflow-hidden flex flex-wrap content-center justify-center gap-12 p-8 select-none",
      className
    )}>
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className="transform -rotate-45 text-slate-500/20 font-black text-xl whitespace-nowrap mix-blend-difference"
          style={{ opacity: opacity / 100 }}
        >
          MockSocial
        </div>
      ))}
    </div>
  );
};
