# MockSocial ✨

![MockSocial Banner](https://img.shields.io/badge/Status-Beta_v2.4-blue?style=for-the-badge&logo=appveyor)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Tailwind](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer)

> **The Ultimate Social Media Mockup Generator.**  
> Create high-fidelity, stunning chat simulations for WhatsApp, Messenger, Telegram, and more purely in the browser.

---

## 🚀 Features

### 💎 Premium Design
- **Modern SaaS Aesthetics**: A sleek, light-themed interface with vibrant, punchy colors (`#4f46e5`, `#ff0080`) and glassmorphism.
- **Realistic Phone Frame**: A pixel-perfect smartphone chassis with Dynamic Island, physical buttons, and realistic shadows.
- **Fluid Animations**: Powered by **Framer Motion**, every interaction feels alive.
- **Neon Glows**: Dynamic background gradients and hovering effects.

### 🛠️ Powerful Tools
- **Multi-Platform Support**:  
  - ✅ **WhatsApp** (Fully implemented with realistic bubbles & status checks)
  - ✅ **Signal**
  - 🚧 **Messenger, Telegram, Discord** (Coming Soon / UI Hooks ready)
- **Live Visual Editing**: 
  - Edit Contact Name, Status, and Avatar URL.
  - Send/Receive messages instantly (toggle "Me" vs "Them").
  - Real-time updates.
- **Export Ready**: One-click download of high-resolution (2x) PNGs of the entire phone frame.

---

## 🏗️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using the new `@theme` configuration)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with local storage persistence)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Image Generation**: `html-to-image`

---

## 🏁 Getting Started

1. **Clone & Install**:
   ```bash
   git clone https://github.com/your-repo/mock-social.git
   cd mock-social
   npm install
   ```

2. **Run Locally**:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` to see the magic.

3. **Build**:
   ```bash
   npm run build
   ```

---

## 🧩 Extending

### Adding a New Platform Skin
MockSocial uses a robust Strategy Pattern.

1.  **Add Type**: Update `Platform` in `src/store/useChatStore.ts`.
2.  **Build Component**: Create `src/components/skins/YourNewSkin.tsx`.
3.  **Register**: Add it to the switch case in `src/components/ChatCanvas.tsx`.
4.  **Update UI**: Add the icon and config to `src/components/Sidebar.tsx`.

---

## 📄 License

MIT © 2024 MockSocial
