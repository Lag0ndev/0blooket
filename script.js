// Page switcher + purchase modal

const navLinks = document.querySelectorAll(".nav-link");
const titleEl = document.querySelector("title");
const pageHeader = document.getElementById("page-header");
const packsRow = document.getElementById("packs-row");

const packCard = document.getElementById("spooky-pack");
const backdrop = document.getElementById("modal-backdrop");
const closeBtn = document.getElementById("modal-close");
const qtyInput = document.getElementById("qty-input");
const buyQtyEl = document.getElementById("buy-qty");
const buyPriceEl = document.getElementById("buy-price");
const btnMinus = document.getElementById("btn-minus");
const btnReset = document.getElementById("btn-reset");

const PRICE = 25;

function setPage(page) {
  navLinks.forEach((l) => l.classList.remove("active"));
  const active = document.querySelector(`.nav-link[data-page="${page}"]`);
  if (active) active.classList.add("active");

  if (page === "blooks") {
    titleEl.textContent = "Blooket | Blooks";
    if (pageHeader) pageHeader.textContent = "Blooks";
    if (packsRow) packsRow.classList.add("hidden");
    closeModal();
  } else {
    titleEl.textContent = "Blooket | Market";
    if (pageHeader) pageHeader.textContent = "Market";
    if (packsRow) packsRow.classList.remove("hidden");
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
