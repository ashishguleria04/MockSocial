import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { Delete, Globe, ArrowUp } from "lucide-react";

export const KeyboardOverlay = () => {
    const { isDarkMode } = useChatStore();

    const bgColor = isDarkMode ? "bg-[#1c1c1e]" : "bg-[#d1d5db]";
    const keyColor = isDarkMode ? "bg-[#4a4a4c] active:bg-[#3a3a3c]" : "bg-white active:bg-gray-100";
    const specialKeyColor = isDarkMode ? "bg-[#2c2c2e] active:bg-[#3a3a3c]" : "bg-[#b3b4b9] active:bg-white";
    const textColor = isDarkMode ? "text-white" : "text-black";

    const keys = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Z", "X", "C", "V", "B", "N", "M"]
    ];

    return (
        <div className={`absolute bottom-0 left-0 right-0 z-40 ${bgColor} pb-8 pt-2 px-1 transition-colors duration-300`}>
            {/* Suggestions Bar */}
            <div className={`flex items-center justify-around py-2 mb-1 ${textColor} opacity-80 text-sm`}>
                <span>I</span>
                <span className="font-semibold mx-4">The</span>
                <span>And</span>
            </div>

            {/* Keys */}
            <div className="flex flex-col gap-3 px-1">
                {/* Row 1 */}
                <div className="flex justify-center gap-[6px]">
                    {keys[0].map((key) => (
                        <div key={key} className={`w-[8.8%] h-[42px] ${keyColor} rounded-[5px] flex items-center justify-center shadow-[0_1px_0_rgba(0,0,0,0.35)] text-xl font-medium ${textColor}`}>
                            {key}
                        </div>
                    ))}
                </div>

                {/* Row 2 */}
                <div className="flex justify-center gap-[6px]">
                    {keys[1].map((key) => (
                        <div key={key} className={`w-[8.8%] h-[42px] ${keyColor} rounded-[5px] flex items-center justify-center shadow-[0_1px_0_rgba(0,0,0,0.35)] text-xl font-medium ${textColor}`}>
                            {key}
                        </div>
                    ))}
                </div>

                {/* Row 3 */}
                <div className="flex justify-center gap-[6px] px-2">
                    <div className={`w-[13%] h-[42px] ${specialKeyColor} rounded-[5px] flex items-center justify-center shadow-[0_1px_0_rgba(0,0,0,0.35)]`}>
                        <ArrowUp className={`w-5 h-5 ${textColor}`} strokeWidth={2.5} />
                    </div>
                    {keys[2].map((key) => (
                        <div key={key} className={`w-[8.8%] h-[42px] ${keyColor} rounded-[5px] flex items-center justify-center shadow-[0_1px_0_rgba(0,0,0,0.35)] text-xl font-medium ${textColor}`}>
                            {key}
                        </div>
                    ))}
                    <div className={`w-[13%] h-[42px] ${specialKeyColor} rounded-[5px] flex items-center justify-center shadow-[0_1px_0_rgba(0,0,0,0.35)]`}>
                        <Delete className={`w-6 h-6 ${textColor}`} strokeWidth={1.5} />
                    </div>
                </div>

                {/* Row 4 */}
                <div className="flex items-center justify-between px-2 mt-1">
                     <div className={`w-[11%] h-[42px] ${specialKeyColor} rounded-[5px] flex items-center justify-center shadow-[0_1px_0_rgba(0,0,0,0.35)] text-md font-medium ${textColor}`}>
                        123
                    </div>
                    <div className={`w-[11%] h-[42px] ${specialKeyColor} rounded-[5px] flex items-center justify-center shadow-[0_1px_0_rgba(0,0,0,0.35)]`}>
                        <Globe className={`w-5 h-5 ${textColor}`} />
                    </div>
                    <div className={`flex-1 mx-2 h-[42px] ${keyColor} rounded-[5px] flex items-center justify-center shadow-[0_1px_0_rgba(0,0,0,0.35)]`}>
                        {/* Space */}
                    </div>
                    <div className={`w-[24%] h-[42px] ${specialKeyColor} rounded-[5px] flex items-center justify-center shadow-[0_1px_0_rgba(0,0,0,0.35)] text-md font-medium ${textColor}`}>
                        return
                    </div>
                </div>
            </div>
            
             {/* Home Indicator Spacer */}
             <div className="h-6"></div>
        </div>
    );
};
