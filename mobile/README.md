# AutoDiag Mobile (iOS & Android)

The native mobile app for AutoDiag, built with **Expo / React Native**. It shares the same
diagnostic engine as the web app and works **fully offline** — diagnostics run on-device.

## Screens
- **Home** — hero, features, and a Pro upsell
- **Diagnose** — pick year / make / model, describe the problem (with quick-pick examples)
- **Result** — possible causes, step-by-step fixes with urgency + DIY/Shop tags, cost estimates
- **Pricing** — the $50/month Pro plan (opens secure checkout)

## Run it

```bash
cd mobile
npm install
npm start
```

Then:
- Press `i` for the **iOS simulator** (Mac + Xcode)
- Press `a` for the **Android emulator** (Android Studio)
- Or scan the QR code with the **Expo Go** app on your phone

## Build for the app stores

```bash
npm install -g eas-cli
eas login
eas build --platform ios       # App Store
eas build --platform android   # Google Play
```

## Architecture
- **Expo SDK 51** + React Native 0.74
- **React Navigation** (native stack)
- Shared diagnostic engine in `src/lib/` (identical logic to the web app)
- The diagnostic engine is pure TypeScript with no platform dependencies, so the same
  `diagnostics.ts` powers both web and mobile.

## Connecting Pro checkout
`src/screens/PricingScreen.tsx` opens `CHECKOUT_URL` (your deployed web `/pricing` page) for
the $50/month subscription. For native in-app purchases, swap this for
`expo-in-app-purchases` / RevenueCat to comply with App Store / Play Store billing rules.
