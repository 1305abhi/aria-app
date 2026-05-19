# Aria App 🤖

AI-powered routine & schedule assistant built with React Native (Expo).

## Tech Stack
| Layer       | Tool                        |
|-------------|-----------------------------|
| Framework   | React Native + Expo         |
| Navigation  | React Navigation v7         |
| Backend     | Supabase (DB + Auth)        |
| AI          | Google Gemini 1.5 Flash     |
| State       | React Context + useReducer  |
| Animations  | React Native Reanimated     |

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
# Edit .env and fill in your Supabase + Gemini keys
```

### 3. Run the app
```bash
npx expo start
# Then scan the QR code with Expo Go on your phone
```

## Project Structure
```
src/
├── constants/     # Theme, colors, app-wide strings
├── context/       # React Context providers (Auth)
├── models/        # Data shape definitions
├── navigation/    # Screen routing
├── screens/
│   ├── auth/      # Login
│   ├── onboarding/
│   └── main/      # Home, Chat, Calendar, Notifications, Profile
├── services/      # Supabase, AI API calls, Auth
└── utils/         # Helper functions
```

## Phases
- [x] Phase 1 — Environment & project setup
- [ ] Phase 2 — Foundation (this file = end of phase 2)
- [ ] Phase 3 — Static UI screens
- [ ] Phase 4 — Supabase backend
- [ ] Phase 5 — App logic
- [ ] Phase 6 — AI integration
- [ ] Phase 7 — Smart features
- [ ] Phase 8 — Finalization
