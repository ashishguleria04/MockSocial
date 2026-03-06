# MockSocial

> **The Ultimate Social Media Mockup Generator.**  
> Create high-fidelity, stunning chat simulations for WhatsApp, Messenger, Telegram, and more purely in the browser.

---

## Overview

MockSocial offers a premium, pixel-perfect environment for designing realistic social media chat interfaces. Bridging the gap between design and functionality, it combines modern aesthetics with powerful customization tools, making it the ideal solution for developers, designers, and content creators.

## Features

### Premium Design
*   **Modern SaaS Aesthetics**: Featuring a sleek, light-themed interface with curated color palettes and sophisticated glassmorphism.
*   **Realistic Architecture**: A pixel-perfect smartphone chassis complete with Dynamic Island, physical buttons, and lifelike shadows.
*   **Fluid Interactions**: Powered by **Framer Motion**, delivering an interface where every interaction feels alive and responsive.
*   **Visual Depth**: Enhanced by dynamic background gradients and subtle, premium lighting effects.

### Powerful Tools
*   **Comprehensive Platform Support**: 
    *   Fully implemented skins for **WhatsApp**, **Signal**, **Slack**, **Discord**, **Telegram**, **Messenger**, **Instagram**, **Teams**, and **X**.
    *   Post mockups for **Instagram**, **X (Twitter)**, **LinkedIn**, and **Threads**.
*   **Live Visual Editing**: 
    *   **Dynamic Status Bar**: Real-time control over time, battery (level & percentage), signal strength, and WiFi across supported skins.
    *   **Interactive Chat**: Type messages, send emojis, and upload images directly in the mockups (Instagram).
    *   **Advanced Message Contexts**: Build deep, authentic chats by assigning reply-to quotes and interactive emoji reaction pills to individual bubbles (supported on WhatsApp, Signal, iMessage).
    *   **Avatar Uploads**: Drag and drop or select local images for user profiles.
    *   **AI Conversation Generator 🤖**: Describe a scenario in natural language and let **Google Gemini** generate an entire realistic conversation — with platform-aware tone, natural message flow, and authentic timing.
    *   **Smart Autofill ✨**: Instantly populate your mockup with realistic, coherent English data (messages, profiles, posts) using the "Magic Wand" tool.
    *   **Db-Free Sharing 🔗**: Share your creations instantly with a unique link. The entire state is compressed into the URL, requiring no backend or database.
*   **Drag-and-Drop Reordering**:
    *   Effortlessly reorder messages in the sidebar using intuitive drag-and-drop interactions.
*   **Customization Freedom**:
    *   **Custom Wallpapers**: Upload any image to set as your chat background for a personalized touch.
    *   **Keyboard Overlay**: Toggle a realistic iOS keyboard to simulate active typing scenarios.
*   **Production-Ready Export**: 
    *   **High-Res PNGs**: One-click generation of high-resolution (2x) PNGs of the entire phone frame.
    *   **Animated GIFs**: Create fluid scrolling `.gif` sequences natively in the browser to deliver video-like proof-of-work arrays.

---

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animation**: [Framer Motion](https://www.framer.com/motion/)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **AI**: [Google Generative AI SDK](https://ai.google.dev/) (Gemini 2.0 Flash)

---

## Project Structure

The project is organized to effectively process, render, and manage state for multiple social media skins.

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Main application entry
├── components/           # React components
│   ├── canvas/           # Canvas-related components
│   │   ├── ChatCanvas.tsx     # Main phone frame and skin renderer
│   │   ├── StatusBar.tsx      # Dynamic phone status bar
│   │   └── watermark-overlay.tsx
│   ├── providers/        # Context providers
│   │   ├── auth-provider.tsx  # NextAuth session provider
│   │   └── theme-provider.tsx # Next-themes provider
│   ├── shared/           # Reusable UI elements
│   │   ├── ai-chat-dialog.tsx # AI conversation generator modal
│   │   ├── icons.tsx          # SVG icon definitions
│   │   └── ...
│   ├── sidebar/          # Configuration sidebar
│   │   └── Sidebar.tsx        # Main controls interface
│   ├── skins/            # Platform-specific UI implementations
│   │   ├── WhatsAppSkin.tsx
│   │   ├── DiscordSkin.tsx
│   │   └── ... (other skins)
│   └── ui/               # Shadcn/UI primitive components
├── store/                # Zustand State Management
│   ├── slices/           # Modular state slices
│   │   ├── createAppSlice.ts  # Global app state (Platform, Theme)
│   │   ├── createChatSlice.ts # Chat data (Messages, Contacts)
│   │   └── createPostSlice.ts # Post data (Config)
│   └── useChatStore.ts   # Main store combiner
├── app/api/
│   └── generate-chat/    # AI conversation API route (Gemini)
└── lib/                  # Utilities
    └── utils.ts
```

---

## Getting Started

### Prerequisites
*   Node.js 18+
*   npm

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-repo/mock-social.git
    cd mock-social
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up environment variables** (for AI features)
    ```bash
    cp .env.local.example .env.local
    ```
    Add your [Gemini API key](https://aistudio.google.com/apikey) to `.env.local`:
    ```env
    GEMINI_API_KEY="your-gemini-api-key"
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000` to view the application.

4.  **Build for Production**
    ```bash
    npm run build
    ```

---

## Development Guide

### State Management
We use **Zustand** with a sliced architecture for global state management.
*   **App Slice**: Handles global UI state like the selected `platform`, `isDarkMode`, and `statusBar` settings.
*   **Chat Slice**: Manages `messages`, `contact` info, and conversation history.
*   **Post Slice**: Manages configuration for post mockups (`likes`, `comments`, `shares`).

To use the store in a component:
```typescript
import { useChatStore } from "@/store/useChatStore";

const MyComponent = () => {
  const { platform, setPlatform } = useChatStore();
  // ...
};
```

### Adding a New Skin

MockSocial is built with the Strategy Pattern to make adding new platforms easy.

1.  **Define the Platform**:
    Open `src/store/useChatStore.ts` and add your platform ID to the `Platform` type.
    ```typescript
    export type Platform = '...' | 'new-platform';
    ```

2.  **Create the Skin Component**:
    Create a new file in `src/components/skins/NewPlatformSkin.tsx`.  
    Use the `useChatStore` hook to access dynamic data (messages, contact info).

3.  **Register the Skin**:
    Import and add your component to the switch statement in `src/components/canvas/ChatCanvas.tsx`.

4.  **Add Sidebar Configuration**:
    Add your platform's configuration (colors, icon) to the `platforms` array in `src/components/sidebar/Sidebar.tsx`.

---

## Star History

<a href="https://star-history.com/#ashishguleria04/MockSocial&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=ashishguleria04/MockSocial&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=ashishguleria04/MockSocial&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=ashishguleria04/MockSocial&type=Date" />
 </picture>
</a>

## License

MIT © 2026 MockSocial
