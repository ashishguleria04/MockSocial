# MockSocial Architecture

> Detailed technical documentation of the MockSocial project architecture.

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [High-Level Architecture](#high-level-architecture)
4. [Core Components](#core-components)
5. [State Management](#state-management)
6. [Data Flow](#data-flow)
7. [Skin System](#skin-system)
8. [URL-Based State Sharing](#url-based-state-sharing)
9. [Smart Autofill System](#smart-autofill-system)
10. [Project Structure](#project-structure)

---

## Overview

MockSocial is a web application that generates high-fidelity social media chat mockups. Users can create realistic simulations of various messaging platforms (WhatsApp, Signal, iMessage, etc.) directly in the browser, export them as images, and share configurations via URL.

### Key Capabilities

- **Multi-platform skins**: Support for 15+ messaging platforms
- **Two mockup types**: Chat conversations and social media posts
- **Real-time editing**: Live visual editing with instant preview
- **No database required**: State fully encoded in URL for sharing
- **Smart content generation**: AI-powered random content generation

---

## Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js 15** | Framework & routing | ^16.1.1 |
| **React 19** | UI library | ^19.2.3 |
| **TypeScript** | Type safety | ^5.9.3 |
| **Tailwind CSS v4** | Styling | ^4.1.18 |
| **Zustand** | State management | ^5.0.10 |
| **Framer Motion** | Animations | ^12.26.1 |
| **LZ-String** | URL compression | ^1.5.0 |
| **html-to-image** | Screenshot export | ^1.11.13 |
| **@dnd-kit** | Drag-and-drop | ^10.0.0 |
| **lucide-react** | Icons | ^0.562.0 |
| **@faker-js/faker** | Random data | ^10.2.0 |

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Application Layer                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐     ┌────────────────────────────────┐ │
│  │     Sidebar         │────▶│     Zustand Store              │ │
│  │  (User Controls)    │     │  ┌──────────┐ ┌──────────────┐ │ │
│  │                     │     │  │App Slice │ │ Chat Slice   │ │ │
│  │  - Platform Select  │     │  │          │ │              │ │ │
│  │  - Message Editor   │     │  │- platform│ │- messages    │ │ │
│  │  - Contact Config   │     │  │- theme   │ │- contact     │ │ │
│  │  - Appearance       │     │  │- mockup  │ │- postConfig  │ │ │
│  └─────────────────────┘     │  └──────────┘ └──────────────┘ │ │
│          │                    └────────────────────────────────┘ │
│          │                              │                        │
│          ▼                              ▼                        │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                     ChatCanvas                               ││
│  │  ┌──────────────────────────────────────────────────────┐   ││
│  │  │              Phone Frame Container                    │   ││
│  │  │  ┌────────────────────────────────────────────────┐   │   ││
│  │  │  │              Status Bar                        │   │   ││
│  │  │  └────────────────────────────────────────────────┘   │   ││
│  │  │  ┌────────────────────────────────────────────────┐   │   ││
│  │  │  │         Dynamic Skin Renderer                  │   │   ││
│  │  │  │  ┌─────────────────────────────────────────┐   │   │   ││
│  │  │  │  │  SignalSkin / WhatsAppSkin / ...       │   │   │   ││
│  │  │  │  │  (Platform-specific UI components)     │   │   │   ││
│  │  │  │  └─────────────────────────────────────────┘   │   │   ││
│  │  │  └────────────────────────────────────────────────┘   │   ││
│  │  └──────────────────────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Input**: User modifies settings in Sidebar (e.g., changes message, selects platform)
2. **State Update**: Sidebar calls Zustand store actions to update state
3. **Re-render**: React re-renders affected components with new state
4. **Skin Update**: ChatCanvas detects platform change, renders appropriate skin component
5. **Export/Share**: User can export as PNG or generate shareable URL

---

## Core Components

### 1. ChatCanvas (`src/components/canvas/ChatCanvas.tsx`)

The main rendering component that displays the phone frame and selects the appropriate skin.

**Responsibilities:**
- Phone frame rendering with realistic design (notch, buttons, shadows)
- Platform-specific skin selection
- Screenshot export functionality
- Watermark and keyboard overlay management

**Key Props:**
```typescript
// Uses Zustand store internally
const { platform, isDarkMode, mockupType, wallpaper, showKeyboard } = useChatStore();
```

### 2. Sidebar (`src/components/sidebar/Sidebar.tsx`)

The control panel for all mockup configurations.

**Sections:**
- **Platform Selector**: Grid of available messaging apps
- **Mockup Type Tabs**: Chat vs Post mockup
- **Message Editor**: Add/edit/delete/reorder messages
- **Contact/Author**: Name, avatar, status configuration
- **Appearance**: Theme, wallpaper, status bar settings
- **Actions**: Generate random content, reset, share, export

### 3. Skin Components (`src/components/skins/*.tsx`)

Platform-specific UI implementations following a consistent interface.

**Skin Interface:**
```typescript
// Each skin receives data from Zustand store
const { contact, messages, isDarkMode, wallpaper, statusBar, postConfig } = useChatStore();
```

**Available Skins:**
| Type | Skins |
|------|-------|
| Chat | Signal, WhatsApp, iMessage, Messenger, Telegram, Discord, Instagram, Slack, Teams, X, Snapchat, TikTok |
| Post | Instagram Post, X Post, LinkedIn Post, Threads Post |

---

## State Management

### Zustand Store Architecture

The store uses a **sliced pattern** to separate concerns and keep code maintainable.

```
useChatStore (Combined Store)
    ├── createAppSlice     → Global app settings
    ├── createChatSlice    → Chat-specific data
    ├── createPostSlice    → Post-specific data
    └── Middleware         → Persistence + Actions
```

### Slices Overview

#### 1. App Slice (`src/store/slices/createAppSlice.ts`)

```typescript
interface AppSlice {
  mockupType: 'chat' | 'post';
  platform: Platform;
  statusBar: StatusBarConfig;
  isDarkMode: boolean;
  showWatermark: boolean;
  wallpaper: string | null;
  showKeyboard: boolean;

  // Actions
  setMockupType: (type: MockupType) => void;
  setPlatform: (platform: Platform) => void;
  updateStatusBar: (updates: Partial<StatusBarConfig>) => void;
  toggleDarkMode: (isDark: boolean) => void;
  toggleWatermark: (show: boolean) => void;
  setWallpaper: (url: string | null) => void;
  toggleKeyboard: (show: boolean) => void;
}
```

#### 2. Chat Slice (`src/store/slices/createChatSlice.ts`)

```typescript
interface ChatSlice {
  contact: Contact;
  messages: Message[];

  // Actions
  updateContact: (updates: Partial<Contact>) => void;
  addMessage: (message: Omit<Message, 'id'>) => void;
  setMessages: (messages: Message[]) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  deleteMessage: (id: string) => void;
  reorderMessages: (fromIndex: number, toIndex: number) => void;
}
```

#### 3. Post Slice (`src/store/slices/createPostSlice.ts`)

```typescript
interface PostSlice {
  postConfig: PostConfig;

  // Actions
  updatePostConfig: (updates: Partial<PostConfig>) => void;
}
```

### Persistence

The store uses Zustand's `persist` middleware to save to localStorage:

```typescript
export const useChatStore = create<ChatState>()(
  persist(
    (...a) => {
      // Combine all slices
      return {
        ...createAppSlice(...a),
        ...createChatSlice(...a),
        ...createPostSlice(...a),
        generateRandomContent: () => { /* ... */ },
        resetState: () => { /* ... */ },
        importState: (state: Partial<ChatState>) => { /* ... */ },
      };
    },
    {
      name: 'chat-mockup-storage',
      partialize: (state) => ({
        // Only persist essential data
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
```

---

## Data Flow

### URL State Encoding (Db-Free Sharing)

The application supports sharing via URL without a database using LZ-String compression.

**Flow:**
```
1. User clicks "Share" button
2. encodeState() extracts shareable data
3. Data compressed via LZString.compressToEncodedURIComponent()
4. Encoded string appended to URL: ?s=<compressed>
5. UrlHydrator component reads on page load
6. State imported via importState() action
```

**Implementation** (`src/lib/url-state.ts`):

```typescript
export const encodeState = (state: ChatState): string => {
  const shareableData: ShareableState = {
    mockupType: state.mockupType,
    platform: state.platform,
    contact: state.contact,
    messages: state.messages,
    statusBar: state.statusBar,
    postConfig: state.postConfig,
    isDarkMode: state.isDarkMode,
  };
  const json = JSON.stringify(shareableData);
  return LZString.compressToEncodedURIComponent(json);
};

export const decodeState = (encoded: string): Partial<ChatState> | null => {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    return JSON.parse(json);
  } catch (e) {
    console.error('Failed to decode state', e);
    return null;
  }
};
```

---

## Smart Autofill System

The Smart Autofill feature generates realistic random content for mockups.

**Implementation** (`src/lib/autofill-utils.ts`):

```typescript
// Uses @faker-js/faker for realistic data generation

export const generateRandomContact = (): Partial<Contact> => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    name: `${firstName} ${lastName}`,
    status: faker.helpers.arrayElement(['Online', 'Busy', 'At the gym', ...]),
    avatar: faker.image.avatar(),
  };
};

export const generateRandomMessages = (count: number = 5): Message[] => {
  // Generates realistic chat messages with proper timestamps
};

export const generateRandomPost = (): Partial<PostConfig> => {
  // Generates social media post content with engagement metrics
};
```

**Triggered via store action:**
```typescript
generateRandomContent: () => {
  const state = get();
  if (state.mockupType === 'chat') {
    state.updateContact(generateRandomContact());
    state.setMessages(generateRandomMessages(3 + Math.floor(Math.random() * 5)));
  } else {
    state.updatePostConfig(generateRandomPost());
  }
}
```

---

## Skin System

### Adding a New Platform

To add a new platform skin:

1. **Define Platform Type** (`src/store/useChatStore.ts`):
   ```typescript
   export type Platform = 'signal' | 'imessage' | 'whatsapp' | /* ... */ | 'new-platform';
   ```

2. **Create Skin Component** (`src/components/skins/NewPlatformSkin.tsx`):
   ```typescript
   export const NewPlatformSkin = () => {
     const { contact, messages, isDarkMode, ... } = useChatStore();
     return (
       <div className="platform-specific-styles">
         {/* UI implementation */}
       </div>
     );
   };
   ```

3. **Register in ChatCanvas** (`src/components/canvas/ChatCanvas.tsx`):
   ```typescript
   switch (platform) {
     case 'new-platform': return <NewPlatformSkin />;
     // ...
   }
   ```

4. **Add to Sidebar** (`src/components/sidebar/Sidebar.tsx`):
   ```typescript
   const platforms: PlatformItem[] = [
     // Add new platform definition
   ];
   ```

### Skin Component Best Practices

- Use Zustand store for all dynamic data
- Support both light and dark modes via `isDarkMode` prop
- Use consistent message bubble structure
- Include metadata (time, read status) for realism
- Handle empty states gracefully

---

## Project Structure

```
mock-social/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/
│   │   │   └── auth/[...nextauth]/   # NextAuth routes
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home page
│   │
│   ├── components/
│   │   ├── canvas/                   # Phone frame & rendering
│   │   │   ├── ChatCanvas.tsx        # Main canvas component
│   │   │   ├── StatusBar.tsx         # Dynamic status bar
│   │   │   ├── KeyboardOverlay.tsx   # Keyboard simulation
│   │   │   └── watermark-overlay.tsx # Watermark display
│   │   │
│   │   ├── providers/                # React context providers
│   │   │   ├── auth-provider.tsx     # Session provider
│   │   │   └── theme-provider.tsx    # Theme provider
│   │   │
│   │   ├── shared/                   # Reusable components
│   │   │   ├── icons.tsx             # SVG icon definitions
│   │   │   ├── share-dialog.tsx      # URL sharing dialog
│   │   │   ├── theme-toggle.tsx      # Theme switcher
│   │   │   ├── url-hydrator.tsx      # URL state hydration
│   │   │   └── user-auth-button.tsx  # Auth button
│   │   │
│   │   ├── sidebar/                  # Configuration controls
│   │   │   ├── Sidebar.tsx           # Main sidebar component
│   │   │   └── SortableMessage.tsx   # Draggable message item
│   │   │
│   │   ├── skins/                    # Platform-specific skins
│   │   │   ├── SignalSkin.tsx
│   │   │   ├── WhatsAppSkin.tsx
│   │   │   ├── IMessageSkin.tsx
│   │   │   ├── MessengerSkin.tsx
│   │   │   ├── TelegramSkin.tsx
│   │   │   ├── DiscordSkin.tsx
│   │   │   ├── InstagramSkin.tsx
│   │   │   ├── SlackSkin.tsx
│   │   │   ├── TeamsSkin.tsx
│   │   │   ├── XSkin.tsx
│   │   │   ├── SnapchatSkin.tsx
│   │   │   ├── TikTokSkin.tsx
│   │   │   ├── InstagramPostSkin.tsx
│   │   │   ├── XPostSkin.tsx
│   │   │   ├── LinkedInPostSkin.tsx
│   │   │   └── ThreadsPostSkin.tsx
│   │   │
│   │   └── ui/                       # Shadcn/UI primitives
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── textarea.tsx
│   │       ├── dialog.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── tabs.tsx
│   │       ├── accordion.tsx
│   │       ├── separator.tsx
│   │       └── label.tsx
│   │
│   ├── store/                        # Zustand state management
│   │   ├── slices/
│   │   │   ├── createAppSlice.ts     # App settings slice
│   │   │   ├── createChatSlice.ts    # Chat data slice
│   │   │   └── createPostSlice.ts    # Post data slice
│   │   └── useChatStore.ts           # Combined store
│   │
│   ├── lib/                          # Utilities
│   │   ├── utils.ts                  # General utilities (cn function)
│   │   ├── url-state.ts              # URL encoding/decoding
│   │   └── autofill-utils.ts         # Random content generation
│   │
│   ├── auth.ts                       # NextAuth configuration
│   └── middleware.ts                 # Next.js middleware
│
├── package.json                      # Dependencies
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # Project documentation
```

---

## Key Design Patterns

### 1. Strategy Pattern (Skins)
Each platform uses a dedicated component that can be swapped at runtime based on the selected platform.

### 2. Slice Pattern (State)
Zustand store is split into logical slices (App, Chat, Post) for maintainability.

### 3. Observer Pattern (Store)
Components subscribe to Zustand store changes and re-render automatically.

### 4. Server-Side Rendering with Client Hydration
Next.js handles initial SSR while client components handle interactivity.

---

## Performance Considerations

1. **Lazy Loading**: Skins are dynamically imported in ChatCanvas
2. **Persistence**: State persisted to localStorage to preserve work between sessions
3. **Memoization**: Components use React hooks for efficient re-renders
4. **Image Compression**: URL sharing warns if data exceeds ~4000 chars

---

## Future Improvements

- More platform skins (WhatsApp Business, Viber, Line)
- Video support in mockups
- Custom theme builder
- Collaboration features
- Template library