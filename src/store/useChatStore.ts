import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createAppSlice, AppSlice } from './slices/createAppSlice';
import { createChatSlice, ChatSlice } from './slices/createChatSlice';
import { createPostSlice, PostSlice } from './slices/createPostSlice';
import { generateRandomContact, generateRandomMessages, generateRandomPost } from '@/lib/autofill-utils';

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
}

export interface Message {
  id: string;
  text: string;
  image?: string;
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
export type ChatState = AppSlice & ChatSlice & PostSlice & {
  generateRandomContent: () => void;
  resetState: () => void;
  importState: (state: Partial<ChatState>) => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (...a) => {
      const [set, get, api] = a;
      return {
        ...createAppSlice(...a),
        ...createChatSlice(...a),
        ...createPostSlice(...a),
        importState: (newState) => {
          set((state) => ({ ...state, ...newState }));
        },
        generateRandomContent: () => {
          const state = get();
          if (state.mockupType === 'chat') {
            state.updateContact(generateRandomContact());
            state.setMessages(generateRandomMessages(Math.floor(Math.random() * 5) + 3)); // 3 to 7 messages
          } else {
            state.updatePostConfig(generateRandomPost());
            state.updateContact({
              name: generateRandomContact().name,
              avatar: generateRandomContact().avatar
            })
          }
        },
        resetState: () => {
          set((state) => ({
            ...state,
            messages: [],
            contact: {
              name: '',
              status: '',
              avatar: null
            },
            postConfig: {
              text: '',
              image: null,
              likes: '',
              comments: '',
              shares: ''
            }
            // We intentionally don't reset platform, theme, or general settings
            // as the user likely wants to keep those preferences.
          }));
        }
      };
    },
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
