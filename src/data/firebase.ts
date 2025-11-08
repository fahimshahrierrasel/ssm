import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

class Firebase {
  db: ReturnType<typeof getFirestore>;
  auth: ReturnType<typeof getAuth>;

  constructor() {
    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);
    this.auth = getAuth(app);

    if (window.location.hostname === "localhost" && import.meta.env.VITE_USE_EMULATOR === "true") {
      connectFirestoreEmulator(this.db, "localhost", 30101);
      connectAuthEmulator(this.auth, "http://localhost:30100/");
    }
  }
}

const firebase = new Firebase();

export default firebase;
