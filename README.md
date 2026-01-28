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
*   **Live Visual Editing**: 
    *   Instantly modify contact names, statuses, and avatars.
    *   Toggle between sender and receiver roles seamlessly.
    *   Experience real-time updates as you type.
*   **Production-Ready Export**: One-click generation of high-resolution (2x) PNGs of the entire phone frame, ready for presentations or portfolios.

---

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white)

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animation**: [Framer Motion](https://www.framer.com/motion/)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **Icons**: [Lucide React](https://lucide.dev/)

---

## Getting Started

1.  **Clone & Install**
    ```bash
    git clone https://github.com/your-repo/mock-social.git
    cd mock-social
    npm install
    ```

2.  **Run Locally**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000` to view the application.

3.  **Build**
    ```bash
    npm run build
    ```

---

## Extensibility

MockSocial is architected with a robust Strategy Pattern to ensure easy expansion.

**Adding a New Platform Skin:**
1.  **Define**: Update the `Platform` type in `src/store/useChatStore.ts`.
2.  **Build**: Create your new skin component in `src/components/skins/`.
3.  **Register**: Add the component to the switch case in `src/components/ChatCanvas.tsx`.
4.  **Configure**: Add the icon and settings to `src/components/Sidebar.tsx`.

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
