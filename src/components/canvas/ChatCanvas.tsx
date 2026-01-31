"use client";

import React from "react";
import { useChatStore } from "@/store/useChatStore";
import { SignalSkin } from "../skins/SignalSkin";
import { IMessageSkin } from "../skins/IMessageSkin";
import { WhatsAppSkin } from "../skins/WhatsAppSkin";
import { MessengerSkin } from "../skins/MessengerSkin";
import { TelegramSkin } from "../skins/TelegramSkin";
import { DiscordSkin } from "../skins/DiscordSkin";
import { InstagramSkin } from "../skins/InstagramSkin";
import { SlackSkin } from "../skins/SlackSkin";
import { TeamsSkin } from "../skins/TeamsSkin";
import { XSkin } from "../skins/XSkin";
import { SnapchatSkin } from "../skins/SnapchatSkin";
import { TikTokSkin } from "../skins/TikTokSkin";
import { InstagramPostSkin } from "../skins/InstagramPostSkin";
import { XPostSkin } from "../skins/XPostSkin";
import { LinkedInPostSkin } from "../skins/LinkedInPostSkin";
import { ThreadsPostSkin } from "../skins/ThreadsPostSkin";
import { StatusBar } from "./StatusBar";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import { WatermarkOverlay } from "./watermark-overlay";
import { KeyboardOverlay } from "./KeyboardOverlay";

export const ChatCanvas = () => {
    const { platform, isDarkMode, mockupType, wallpaper, showKeyboard } = useChatStore();

    const renderSkin = () => {
        // If mockup type is 'post', use post skins
        if (mockupType === 'post') {
            switch (platform) {
                case "instagram":
                    return <InstagramPostSkin />;
                case "x":
                    return <XPostSkin />;
                case "linkedin":
                    return <LinkedInPostSkin />;
                case "threads":
                    return <ThreadsPostSkin />;
                default:
                    // Fallback for platforms that don't support posts yet
                    return (
                        <div className="flex flex-col items-center justify-center h-full bg-gray-50 text-gray-400 p-8 text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Post Skin</h3>
                            <p className="text-sm">Post mockup for {platform} is not available.</p>
                        </div>
                    );
            }
        }

        // Default to chat skins
        switch (platform) {
            case "signal":
                return <SignalSkin />;
            case "imessage":
                return <IMessageSkin />;
            case "whatsapp":
                return <WhatsAppSkin />;
            case "messenger":
                return <MessengerSkin />;
            case "telegram":
                return <TelegramSkin />;
            case "discord":
                return <DiscordSkin />;
            case "instagram":
                return <InstagramSkin />;
            case "slack":
                return <SlackSkin />;
            case "teams":
                return <TeamsSkin />;
            case "x":
                return <XSkin />;
            case "snapchat":
                return <SnapchatSkin />;
            case "tiktok":
                return <TikTokSkin />;
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-full bg-gray-50 text-gray-400 p-8 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <span className="text-2xl">🚧</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
                        <p className="text-sm">The {platform} skin is currently under development.</p>
                    </div>
                );
        }
    };

    const downloadScreenshot = async () => {
        const node = document.getElementById("chat-canvas");
        if (!node) return;

        try {
            const dataUrl = await toPng(node, {
                pixelRatio: 2,
                cacheBust: true,
            });
            const link = document.createElement("a");
            link.download = `mockup_${mockupType}_${platform}_${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error("Failed to generate screenshot", err);
        }
    };

    return (

        <div className="flex items-center justify-center py-8 pb-32 lg:p-8 min-h-0 lg:min-h-screen relative w-full">
            <div id="chat-canvas" className="relative group transition-all duration-500 ease-in-out transform scale-[0.85] sm:scale-90 md:scale-100 hover:md:scale-[1.01] origin-center z-50">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/40 via-purple-500/40 to-secondary/40 rounded-[3.5rem] blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse pointer-events-none" />
                {/* Phone Frame */}
                <div className="relative w-[340px] h-[700px] bg-[#121212] rounded-[3rem] shadow-[0_0_0_9px_#333333,0_0_0_10px_#000000,0_20px_50px_rgba(0,0,0,0.5)] border-[6px] border-[#222222] overflow-hidden">

                    {/* Side Buttons */}
                    <div className="absolute top-24 -left-[14px] w-[8px] h-8 bg-[#222222] rounded-l-lg shadow-sm" /> {/* Mute */}
                    <div className="absolute top-36 -left-[14px] w-[8px] h-12 bg-[#222222] rounded-l-lg shadow-sm" /> {/* Vol Up */}
                    <div className="absolute top-52 -left-[14px] w-[8px] h-12 bg-[#222222] rounded-l-lg shadow-sm" /> {/* Vol Down */}
                    <div className="absolute top-44 -right-[14px] w-[8px] h-20 bg-[#222222] rounded-r-lg shadow-sm" /> {/* Power */}

                    {/* Inner Screen Container */}
                    <div className={`relative w-full h-full rounded-[2.5rem] overflow-hidden border-[6px] border-black ${isDarkMode ? 'bg-black' : 'bg-black'}`}>
                        <StatusBar platform={platform} />

                        {/* Screen Content */}
                        <div 
                            className="w-full h-full overflow-hidden rounded-[2.2rem] relative bg-cover bg-center bg-no-repeat"
                            style={wallpaper ? { backgroundImage: `url(${wallpaper})` } : {}}
                        >
                            {renderSkin()}
                            {useChatStore(s => s.showWatermark ?? true) && <WatermarkOverlay />}
                            {showKeyboard && <KeyboardOverlay />}
                        </div>

                        {/* Home Indicator line (iOS style) */}
                        <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-[110px] h-1.5 rounded-full z-50 pointer-events-none ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`} />
                    </div>
                </div>
            </div>

            {/* Floating Action Buttons */}
            <div className="fixed bottom-10 right-10 flex flex-col gap-4 z-50">
                <button
                    onClick={downloadScreenshot}
                    className="group relative flex items-center justify-center w-16 h-16 bg-slate-900 rounded-2xl shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 active:scale-95"
                    title="Download Mockup"
                >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Download className="w-7 h-7 text-white relative z-10" strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
};
