// ── Theme toggle ──────────────────────────────────────────────────────────────
function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  const icons = document.querySelectorAll("#theme-btn i, #theme-btn-mobile i");
  icons.forEach(icon => {
    icon.className = isDark ? "bi bi-sun-fill" : "bi bi-moon-fill";
  });
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme === "dark");

function bindThemeBtn(id) {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    applyTheme(isDark);
  });
}
bindThemeBtn("theme-btn");
bindThemeBtn("theme-btn-mobile");

// ── Mobile menu toggle (replaces Bootstrap's data-bs-toggle) ─────────────────
const mobileToggle = document.getElementById("mobile-toggle");
const mobileMenu   = document.getElementById("mobile-menu");

if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Close mobile menu when a nav link is clicked
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
  });
}

// ── Typed text animation ──────────────────────────────────────────────────────
const typedEl = document.getElementById("typed-text");
const roles = ["Python Developer", "ML/DL Engineer", "ECE Student", "Intern @ SecoudSoft"];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function type() {
  if (!typedEl) return;
  const current = roles[roleIndex];

  typedEl.textContent = isDeleting
    ? current.substring(0, charIndex - 1)
    : current.substring(0, charIndex + 1);

  charIndex += isDeleting ? -1 : 1;

  let speed = isDeleting ? 55 : 95;
  if (!isDeleting && charIndex === current.length) { speed = 1800; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; speed = 400; }

  setTimeout(type, speed);
}
type();

// ── Smooth scroll ─────────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ── Fade-in on scroll ─────────────────────────────────────────────────────────
const fadeEls = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
fadeEls.forEach(el => observer.observe(el));

// ── Live clock ────────────────────────────────────────────────────────────────
function updateTime() {
  const el = document.getElementById("timeText");
  if (!el) return;
  el.textContent = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    timeZone: "Asia/Kolkata"
  }) + " IST";
}
updateTime();
setInterval(updateTime, 1000);

// ── Navbar shadow on scroll ───────────────────────────────────────────────────
window.addEventListener("scroll", () => {
  const nav = document.getElementById("mainNav");
  if (nav) nav.style.boxShadow = window.scrollY > 10 ? "0 2px 20px rgba(0,0,0,0.1)" : "none";
});
