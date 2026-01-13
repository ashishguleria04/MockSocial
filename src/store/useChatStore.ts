import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Platform = 'signal' | 'imessage' | 'whatsapp' | 'discord' | 'instagram' | 'messenger' | 'telegram' | 'twitter' | 'slack' | 'teams' | 'x' | 'snapchat' | 'tiktok';
export type Sender = 'me' | 'them';
export type MessageStatus = 'sent' | 'delivered' | 'read';

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

interface ChatState {
  platform: Platform;
  contact: Contact;
  messages: Message[];
  statusBar: StatusBarConfig;

  setPlatform: (platform: Platform) => void;
  updateContact: (contact: Partial<Contact>) => void;
  updateStatusBar: (updates: Partial<StatusBarConfig>) => void;
  addMessage: (message: Omit<Message, 'id'>) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  deleteMessage: (id: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      platform: 'signal',
      contact: {
        name: 'Friend',
        status: 'Online',
        avatar: null,
      },
      statusBar: {
        time: '9:41',
        batteryLevel: 100,
        showBatteryPercentage: true,
        signalStrength: 4,
        wifi: true,
      },
      messages: [
        {
          id: '1',
          text: 'Hey!',
          sender: 'me',
          time: '10:00',
          status: 'read',
        },
        {
          id: '2',
          text: 'Want to build an app?',
          sender: 'me',
          time: '10:01',
          status: 'read',
        },
        {
          id: '3',
          text: 'Exactly!',
          sender: 'them',
          time: '10:02',
          status: 'read',
        },
      ],

      setPlatform: (platform) => set({ platform }),
      updateContact: (updates) =>
        set((state) => ({ contact: { ...state.contact, ...updates } })),
      updateStatusBar: (updates) =>
        set((state) => ({ statusBar: { ...state.statusBar, ...updates } })),
      addMessage: (msg) =>
        set((state) => ({
          messages: [
            ...state.messages,
            { ...msg, id: Math.random().toString(36).substring(7) },
          ],
        })),
      updateMessage: (id, updates) =>
        set((state) => ({
          messages: state.messages.map((m) =>
            m.id === id ? { ...m, ...updates } : m
          ),
        })),
      deleteMessage: (id) =>
        set((state) => ({
          messages: state.messages.filter((m) => m.id !== id),
        })),
    }),
    {
      name: 'chat-mockup-storage',
    }
  )
);
