import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXAzbrS81o2xzuby_mKy1T5fQFYfApVq8",
  authDomain: "porterplays-e0c1d.firebaseapp.com",
  projectId: "porterplays-e0c1d",
  storageBucket: "porterplays-e0c1d.appspot.com",
  messagingSenderId: "494457827029",
  appId: "1:494457827029:web:4df3f3ff1c7cf43647bc5c",
  measurementId: "G-GMW2B0DRBS"
};

// Initialize Firebase if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// Export Firebase auth for usage in other files
export const auth = getAuth(app)
