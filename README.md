# 🌾 FarmIQ — AI-Powered Indian Farmer Platform

> **किसान की आवाज़, Technology की ताकत** 🇮🇳

FarmIQ is a complete, production-quality web application built for Indian farmers. It combines the simplicity needed for rural users with the power of AI-driven agricultural intelligence.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwindcss)
![Gemini](https://img.shields.io/badge/Google-Gemini_1.5_Pro-4285F4?logo=google)

## 🎯 Dual Mode Architecture

### 🌱 सरल किसान (Saral Kisan) — Phase 1
Designed for first-generation smartphone users and rural farmers:
- **64px touch targets** — no tiny buttons
- **Full Hindi interface** — Noto Sans Devanagari
- **Voice Q&A** — speak questions in Hindi, get AI answers + Text-to-Speech
- **One-tap access** — crop info, mandi rates, transport booking
- **WhatsApp sharing** — share prices and advice with fellow farmers

### 🔬 Smart Farmer — Phase 2
For tech-savvy agricultural professionals:
- **3-column dashboard** — farm overview, analytics, AI insights
- **AI Chat** — multi-turn Gemini conversations with context sidebar
- **Recharts analytics** — price trends, profit estimator
- **Community forum** — knowledge sharing with expert badges

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🌾 Crop Library | 10 crops with Hindi/English info, growth stages, fertilizer schedules |
| 🤖 AI Daily Tip | Gemini-powered daily advice based on crop, season, location |
| 📊 Mandi Rates | Real-time price display with weekly bar charts |
| 🎤 Voice Q&A | Hindi speech recognition + Gemini answers + TTS |
| 📸 Photo Diagnosis | Upload crop photo → AI pest/disease identification |
| 🧪 AI Fertilizer | Personalized fertilizer calculations via Gemini |
| 🚛 Transport | Book vehicles with Call + WhatsApp integration |
| 👨‍🌾 Community | Forum with tag filters and expert verification |

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **State:** Zustand (localStorage persistence)
- **AI:** Google Gemini 1.5 Pro (`@google/generative-ai`)
- **Charts:** Recharts
- **Animations:** Framer Motion
- **i18n:** i18next (Hindi primary + English)
- **Routing:** React Router v7
- **Icons:** Lucide React

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/JayantOlhyan/FARMIQ.git
cd FARMIQ

# Install
npm install

# Run
npm run dev
```

Then open **http://localhost:5173**

## 🔑 API Key Setup

FarmIQ uses **Google Gemini 1.5 Pro** for all AI features. The API key is stored securely in `localStorage` — never hardcoded.

1. Go to **⚙️ Settings** in the app
2. Paste your Gemini API key
3. Click **"Save"**

The key is stored under `farmiq_gemini_key` in localStorage.

## 📱 Design Philosophy

Following the India-first design system:
- **Indian Color Palette:** Saffron (#FF6200), India Green (#046A38), Gold (#D4A017)
- **Indian Tri-color Footer:** Every page has the saffron/white/green strip
- **Hindi Typography:** Noto Sans Devanagari as primary font
- **Large Touch Targets:** 64px minimum for Phase 1 buttons
- **Custom Spinner:** Wheat stalk animation (no generic spinners)

## 📂 Project Structure

```
src/
├── components/common/    # Header, BottomTabBar, TriColorFooter, Spinner
├── pages/
│   ├── phase1/           # Saral Kisan screens
│   │   ├── OnboardingScreen.jsx
│   │   ├── HomeP1.jsx
│   │   ├── CropLibrary.jsx
│   │   ├── CropDetail.jsx
│   │   ├── VoiceQA.jsx
│   │   ├── MandiP1.jsx
│   │   ├── TransportP1.jsx
│   │   └── Settings.jsx
│   └── phase2/           # Smart Farmer screens
│       ├── DashboardP2.jsx
│       ├── AIChat.jsx
│       └── CommunityForum.jsx
├── store/useStore.js     # Zustand with localStorage persistence
├── lib/
│   ├── gemini.js         # Gemini client + 7 domain prompts
│   └── i18n.js           # Hindi + English translations
├── data/crops.json       # 10-crop offline database
├── App.jsx               # Router + mode-aware layouts
└── index.css             # Design system tokens
```

## 🌐 Route Map

| Route | Phase 1 | Phase 2 |
|-------|---------|---------|
| `/home` | HomeP1 | DashboardP2 |
| `/crops` | CropLibrary | CropLibrary |
| `/crops/:id` | CropDetail | CropDetail |
| `/voice` | VoiceQA | → `/chat` |
| `/chat` | → `/voice` | AIChat |
| `/mandi` | MandiP1 | MandiP1 |
| `/transport` | TransportP1 | TransportP1 |
| `/community` | - | CommunityForum |
| `/settings` | Settings | Settings |

## 👥 Team

**Hack Homies** — Elite Hack 1.0

## 📄 License

MIT © 2026 FarmIQ
