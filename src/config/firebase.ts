import { initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

export const SKIP_AUTH = false;

const firebaseConfig = {
  apiKey: "AIzaSyD_4mDHogDNYPKH6btc_uLRufxgEA6T8Lk",
  authDomain: "eburni-kan.firebaseapp.com",
  projectId: "eburni-kan",
  storageBucket: "eburni-kan.firebasestorage.app",
  messagingSenderId: "653591575063",
  appId: "1:653591575063:web:0104d256a836699e93ba52",
};

export const auth: Auth | null = SKIP_AUTH
  ? null
  : getAuth(initializeApp(firebaseConfig));
