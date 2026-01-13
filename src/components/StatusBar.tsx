"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";

interface StatusBarProps {
    platform: string;
}

export const StatusBar = ({ platform }: StatusBarProps) => {
    const { statusBar, isDarkMode } = useChatStore();
    const { time, batteryLevel, showBatteryPercentage, signalStrength, wifi } = statusBar;

    // Determine text color based on platform
    // In Dark Mode, almost all headers are dark -> White Text
    // In Light Mode, most headers are White -> Black Text, EXCEPT WhatsApp (Green Header -> White Text)
    const isWhiteText = isDarkMode || platform === 'whatsapp';
    
    const textColor = isWhiteText ? 'text-white' : 'text-black';

    // Battery Color Logic
    let batteryColor = isWhiteText ? 'fill-white' : 'fill-black';
    if (batteryLevel <= 20) batteryColor = 'fill-red-500';
    else if (batteryLevel <= 10) batteryColor = 'fill-red-600';
    
    // If text is white, battery body outline is white, level is white (unless low)
    // If text is black, battery body outline is black
    
    return (
        <div className={`absolute top-0 left-0 right-0 h-[44px] z-50 flex items-center justify-between px-6 font-medium text-[15px] select-none ${textColor} transition-colors duration-300`}>
            {/* Time */}
            <span className="w-14 font-semibold tracking-wide text-center" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {time}
            </span>

            <div className="flex items-center gap-1.5">
                {/* Signal Strength */}
                <div className="flex items-end gap-[1px] h-3 w-4.5 mx-0.5">
                    {[1, 2, 3, 4].map((bar) => (
                        <div 
                            key={bar} 
                            className={`w-[3px] rounded-[1px] ${bar <= signalStrength ? 'bg-current' : 'bg-current opacity-30'}`}
                            style={{ height: `${bar * 25}%` }}
                        />
                    ))}
                </div>

                {/* WiFi */}
                {wifi && (
                     <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] mb-0.5">
                         <path d="M12 3c-4.14 0-7.96 1.36-11.02 3.66C.35 7.15.54 7.64 1.05 7.74c.24.05.47-.03.65-.18C4.55 5.51 8.11 4.25 12 4.25c3.89 0 7.45 1.26 10.3 3.31.18.15.41.23.65.18.51-.1.7-.59.07-1.08C19.96 4.36 16.14 3 12 3zm0 4.5c-3.06 0-5.91.95-8.25 2.57-.48.33-.53 1.01-.11 1.4.15.14.37.19.56.12 2.37-1.25 5.09-1.97 7.8-1.97 2.71 0 5.43.72 7.8 1.97.19.07.41.02.56-.12.42-.39.37-1.07-.11-1.4C17.91 8.45 15.06 7.5 12 7.5zm0 4.5c-1.94 0-3.79.56-5.36 1.53-.45.28-.53.9-.17 1.25.13.13.32.18.49.12 1.55-.86 3.32-1.35 5.04-1.35 1.72 0 3.49.49 5.04 1.35.17.06.36.01.49-.12.36-.35.28-.97-.17-1.25C15.79 12.56 13.94 12 12 12zm0 4.5c-.71 0-1.39.2-1.97.55-.42.25-.49.83-.15 1.15l1.64 1.53c.27.25.69.25.96 0l1.64-1.53c.34-.32.27-.9-.15-1.15-.58-.35-1.26-.55-1.97-.55z"/>
                     </svg>
                )}

                {/* Battery */}
                <div className="flex items-center gap-1">
                    {showBatteryPercentage && (
                        <span className="text-[12px] font-bold mr-0.5 tracking-tight">{batteryLevel}%</span>
                    )}
                    <div className={`relative w-[22px] h-[11px] border-[1px] border-current rounded-[3px] p-[1px] mr-[1px]`}>
                        <div 
                            className={`h-full rounded-[1px] ${batteryColor} max-w-full`}
                            style={{ 
                                width: `${Math.max(5, Math.min(100, batteryLevel))}%`,
                                backgroundColor: isWhiteText ? (batteryLevel <= 20 ? '#ef4444' : 'white') : (batteryLevel <= 20 ? '#ef4444' : 'black')
                            }}
                        />
                        {/* Battery Tip */}
                        <div className="absolute top-1/2 -right-[3.5px] -translate-y-1/2 w-[2px] h-[4px] bg-current rounded-r-[1px]" />
                    </div>
                </div>
            </div>
        </div>
    );
};
