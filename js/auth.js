/* js/auth.js */
document.addEventListener("DOMContentLoaded", () => {
  // Registracija
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        ime: registerForm.ime.value.trim(),
        email: registerForm.email.value.trim(),
        lozinka: registerForm.lozinka.value,
        uloga: registerForm.uloga.value
      };

      try {
        const res = await fetch("api/korisnici.php?action=register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        const result = await res.json();

        const msg = document.getElementById("registerMessage");
        msg.textContent = result.message;
        msg.className = "message " + (result.success ? "success" : "error");

        if (result.success) registerForm.reset();
      } catch (err) {
        console.error(err);
      }
    });
  }

  // Prijava
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        email: loginForm.email.value.trim(),
        lozinka: loginForm.lozinka.value
      };

      try {
        const res = await fetch("api/korisnici.php?action=login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        const result = await res.json();

        const msg = document.getElementById("loginMessage");
        msg.textContent = result.message;
        msg.className = "message " + (result.success ? "success" : "error");

        if (result.success) {
          localStorage.setItem("user", JSON.stringify(result.user));
          window.location.href = "index.html";
        }
      } catch (err) {
        console.error(err);
      }
    });
  }
});
