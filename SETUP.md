# LIFE-LINE-X Setup Guide

## Quick Start (Simulation Mode)

The app runs immediately in simulation mode without any configuration:

```bash
npm install
npm run dev
```

Open http://localhost:5173 and use **demo login**:
- Citizen: `citizen@demo.com` / `demo123`
- Volunteer: `volunteer@demo.com` / `demo123`
- Authority: `authority@demo.com` / `demo123`

## Full Production Setup

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication** (Email/Password)
4. Enable **Firestore Database**
5. Enable **Cloud Messaging** (for push notifications)
6. Copy your config to `.env`:

```bash
cp .env.example .env
# Edit .env with your Firebase values
```

### 2. Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /emergencyRequests/{docId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
    match /resources/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /messages/{channel}/messages/{docId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 3. SMS Fallback (Optional)

1. Create a [Twilio account](https://www.twilio.com)
2. Get your Account SID, Auth Token, and phone number
3. Add to `.env`:

```
VITE_TWILIO_ACCOUNT_SID=ACxxxxxxxx
VITE_TWILIO_AUTH_TOKEN=your_token
VITE_TWILIO_FROM_NUMBER=+1234567890
```

⚠️ **Security Note**: For production, use a backend API to send SMS. Never expose Twilio credentials client-side.

### 4. Build for Production

```bash
npm run build
npm run preview  # Test the production build
```

### 5. Deploy

The built app can be deployed to:
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod --dir dist`
- **Firebase Hosting**: `firebase deploy`

## Features

| Feature | Status | Notes |
|---------|--------|-------|
| User Auth | ✅ | Local in demo, Firebase in production |
| SOS Button | ✅ | Broadcasts location + alert |
| Real-time Map | ✅ | Leaflet + OpenStreetMap |
| AI Assistant | ✅ | Rule-based, 100% local |
| Offline Mode | ✅ | IndexedDB + service worker |
| Multi-language | ✅ | English + Hindi |
| Dark Mode | ✅ | Class-based Tailwind |
| PWA | ✅ | Installable, offline-capable |
| Bluetooth | 🔌 | Web Bluetooth API stub |
| Mesh Network | 🔌 | Architecture stub |
| SMS Fallback | 🔌 | Requires Twilio config |
| Firebase Sync | 🔌 | Requires Firebase config |

🔌 = Requires configuration/hardware

## Architecture

```
LIFE-LINE-X/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React Context providers
│   ├── services/       # Firebase, IndexedDB, AI, etc.
│   ├── utils/          # Utilities (geo, priority, trust)
│   ├── i18n/           # Translations (en, hi)
│   └── pages/          # Route pages
├── public/             # Static assets
└── .env.example        # Environment template
```
