import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBuASn2zREWSf9w4klqsrkn_IsUiOoM8hc",
  authDomain: "noorcast-53ecf.firebaseapp.com",
  projectId: "noorcast-53ecf",
  storageBucket: "noorcast-53ecf.firebasestorage.app",
  messagingSenderId: "126242239603",
  appId: "1:126242239603:web:9834da65953f0ef9066606"
}; // 

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);