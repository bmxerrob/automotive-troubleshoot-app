# AutoDiag — AI Car Troubleshooting App

AI-powered car diagnostic and troubleshooting for all makes and models (1990–2026).

## Features
- 🚗 **All Makes & Models** — Toyota, Honda, Ford, BMW, Tesla, and 30+ brands
- 🔍 **Smart Diagnostics** — Describe your problem in plain English, get step-by-step answers
- 💡 **Built-in Engine** — Works immediately without any API key
- 🤖 **OpenAI Integration** — Add your OpenAI key for even smarter AI-powered responses
- 📱 **Mobile-First** — Fully responsive, works great on any device
- 🎯 **Urgency Ratings** — Each step is rated Low / Medium / High / Critical
- 💰 **Cost Estimates** — Realistic repair cost ranges for each issue

## Problem Categories Supported
- Check Engine Light (OBD-II codes)
- Engine overheating
- Battery & electrical issues
- Brake problems
- Transmission issues
- A/C & climate
- Steering problems
- Suspension & ride quality
- Hard/no start
- Squeaking, grinding, knocking noises
- Fuel economy drops
- Oil leaks
- Tire issues
- Exhaust & smoke

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Optional: Enable AI-Powered Responses

Create a `.env.local` file:

```
OPENAI_API_KEY=sk-your-key-here
```

Without the key, the app uses its built-in smart diagnostic engine — still highly accurate for common issues.

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide Icons**

## Roadmap
- [ ] React Native mobile app (iOS & Android)
- [ ] OBD-II Bluetooth scanner integration
- [ ] Maintenance schedule tracker
- [ ] Repair history log
- [ ] Mechanic finder by location
- [ ] Community Q&A
