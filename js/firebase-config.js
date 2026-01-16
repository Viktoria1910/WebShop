const firebaseConfig = {
  apiKey: "OVDJE-UBACI-SVOJ-API-KEY",
  authDomain: "nuvion-shop.firebaseapp.com", 
  projectId: "nuvion-shop",
  storageBucket: "nuvion-shop.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef1234567890"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };