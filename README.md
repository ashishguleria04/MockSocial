# Chat Mockup Generator 📱

A pixel-perfect chat simulation tool built with Next.js 15, Tailwind CSS, and Zustand. Create fake chat screenshots for Signal, iMessage, and WhatsApp.

## Features

- 🎨 **Multi-Platform Support**: Switch instantly between Signal, iMessage (Coming Soon), and WhatsApp (Coming Soon).
- ✏️ **Live Editing**: Edit message text, toggle sender (Me/Them), and update contact info in real-time.
- 🖼️ **High-Res Export**: Download 2x scale PNGs perfect for sharing or design mocks.
- 💾 **State Persistence**: Your work is saved automatically to local storage.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open default port**:
   Visit [http://localhost:3000](http://localhost:3000)

## How to Add a New Platform (e.g., Discord)

The project uses a **Strategy Pattern** for rendering platform "Skins". To add a new one:

1.  **Update the Store Types**:
    - Open `src/store/useChatStore.ts`.
    - Add `'discord'` to the `Platform` type union.
    ```typescript
    export type Platform = 'signal' | 'imessage' | 'whatsapp' | 'discord';
    ```

2.  **Create the Skin Component**:
    - Create a new file `src/components/skins/DiscordSkin.tsx`.
    - Build your component. Access global state using `useChatStore`.
    ```tsx
    export const DiscordSkin = () => {
      const { messages } = useChatStore();
      return (
         <div className="bg-[#36393f] text-white h-full p-4">
            {/* ... implementation ... */}
         </div>
      )
    }
    ```

3.  **Register the Skin**:
    - Open `src/components/ChatCanvas.tsx`.
    - Import your new component.
    - Add a case to the `renderSkin` switch statement.
    ```tsx
    case "discord":
        return <DiscordSkin />;
    ```

4.  **Update the Sidebar UI**:
    - Open `src/components/Sidebar.tsx`.
    - Add `'discord'` to the platform list array so the button appears.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **State**: Zustand (with Persist middleware)
- **Icons**: Lucide React
- **Export**: html-to-image
