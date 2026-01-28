import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  // REGISTRACIJA
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = registerForm.email.value.trim();
      const lozinka = registerForm.lozinka.value;
      const ime = registerForm.ime.value.trim();

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, lozinka);
        const user = userCredential.user;

        // Spremanje korisnika u bazu kao običnog korisnika (role: user)
        await setDoc(doc(db, "users", user.uid), {
    ime: ime,
    prezime: prezime,
    email: user.email,
    role: uloga // Ovo sprema ono što je odabrano u formi
});

        alert("Registracija uspješna! UID je spremljen u bazu.");
        window.location.href = "login.html";
      } catch (err) {
        alert("Greška: " + err.message);
      }
    });
  }

  // PRIJAVA
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = loginForm.email.value.trim();
      const lozinka = loginForm.lozinka.value;

      try {
        await signInWithEmailAndPassword(auth, email, lozinka);
        window.location.href = "index.html";
      } catch (err) {
        alert("Pogrešna prijava: " + err.message);
      }
    });
  }
});