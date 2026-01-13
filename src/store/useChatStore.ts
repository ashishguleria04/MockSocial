import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Platform = 'signal' | 'imessage' | 'whatsapp' | 'discord' | 'instagram' | 'messenger' | 'telegram' | 'twitter';
export type Sender = 'me' | 'them';
export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  time: string;
  status: MessageStatus;
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

  setPlatform: (platform: Platform) => void;
  updateContact: (contact: Partial<Contact>) => void;
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
