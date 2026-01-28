import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createAppSlice, AppSlice } from './slices/createAppSlice';
import { createChatSlice, ChatSlice } from './slices/createChatSlice';
import { createPostSlice, PostSlice } from './slices/createPostSlice';

export type Platform = 'signal' | 'imessage' | 'whatsapp' | 'discord' | 'instagram' | 'messenger' | 'telegram' | 'twitter' | 'slack' | 'teams' | 'x' | 'snapchat' | 'tiktok' | 'linkedin' | 'threads';
export type Sender = 'me' | 'them';
export type MessageStatus = 'sent' | 'delivered' | 'read';
export type MockupType = 'chat' | 'post';

export interface PostConfig {
  text: string;
  image: string | null;
  likes: string;
  comments: string;
  shares: string;
  // TODO: Add any other missing fields from original if needed, but looks complete based on previous file
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  time: string;
  status: MessageStatus;
}

export interface StatusBarConfig {
  time: string;
  batteryLevel: number;
  showBatteryPercentage: boolean;
  signalStrength: number; // 0-4
  wifi: boolean;
}

export interface Contact {
  name: string;
  status: string;
  avatar: string | null;
}

// Combine all slice interfaces
export type ChatState = AppSlice & ChatSlice & PostSlice;

export const useChatStore = create<ChatState>()(
  persist(
    (...a) => ({
      ...createAppSlice(...a),
      ...createChatSlice(...a),
      ...createPostSlice(...a),
    }),
    {
      name: 'chat-mockup-storage',
      partialize: (state) => ({
        // Selectively persist fields if needed, or persist everything
        mockupType: state.mockupType,
        platform: state.platform,
        contact: state.contact,
        messages: state.messages,
        statusBar: state.statusBar,
        postConfig: state.postConfig,
        isDarkMode: state.isDarkMode,
        showWatermark: state.showWatermark,
      }),
    }
  )
);
