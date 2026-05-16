import { initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

export const SKIP_AUTH = true; // mode dev : pas d'auth Firebase

const firebaseConfig = {
  apiKey: "AIzaSyDUMMY_API_KEY_FOR_TESTING_ONLY",
  authDomain: "eburni-kan-test.firebaseapp.com",
  projectId: "eburni-kan-test",
  storageBucket: "eburni-kan-test.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:dummy_app_id_for_testing",
};

export const auth: Auth | null = SKIP_AUTH
  ? null
  : getAuth(initializeApp(firebaseConfig));
