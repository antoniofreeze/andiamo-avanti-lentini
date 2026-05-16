/* ============================================================
   LENTINI GIOVANE — main.js
   ============================================================ */

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

// ---------- Candidate data ----------
const CANDIDATES = [
  { order:  1, name: "ANTICO CRISTINA", cv: "assets/docs/cv-andiamo-01.pdf", casellario: "assets/docs/casellario-andiamo-01.pdf" },
  { order:  2, name: "BOSCO SANTOCONO SILVANA", cv: "assets/docs/cv-andiamo-02.pdf", casellario: "assets/docs/casellario-andiamo-02.pdf" },
  { order:  3, name: "BRIGANTI FEDERICA", cv: "assets/docs/cv-andiamo-03.pdf", casellario: "assets/docs/casellario-andiamo-03.pdf" },
  { order:  4, name: "CASERTA GAETANO", cv: "assets/docs/cv-andiamo-04.pdf", casellario: "assets/docs/casellario-andiamo-04.pdf" },
  { order:  5, name: "CASTRO SEBASTIANO", cv: "assets/docs/cv-andiamo-05.pdf", casellario: "assets/docs/casellario-andiamo-05.pdf" },
  { order:  6, name: "INCONTRO DOMENICO", cv: "assets/docs/cv-andiamo-06.pdf", casellario: "assets/docs/casellario-andiamo-06.pdf" },
  { order:  7, name: "LA CAVA ANTONINO", cv: "assets/docs/cv-andiamo-07.pdf", casellario: "assets/docs/casellario-andiamo-07.pdf" },
  { order:  8, name: "MARINO SILVANA", cv: "assets/docs/cv-andiamo-08.pdf", casellario: "assets/docs/casellario-andiamo-08.pdf" },
  { order:  9, name: "MESSINA VALERIA", cv: "assets/docs/cv-andiamo-09.pdf", casellario: "assets/docs/casellario-andiamo-09.pdf" },
  { order: 10, name: "MONTONERI STEFANIA", cv: "assets/docs/cv-andiamo-10.pdf", casellario: "assets/docs/casellario-andiamo-10.pdf" },
  { order: 11, name: "PIRRERA MICAELA", cv: "assets/docs/cv-andiamo-11.pdf", casellario: "assets/docs/casellario-andiamo-11.pdf" },
  { order: 12, name: "PRIVITELLI STEFANO", cv: "assets/docs/cv-andiamo-12.pdf", casellario: "assets/docs/casellario-andiamo-12.pdf" },
  { order: 13, name: "SGROI SALVATORE", cv: "assets/docs/cv-andiamo-13.pdf", casellario: "assets/docs/casellario-andiamo-13.pdf" },
  { order: 14, name: "SPADA GIUSEPPE", cv: "assets/docs/cv-andiamo-14.pdf", casellario: "assets/docs/casellario-andiamo-14.pdf" },
  { order: 15, name: "SPARAGNINO FRANCESCO", cv: "assets/docs/cv-andiamo-15.pdf", casellario: "assets/docs/casellario-andiamo-15.pdf" },
  { order: 16, name: "VASTA GIUSEPPE", cv: "assets/docs/cv-andiamo-16.pdf", casellario: "assets/docs/casellario-andiamo-16.pdf" },
];

// ---------- Icons ----------
const ICON_CV = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`;
const ICON_CERT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`;

// ---------- Render candidates ----------
function renderCandidates() {
  const target = document.querySelector("[data-candidates]");
  if (!target) return;

  target.innerHTML = CANDIDATES.map((c) => {
    const cvBtn = c.cv
      ? `<a class="btn-doc" href="${escapeHtml(c.cv)}" target="_blank" rel="noopener noreferrer" aria-label="CV di ${escapeHtml(c.name)}">${ICON_CV} CV</a>`
      : "";
    const casBtn = c.casellario
      ? `<a class="btn-doc" href="${escapeHtml(c.casellario)}" target="_blank" rel="noopener noreferrer" aria-label="Casellario di ${escapeHtml(c.name)}">${ICON_CERT} Casellario</a>`
      : "";

    return `
      <article class="candidate-card reveal">
        <div class="candidate-top">
          <span class="candidate-num">${String(c.order).padStart(2, "0")}</span>
          <strong class="candidate-name">${escapeHtml(c.name)}</strong>
        </div>
        <div class="candidate-docs">${cvBtn}${casBtn}</div>
      </article>`;
  }).join("");
}

// ---------- Navigation ----------
function setupNavigation() {
  const button = document.querySelector("[data-nav-toggle]");
  const nav    = document.querySelector("[data-nav]");
  if (!button || !nav) return;

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("is-nav-open", !isOpen);
  });

  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      button.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.classList.remove("is-nav-open");
    }
  });
}

// ---------- Header scroll ----------
function setupHeader() {
  const header = document.querySelector("[data-header]");
  if (!header) return;
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ---------- Reveal on scroll ----------
function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.12 }
  );

  items.forEach((el) => observer.observe(el));
}

// ---------- Cookie Banner ----------
function setupCookieBanner() {
  if (localStorage.getItem("cookie-consent")) return;

  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", "Informativa cookie");
  banner.innerHTML = `
    <div class="cookie-banner-inner">
      <p>Questo sito utilizza esclusivamente <strong>cookie tecnici</strong> necessari al funzionamento. Nessun cookie di profilazione viene utilizzato. Per saperne di più consulta la nostra <a href="privacy.html">Privacy&nbsp;&amp;&nbsp;Cookie Policy</a>.</p>
      <div class="cookie-banner-actions">
        <button type="button" class="btn btn-primary" id="cookie-accept">Accetta</button>
        <button type="button" class="btn btn-secondary" id="cookie-reject">Solo essenziali</button>
      </div>
    </div>
  `;
  document.body.appendChild(banner);

  function dismiss(value) {
    localStorage.setItem("cookie-consent", value);
    banner.remove();
  }

  banner.querySelector("#cookie-accept").addEventListener("click", () => dismiss("all"));
  banner.querySelector("#cookie-reject").addEventListener("click", () => dismiss("essential"));
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  renderCandidates();
  setupNavigation();
  setupHeader();
  setupCookieBanner();

  // Reveal runs after candidates are in the DOM
  requestAnimationFrame(setupReveal);
});
