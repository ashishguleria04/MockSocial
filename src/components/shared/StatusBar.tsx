import React from 'react';
import { Battery, Wifi, Signal } from 'lucide-react';
import { useChatStore } from '@/store/useChatStore';

interface StatusBarProps {
    variant?: 'light' | 'dark';
}

export const StatusBar: React.FC<StatusBarProps> = ({ variant = 'dark' }) => {
    const { statusBar, isDarkMode } = useChatStore();
    
    // If variant is not explicitly passed, we could try to derive it from isDarkMode, 
    // but skins usually know their header color better. 
    // Defaulting to 'dark' means black text (for light backgrounds).
    const textColor = variant === 'light' ? 'text-white' : 'text-black';

    return (
        <div className={`w-full h-[44px] px-6 flex items-center justify-between z-50 select-none ${textColor}`}>
            {/* Time */}
            <div className="text-[15px] font-semibold tracking-wide w-[80px]">
                {statusBar.time}
            </div>

            {/* Dynamic Island (Placeholder for iPhone 14/15 Pro look) or Notch area - keeping it simple for now */}

            {/* Right Side Icons */}
            <div className="flex items-center gap-1.5 min-w-[80px] justify-end">
                {/* Signal */}
                <div className="flex items-end gap-[1px] h-3 mr-1">
                    {[1, 2, 3, 4].map((bar) => (
                        <div 
                            key={bar} 
                            className={`w-[3px] rounded-[1px] ${bar <= statusBar.signalStrength ? (variant === 'light' ? 'bg-white' : 'bg-black') : (variant === 'light' ? 'bg-white/30' : 'bg-black/20')}`}
                            style={{ height: `${bar * 3}px` }} 
                        />
                    ))}
                </div>

                {/* WiFi */}
                {statusBar.wifi && (
                    <Wifi className="w-5 h-5" strokeWidth={2.5} />
                )}

                {/* Battery */}
                <div className="flex items-center gap-1 ml-0.5">
                    {statusBar.showBatteryPercentage && (
                        <span className="text-[12px] font-bold tracking-tight">
                            {statusBar.batteryLevel}%
                        </span>
                    )}
                    <div className="relative">
                        <div className={`w-[22px] h-[11px] rounded-[3px] border-[1.5px] p-[1.5px] flex items-center ${variant === 'light' ? 'border-white/40' : 'border-black/40'}`}>
                            <div 
                                className={`h-full rounded-[1px] ${variant === 'light' ? 'bg-white' : 'bg-black'}`} 
                                style={{ width: `${statusBar.batteryLevel}%` }}
                            />
                        </div>
                        {/* Battery Tip */}
                        <div className={`absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-[3px] rounded-r-[1px] ${variant === 'light' ? 'bg-white/40' : 'bg-black/40'}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};
