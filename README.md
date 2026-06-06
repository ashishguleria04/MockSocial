# MockSocial

<div align="center">
  <p><strong>The Ultimate Social Media Mockup Generator.</strong></p>
  <p>Create high-fidelity, stunning chat simulations for WhatsApp, Messenger, Telegram, and more purely in the browser.</p>
</div>

---

## 🚀 What's New (Recent Updates)
* **Next.js 16 & React 19**: Supercharged performance with React Compiler support.
* **Tailwind CSS v4 Engine**: Faster styling with the latest engine.
* **Gemini 2.0 Flash Integration**: Describe a scenario, and AI generates an entire realistic conversation.
* **DB-Free URL Sharing**: Instantly share creations—state is compressed directly into the URL!
* **Native GIF Export**: Create fluid `.gif` sequences natively in the browser.
* **Local Saves**: Snapshot and restore mockups instantly with zero backend.
* **Zustand 5**: Upgraded state management architecture.

## ✨ Key Features
* **Premium & Realistic**: Glassmorphism, dynamic lighting, and pixel-perfect phone chassis (with Dynamic Island).
* **10+ Platforms Supported**: WhatsApp, iMessage, Telegram, Instagram, X (Twitter), Discord, Slack, Teams, and more.
* **Live Visual Editor**: Control status bars (time, battery, WiFi), drag-and-drop messages, add reactions, and upload custom avatars/wallpapers.
* **Smart Autofill ✨**: Instantly populate mockups with realistic, coherent English data using the "Magic Wand" tool.
* **Export Anywhere**: Download high-res PNGs (up to 3x) or fluid animated GIFs.

## 📸 Interface Sneak Peek

<p align="center">
  <img src="public/screenshots/desktop-dark.png" width="48%" alt="Desktop Dark Mode">
  <img src="public/screenshots/desktop-light.png" width="48%" alt="Desktop Light Mode">
</p>
<br/>
<p align="center">
  <img src="public/screenshots/mobile-canvas.png" width="48%" alt="Mobile Canvas">
  <img src="public/screenshots/mobile-sheet-open.png" width="48%" alt="Mobile Editor">
</p>

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)
![React 19](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Gemini_2.0-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)
![Zustand 5](https://img.shields.io/badge/Zustand_5-black?style=for-the-badge&logo=react&logoColor=white)

## 🏗️ Architecture

```mermaid
graph TD
    Sidebar["Sidebar (Controls)"] --> Zustand["Zustand Store (App, Chat, Post)"]
    subgraph ChatCanvas["ChatCanvas"]
        subgraph PhoneFrame["Phone Frame Container"]
            StatusBar["Status Bar"]
            Skin["Dynamic Skin Renderer (WhatsApp, Signal, etc.)"]
        end
    end
    Sidebar --> ChatCanvas
    Zustand --> ChatCanvas
```

## 💻 Getting Started

```bash
git clone https://github.com/your-repo/mock-social.git
cd mock-social
npm install
cp .env.local.example .env.local # Add GEMINI_API_KEY
npm run dev
```

## ⭐️ Star History

<a href="https://star-history.com/#ashishguleria04/MockSocial&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=ashishguleria04/MockSocial&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=ashishguleria04/MockSocial&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=ashishguleria04/MockSocial&type=Date" />
 </picture>
</a>

## 📄 License

MIT © 2026 MockSocial
