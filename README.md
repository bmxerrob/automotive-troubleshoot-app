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
- 💳 **Pro Subscription** — $50/month plan with Stripe Checkout for unlimited diagnostics

## Plans
| | Free | Pro — $50/month |
|---|------|------------------|
| Diagnostics | 3 / day | Unlimited |
| Troubleshooting steps | ✅ | ✅ |
| Maintenance tracker | — | ✅ |
| Repair history log | — | ✅ |
| Export reports (PDF) | — | ✅ |
| Priority AI response | — | ✅ |
| Early mobile app access | — | ✅ |

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

## Enable Payments ($50/month Pro plan)

The pricing page and Subscribe button are fully built. To take real payments, add your
[Stripe](https://dashboard.stripe.com/apikeys) keys to `.env.local`:

```
STRIPE_SECRET_KEY=sk_live_or_test_...
# Optional — a pre-created recurring $50/month Price ID. If omitted, the
# checkout route creates the $50/month price inline.
STRIPE_PRICE_ID=price_...
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

Then install the Stripe SDK (already in package.json):

```bash
npm install
```

The `/pricing` page's Subscribe button opens a secure Stripe Checkout session for the
$50/month subscription. Until keys are set, the button shows a friendly "not configured" message.

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide Icons**
- **Stripe** (subscription checkout)

## Roadmap
- [ ] React Native mobile app (iOS & Android)
- [ ] OBD-II Bluetooth scanner integration
- [ ] Maintenance schedule tracker
- [ ] Repair history log
- [ ] Mechanic finder by location
- [ ] Community Q&A
