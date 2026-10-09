// Page switcher + purchase modal + Blooks page (locks, score, buttons)
// Supports /blooks and /market via Vercel rewrites + pathname

const navLinks = document.querySelectorAll(".nav-link");
const titleEl = document.querySelector("title");
const pageHeader = document.getElementById("page-header");
const packsRow = document.getElementById("packs-row");
const blooksPage = document.getElementById("blooks-page");
const blooksContainer = document.getElementById("blooks-packs-container");
const headerButtons = document.getElementById("header-buttons");
const scorePanel = document.getElementById("score-panel");

const packCard = document.getElementById("spooky-pack");
const backdrop = document.getElementById("modal-backdrop");
const closeBtn = document.getElementById("modal-close");
const qtyInput = document.getElementById("qty-input");
const buyQtyEl = document.getElementById("buy-qty");
const buyPriceEl = document.getElementById("buy-price");
const btnMinus = document.getElementById("btn-minus");
const btnReset = document.getElementById("btn-reset");

const PRICE = 25;

// Exact lock SVG from request
const LOCK_SVG = `<svg class="svg-inline--fa fa-lock fa-w-14 BlookModal_lock__gk2Dn" aria-hidden="true" focusable="false" role="img" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" style="margin:0;padding:0;box-sizing:border-box;display:inline-block;height:1em;vertical-align:-0.125em;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);opacity:0.7;z-index:9;color:#ffffff;font-size:24px;width:0.875em;overflow:visible"><path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" fill="currentColor"/></svg>`;

function renderLockedBlooks() {
  if (!blooksContainer || typeof BLOOKS_DATA === "undefined") return;

  const scroll = document.createElement("div");
  scroll.className = "blooks-scrollbox";

  BLOOKS_DATA.forEach((pack) => {
    const packEl = document.createElement("div");
    packEl.className = "blooks-pack";

    const header = document.createElement("div");
    header.className = "blooks-pack-header";
    const title = document.createElement("h2");
    title.className = "blooks-pack-title";
    title.textContent = pack.name;
    header.appendChild(title);

    const divider = document.createElement("div");
    divider.className = "blooks-divider";

    const grid = document.createElement("div");
    grid.className = "blooks-grid";

    (pack.blooks || []).forEach((b) => {
      const cell = document.createElement("div");
      cell.className = "blook-cell";
      cell.title = b.name + " (Locked)";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", b.name + " (Locked)");

      const img = document.createElement("img");
      img.src = b.src;
      img.alt = b.name + " Blook";
      img.loading = "lazy";
      img.draggable = false;

      const lock = document.createElement("div");
      lock.className = "blook-lock";
      lock.innerHTML = LOCK_SVG;

      btn.appendChild(img);
      btn.appendChild(lock);
      cell.appendChild(btn);
      grid.appendChild(cell);
    });

    packEl.appendChild(header);
    packEl.appendChild(divider);
    packEl.appendChild(grid);
    scroll.appendChild(packEl);
  });

  blooksContainer.innerHTML = "";
  blooksContainer.appendChild(scroll);
}

function setPage(page) {
  navLinks.forEach((l) => l.classList.remove("active"));
  const active = document.querySelector(`.nav-link[data-page="${page}"]`);
  if (active) active.classList.add("active");

  if (page === "blooks") {
    titleEl.textContent = "Blooket | Blooks";
    if (pageHeader) pageHeader.textContent = "My Blooks";
    if (packsRow) packsRow.classList.add("hidden");
    if (blooksPage) blooksPage.classList.remove("hidden");
    if (headerButtons) headerButtons.classList.remove("hidden");
    if (scorePanel) scorePanel.classList.remove("hidden");
    closeModal();
    if (blooksContainer && !blooksContainer.dataset.rendered) {
      renderLockedBlooks();
      blooksContainer.dataset.rendered = "1";
    }
    if (location.pathname !== "/blooks" && !location.pathname.endsWith("/blooks")) {
      try { history.replaceState(null, "", "/blooks"); } catch (_) {}
    }
  } else {
    titleEl.textContent = "Blooket | Market";
    if (pageHeader) pageHeader.textContent = "Market";
    if (packsRow) packsRow.classList.remove("hidden");
    if (blooksPage) blooksPage.classList.add("hidden");
    if (headerButtons) headerButtons.classList.add("hidden");
    if (scorePanel) scorePanel.classList.add("hidden");
    if (location.pathname !== "/market" && !location.pathname.endsWith("/market") && location.pathname !== "/") {
      try { history.replaceState(null, "", "/market"); } catch (_) {}
    }
  }
}

function getInitialPage() {
  const path = (location.pathname || "").toLowerCase();
  if (path.includes("blooks")) return "blooks";
  if (path.includes("market")) return "market";
  const hash = (location.hash || "").toLowerCase();
  if (hash.includes("blooks")) return "blooks";
  return "market";
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    setPage(link.dataset.page);
  });
});

function clampQty(n) {
  n = parseInt(n, 10);
  if (isNaN(n) || n < 1) return 1;
  if (n > 100) return 100;
  return n;
}

function updateQtyUI(q) {
  q = clampQty(q);
  qtyInput.value = q;
  buyQtyEl.textContent = q;
  buyPriceEl.textContent = q * PRICE;

  const atMin = q <= 1;
  if (btnMinus) btnMinus.disabled = atMin;
  if (btnReset) btnReset.disabled = atMin;
  document.querySelectorAll(".set-qty").forEach((btn) => {
    const v = parseInt(btn.dataset.set, 10);
    btn.disabled = v === q;
  });
}

function openModal() {
  updateQtyUI(1);
  backdrop.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  backdrop.hidden = true;
  document.body.style.overflow = "";
}

if (packCard) {
  packCard.addEventListener("click", openModal);
  packCard.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal();
    }
  });
}

if (closeBtn) closeBtn.addEventListener("click", closeModal);

if (backdrop) {
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && backdrop && !backdrop.hidden) closeModal();
});

if (qtyInput) {
  qtyInput.addEventListener("input", () => updateQtyUI(qtyInput.value));
  qtyInput.addEventListener("change", () => updateQtyUI(qtyInput.value));
}

document.querySelectorAll("[data-qty]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const delta = parseInt(btn.dataset.qty, 10);
    updateQtyUI(clampQty(qtyInput.value) + delta);
  });
});

document.querySelectorAll("[data-set]").forEach((btn) => {
  btn.addEventListener("click", () => {
    updateQtyUI(btn.dataset.set);
  });
});

if (btnReset) {
  btnReset.addEventListener("click", () => updateQtyUI(1));
}

const buyBtn = document.getElementById("buy-btn");
if (buyBtn) {
  buyBtn.addEventListener("click", () => {
    closeModal();
  });
}

// Init
setPage(getInitialPage());
