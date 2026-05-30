"use client";

import React from "react";
import { StatusBar } from "./StatusBar";
import { Download, Video, SlidersHorizontal } from "lucide-react";
import { WatermarkOverlay } from "./watermark-overlay";
import { KeyboardOverlay } from "./KeyboardOverlay";
import { useToast } from "@/components/shared/toast";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
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


// Export libraries are dynamically imported to improve initial load time.





export const ChatCanvas = () => {
    const { platform, isDarkMode, mockupType, wallpaper, showKeyboard, phoneStyle, setMobileSheetOpen, exportQuality } = useChatStore();

    // Dynamic scale: fit mockup to available width on any screen size.
    // Initialized to null so the server render uses no inline style (avoids hydration mismatch).
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const [dynamicScale, setDynamicScale] = React.useState<number | null>(null);

    const getMockupWidth = React.useCallback(() => {
        switch (phoneStyle) {
            case 'mini': return 310;
            case 'pro': return 375;
            default: return 340;
        }
    }, [phoneStyle]);

    React.useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const compute = () => {
            const available = wrapper.clientWidth - 32; // 16px padding each side
            const scale = Math.min(1, available / getMockupWidth());
            setDynamicScale(scale);
        };
        compute(); // run immediately on mount
        const obs = new ResizeObserver(compute);
        obs.observe(wrapper);
        return () => obs.disconnect();
    }, [getMockupWidth]);

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
    const [isGeneratingGif, setIsGeneratingGif] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const { showToast } = useToast();

    const handleDragOver = React.useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.types.includes('Files')) {
            setIsDragging(true);
        }
    }, []);

    const handleDragLeave = React.useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = React.useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const addMessage = useChatStore.getState().addMessage;
                const updatePostConfig = useChatStore.getState().updatePostConfig;
                
                if (useChatStore.getState().mockupType === 'chat') {
                    addMessage({
                        text: '',
                        sender: 'me',
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        status: 'read',
                        image: ev.target?.result as string
                    });
                } else {
                    updatePostConfig({ image: ev.target?.result as string });
                }
                showToast("Image added successfully!", "success");
            };
            reader.readAsDataURL(file);
        }
    }, [showToast]);

    const downloadScreenshot = async () => {
        if (isGenerating) return;
        setIsGenerating(true);
        showToast("Generating screenshot...", "info");

        // Small delay to ensure UI updates before freezing for capture
        await new Promise(resolve => setTimeout(resolve, 10));

        const node = document.getElementById("chat-canvas");
        if (!node) {
            setIsGenerating(false);
            showToast("Failed to generate screenshot", "error");
            return;
        }

        try {
            const { toPng } = await import("html-to-image");
            const dataUrl = await toPng(node, {
                pixelRatio: exportQuality ?? 2,
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

    const downloadGif = async () => {
        if (isGenerating || isGeneratingGif) return;
        setIsGeneratingGif(true);
        showToast("Generating GIF... This may take a few seconds.", "info");

        // Small delay to ensure UI updates
        await new Promise(resolve => setTimeout(resolve, 200));

        const node = document.getElementById("chat-canvas");
        if (!node) {
            setIsGeneratingGif(false);
            showToast("Failed to generate GIF", "error");
            return;
        }

        try {
            const frames = [];
            const scrollContainer = node.querySelector('.overflow-y-auto') as HTMLElement;
            
            if (scrollContainer && scrollContainer.scrollHeight > scrollContainer.clientHeight) {
                // Animate Scroll
                scrollContainer.scrollTop = 0;
                await new Promise(r => setTimeout(r, 300));
                frames.push({ element: node, delayMs: 800 });
                
                const steps = 3;
                const scrollStep = (scrollContainer.scrollHeight - scrollContainer.clientHeight) / steps;
                
                for(let i=1; i<=steps; i++) {
                    scrollContainer.scrollTop = i * scrollStep;
                    await new Promise(r => setTimeout(r, 400));
                    frames.push({ element: node, delayMs: i === steps ? 2000 : 400 });
                }
            } else {
                frames.push({ element: node, delayMs: 1500 });
            }

            const dims = getPhoneDimensions();
            // Fallback sizes if regex fails
            const width = parseInt(dims.match(/w-\[(\d+)px\]/)?.[1] || "340");
            const height = parseInt(dims.match(/h-\[(\d+)px\]/)?.[1] || "700");
            
            const { generateGifFromElements } = await import("@/lib/export-utils");
            const blob = await generateGifFromElements(frames, width, height);
            
            const dataUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `mockup_animated_${mockupType}_${platform}_${Date.now()}.gif`;
            link.href = dataUrl;
            link.click();
            URL.revokeObjectURL(dataUrl);
            showToast("GIF downloaded successfully!", "success");
        } catch (err) {
            console.error("Failed to generate GIF", err);
            showToast("Failed to generate GIF", "error");
        } finally {
            setIsGeneratingGif(false);
        }
    };
    return (
        <div ref={wrapperRef} className="flex items-center justify-center py-6 pb-28 lg:py-8 lg:pb-32 lg:p-8 min-h-0 lg:min-h-full relative w-full overflow-x-hidden">
            <div
                id="chat-canvas"
                className="relative group transition-all duration-75 ease-in-out origin-center z-10"
                suppressHydrationWarning
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={dynamicScale !== null ? { transform: `scale(${dynamicScale})`, transformOrigin: 'center center' } : { transformOrigin: 'center center' }}
            >
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/40 via-purple-500/40 to-secondary/40 rounded-[3.5rem] blur-2xl opacity-75 group-hover:opacity-100 transition duration-75 group-hover:duration-75 animate-pulse pointer-events-none" />
                {/* Phone Frame */}
                <div className={`relative ${getPhoneDimensions()} bg-[#121212] rounded-[3rem] shadow-[0_0_0_9px_#333333,0_0_0_10px_#000000,0_20px_50px_rgba(0,0,0,0.5)] border-[6px] border-[#222222] overflow-hidden transition-all duration-75`}>

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
                            
                            {/* Drag and Drop Overlay */}
                            {isDragging && (
                                <div className="absolute inset-0 z-[100] bg-primary/20 backdrop-blur-sm flex flex-col items-center justify-center border-4 border-dashed border-primary rounded-[2.2rem] transition-all">
                                    <div className="bg-background shadow-xl rounded-2xl p-4 flex flex-col items-center gap-2 animate-bounce">
                                        <Download className="w-8 h-8 text-primary" strokeWidth={2.5} />
                                        <span className="font-bold text-foreground text-sm">Drop image to add</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Home Indicator line (iOS style) */}
                        <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-[110px] h-1.5 rounded-full z-50 pointer-events-none ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`} />
                    </div>
                </div>
            </div>

            {/* Floating Action Buttons — Download & GIF */}
            <div className="fixed bottom-4 right-4 lg:bottom-10 lg:right-10 flex flex-col gap-3 z-50">
                <button
                    onClick={downloadGif}
                    disabled={isGenerating || isGeneratingGif}
                    className="group relative flex items-center justify-center w-11 h-11 lg:w-14 lg:h-14 bg-indigo-600 rounded-2xl shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-75 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    title="Export Animated GIF"
                >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {isGeneratingGif ? (
                        <div className="w-5 h-5 lg:w-6 lg:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10" />
                    ) : (
                        <Video className="w-5 h-5 lg:w-6 lg:h-6 text-white relative z-10" strokeWidth={2.5} />
                    )}
                </button>
                
                <button
                    onClick={downloadScreenshot}
                    disabled={isGenerating || isGeneratingGif}
                    className="group relative flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-slate-900 rounded-2xl shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-75 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    title="Download Mockup (PNG)"
                >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {isGenerating ? (
                        <div className="w-5 h-5 lg:w-7 lg:h-7 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10" />
                    ) : (
                        <Download className="w-5 h-5 lg:w-7 lg:h-7 text-white relative z-10" strokeWidth={2.5} />
                    )}
                </button>
            </div>

            {/* Edit FAB — mobile only, opens the sidebar bottom sheet */}
            <button
                onClick={() => setMobileSheetOpen(true)}
                className="lg:hidden fixed bottom-4 left-4 z-50 flex items-center gap-2 h-12 px-4 bg-primary text-primary-foreground rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-75 font-bold text-sm"
                title="Open Editor"
            >
                <SlidersHorizontal className="w-4 h-4" strokeWidth={2.5} />
                Edit
            </button>
        </div>
    );
};
