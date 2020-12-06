import app from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
  db: app.firestore.Firestore;
  constructor() {
    app.initializeApp(firebaseConfig);
    this.db = app.firestore();
    if (window.location.hostname === "localhost") {
      this.db.useEmulator("localhost", 30101);
    }
  }
}

export default Firebase;
