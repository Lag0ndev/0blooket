// Page switcher + purchase modal + locked Blooks page

const navLinks = document.querySelectorAll(".nav-link");
const titleEl = document.querySelector("title");
const pageHeader = document.getElementById("page-header");
const packsRow = document.getElementById("packs-row");
const blooksPage = document.getElementById("blooks-page");
const blooksContainer = document.getElementById("blooks-packs-container");

const packCard = document.getElementById("spooky-pack");
const backdrop = document.getElementById("modal-backdrop");
const closeBtn = document.getElementById("modal-close");
const qtyInput = document.getElementById("qty-input");
const buyQtyEl = document.getElementById("buy-qty");
const buyPriceEl = document.getElementById("buy-price");
const btnMinus = document.getElementById("btn-minus");
const btnReset = document.getElementById("btn-reset");

const PRICE = 25;

const LOCK_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5zm0 2a3 3 0 0 1 3 3v3H9V6a3 3 0 0 1 3-3zm0 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/></svg>`;

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
    closeModal();
    if (blooksContainer && !blooksContainer.dataset.rendered) {
      renderLockedBlooks();
      blooksContainer.dataset.rendered = "1";
    }
  } else {
    titleEl.textContent = "Blooket | Market";
    if (pageHeader) pageHeader.textContent = "Market";
    if (packsRow) packsRow.classList.remove("hidden");
    if (blooksPage) blooksPage.classList.add("hidden");
  }
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
