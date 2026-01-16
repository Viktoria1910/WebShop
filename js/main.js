// js/main.js – FINALNA VERZIJA koja sigurno radi
function loadHTML(selector, file) {
    fetch(file)
        .then(res => {
            if (!res.ok) throw new Error("File not found: " + file);
            return res.text();
        })
        .then(html => {
            const el = document.querySelector(selector);
            if (el) el.innerHTML = html;

            // Posebno za navbar – ponovo aktiviraj Bootstrap hamburger
            if (file.includes("navbar.html")) {
                const toggler = document.querySelector('.navbar-toggler');
                const collapse = document.querySelector('#mainNavbarCollapse');

                if (toggler && collapse) {
                    // Bootstrap 5 Collapse – mora se ručno inicijalizirati
                    const bsCollapse = new bootstrap.Collapse(collapse, { toggle: false });
                    toggler.onclick = () => bsCollapse.toggle();
                }
            }
        })
        .catch(err => console.error("Greška učitavanja:", err));
}

// Učitaj navbar i footer na svakoj stranici
document.addEventListener("DOMContentLoaded", () => {
    loadHTML("#navbar", "navbar.html?v=" + Date.now());
    loadHTML("#footer", "footer.html");
});