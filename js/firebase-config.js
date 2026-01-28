import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAdDMFbsw_d-S7faq_vAbnHCUYvWUH6snw",
  authDomain: "nuvion-shop.firebaseapp.com",
  projectId: "nuvion-shop",
  storageBucket: "nuvion-shop.firebasestorage.app",
  messagingSenderId: "1025782682292",
  appId: "1:1025782682292:web:7ae012773fa71cbd293de1",
  measurementId: "G-T30GVQVSHQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };