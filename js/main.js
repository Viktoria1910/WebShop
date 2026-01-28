import { auth, db } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// 1. TVOJA FUNKCIJA ZA UČITAVANJE (Include HTML)
async function includeHTML() {
    const components = [
        { selector: '#navbar', file: 'navbar.html' },
        { selector: '#footer', file: 'footer.html' }
    ];

    for (const comp of components) {
        const element = document.querySelector(comp.selector);
        if (element) {
            try {
                const response = await fetch(comp.file + '?v=' + Date.now());
                if (!response.ok) throw new Error("Ne mogu naći " + comp.file);
                const html = await response.text();
                element.innerHTML = html;

                // Ako smo učitali navbar, pokreni provjeru admina
                if (comp.file === 'navbar.html') {
                    setupNavbarLogic();
                }
            } catch (err) {
                console.error("Greška pri učitavanju komponente:", err);
            }
        }
    }
}

// 2. LOGIKA ZA NAVBAR (Admin gumb i Bootstrap)
async function setupNavbarLogic() {
    // Inicijalizacija Bootstrapa (tvoj originalni kod)
    const navToggler = document.querySelector('.navbar-toggler');
    const navCollapse = document.querySelector('#mainNavbarCollapse');
    if (navToggler && navCollapse && typeof bootstrap !== 'undefined') {
        new bootstrap.Collapse(navCollapse, { toggle: false });
    }

    // PROVJERA ADMINA (Firebase dio)
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists() && docSnap.data().role === "admin") {
                const navLinks = document.querySelector('.navbar-nav');
                // Dodaj gumb samo ako već ne postoji
                if (navLinks && !document.getElementById('admin-btn')) {
                    const li = document.createElement('li');
                    li.id = 'admin-btn';
                    li.className = 'nav-item';
                    li.innerHTML = `<a class="nav-link text-danger fw-bold" href="admin-dodaj.html">DODAJ PROIZVOD</a>`;
                    navLinks.appendChild(li);
                }
            }
        }
    });
}

// POKRENI SVE
document.addEventListener("DOMContentLoaded", includeHTML);