import { initializeApp, getApps, getApp } from "firebase/app";
import { getFunctions } from "firebase/functions";

// Using placeholder env vars. The user will define these later when linking the project.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-auth-domain",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-storage",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "demo-sender-id",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "demo-app-id"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const functions = getFunctions(app);

export { app, functions };
