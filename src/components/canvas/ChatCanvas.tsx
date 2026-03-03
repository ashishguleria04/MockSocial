"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useChatStore } from "@/store/useChatStore";

const SignalSkin = dynamic(() => import("../skins/SignalSkin").then(mod => mod.SignalSkin));
const IMessageSkin = dynamic(() => import("../skins/IMessageSkin").then(mod => mod.IMessageSkin));
const WhatsAppSkin = dynamic(() => import("../skins/WhatsAppSkin").then(mod => mod.WhatsAppSkin));
const MessengerSkin = dynamic(() => import("../skins/MessengerSkin").then(mod => mod.MessengerSkin));
const TelegramSkin = dynamic(() => import("../skins/TelegramSkin").then(mod => mod.TelegramSkin));
const DiscordSkin = dynamic(() => import("../skins/DiscordSkin").then(mod => mod.DiscordSkin));
const InstagramSkin = dynamic(() => import("../skins/InstagramSkin").then(mod => mod.InstagramSkin));
const SlackSkin = dynamic(() => import("../skins/SlackSkin").then(mod => mod.SlackSkin));
const TeamsSkin = dynamic(() => import("../skins/TeamsSkin").then(mod => mod.TeamsSkin));
const XSkin = dynamic(() => import("../skins/XSkin").then(mod => mod.XSkin));
const SnapchatSkin = dynamic(() => import("../skins/SnapchatSkin").then(mod => mod.SnapchatSkin));
const TikTokSkin = dynamic(() => import("../skins/TikTokSkin").then(mod => mod.TikTokSkin));
const InstagramPostSkin = dynamic(() => import("../skins/InstagramPostSkin").then(mod => mod.InstagramPostSkin));
const XPostSkin = dynamic(() => import("../skins/XPostSkin").then(mod => mod.XPostSkin));
const LinkedInPostSkin = dynamic(() => import("../skins/LinkedInPostSkin").then(mod => mod.LinkedInPostSkin));
const ThreadsPostSkin = dynamic(() => import("../skins/ThreadsPostSkin").then(mod => mod.ThreadsPostSkin));
import { StatusBar } from "./StatusBar";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import { WatermarkOverlay } from "./watermark-overlay";
import { KeyboardOverlay } from "./KeyboardOverlay";
import { useToast } from "@/components/shared/toast";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

export const ChatCanvas = () => {
    const { platform, isDarkMode, mockupType, wallpaper, showKeyboard, phoneStyle } = useChatStore();

    const getPhoneDimensions = () => {
        switch (phoneStyle) {
            case 'mini': return 'w-[310px] h-[640px]';
            case 'pro': return 'w-[375px] h-[780px]';
            case 'default':
            default:
                return 'w-[340px] h-[700px]';
        }
    };

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

    const [isGenerating, setIsGenerating] = React.useState(false);
    const { showToast } = useToast();

    const downloadScreenshot = async () => {
        if (isGenerating) return;
        setIsGenerating(true);
        showToast("Generating screenshot...", "info");

        // Small delay to ensure UI updates before freezing for capture
        await new Promise(resolve => setTimeout(resolve, 100));

        const node = document.getElementById("chat-canvas");
        if (!node) {
            setIsGenerating(false);
            showToast("Failed to generate screenshot", "error");
            return;
        }

        try {
            const dataUrl = await toPng(node, {
                pixelRatio: 2,
                cacheBust: true,
            });
            const link = document.createElement("a");
            link.download = `mockup_${mockupType}_${platform}_${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
            showToast("Screenshot downloaded successfully!", "success");
        } catch (err) {
            console.error("Failed to generate screenshot", err);
            showToast("Failed to generate screenshot", "error");
        } finally {
            setIsGenerating(false);
        }
    };

    return (

        <div className="flex items-center justify-center py-8 pb-32 lg:p-8 min-h-0 lg:min-h-screen relative w-full">
            <div id="chat-canvas" className="relative group transition-all duration-500 ease-in-out transform scale-[0.85] sm:scale-90 md:scale-100 hover:md:scale-[1.01] origin-center z-50">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/40 via-purple-500/40 to-secondary/40 rounded-[3.5rem] blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse pointer-events-none" />
                {/* Phone Frame */}
                <div className={`relative ${getPhoneDimensions()} bg-[#121212] rounded-[3rem] shadow-[0_0_0_9px_#333333,0_0_0_10px_#000000,0_20px_50px_rgba(0,0,0,0.5)] border-[6px] border-[#222222] overflow-hidden transition-all duration-300`}>

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
                            <ErrorBoundary>
                                {renderSkin()}
                            </ErrorBoundary>
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
                    disabled={isGenerating}
                    className="group relative flex items-center justify-center w-16 h-16 bg-slate-900 rounded-2xl shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
                    title="Download Mockup"
                >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {isGenerating ? (
                        <div className="w-7 h-7 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10" />
                    ) : (
                        <Download className="w-7 h-7 text-white relative z-10" strokeWidth={2.5} />
                    )}
                </button>
            </div>
        </div>
    );
};
