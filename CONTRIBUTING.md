# Contributing to MockSocial

Thank you for your interest in contributing to MockSocial! We want to make it as easy as possible for you to join the mission of building the ultimate social media mockup generator.

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation
1.  **Clone the repository**
    ```bash
    git clone https://github.com/ashishguleria04/MockSocial.git
    cd MockSocial
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000` to view the application.

## Project Structure

MockSocial uses **Next.js 15 (App Router)** and **Zustand** for state management.

- `src/app`: Page routes.
- `src/components/canvas`: The main phone preview area.
- `src/components/skins`: Where all the platform-specific UIs live (e.g., `WhatsAppSkin.tsx`).
- `src/components/sidebar`: The configuration panel.
- `src/store`: Global state management.

## How to Add a New Skin

We use a Strategy Pattern to make adding new platforms easy. Follow these 4 steps:

### 1. Define the Platform
Open `src/store/useChatStore.ts` and add your new platform ID to the `Platform` type.

```typescript
export type Platform = 
  | 'whatsapp' 
  // ... existing platforms
  | 'your-new-platform';
```

### 2. Create the Skin Component
Create a new file in `src/components/skins/YourNewPlatformSkin.tsx`.
- Copy an existing skin (like `SignalSkin.tsx` or `WhatsAppSkin.tsx`) to get started.
- Use the `useChatStore` hook to access dynamic data like `messages`, `contactName`, etc.

```tsx
import { useChatStore } from "@/store/useChatStore";

export const YourNewPlatformSkin = () => {
  const { messages, contactName, contactAvatar } = useChatStore();
  
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Your UI Implementation */}
    </div>
  );
};
```

### 3. Register the Skin
Open `src/components/canvas/ChatCanvas.tsx`.
- Import your new component.
- Add it to the `renderContent` switch statement.

```tsx
case 'your-new-platform':
  return <YourNewPlatformSkin />;
```

### 4. Add Sidebar Configuration
Open `src/components/sidebar/Sidebar.tsx`.
- Add your platform's configuration object to the `platforms` array. This controls the button in the sidebar.

```tsx
{
  id: "your-new-platform",
  name: "New Platform",
  icon: <YourIcon />, // Import from lucide-react
  color: "bg-blue-500", // Brand color
  type: "chat" // or "post"
},
```

## Pull Request Guidelines

1.  **Fork the repo** and create your branch from `main`.
2.  **Lint your code**: Run `npm run lint` before committing to ensure everything looks good.
3.  **Test your changes**: verify that the new skin renders correctly in the browser and that switching between skins works smoothly.
4.  **Screenshots**: If you are adding a visual feature or skin, please include screenshots or a video in your PR description.

## Asking for Help

If you get stuck, feel free to open a draft PR or an issue labeled "question". We're happy to help you get your contribution merged!
