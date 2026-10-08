// Simple page switcher

const navLinks = document.querySelectorAll(".nav-link");
const titleEl = document.querySelector("title");
const pageHeader = document.getElementById("page-header");
const packsRow = document.getElementById("packs-row");

function setPage(page) {
  navLinks.forEach((l) => l.classList.remove("active"));
  const active = document.querySelector(`.nav-link[data-page="${page}"]`);
  if (active) active.classList.add("active");

  if (page === "blooks") {
    titleEl.textContent = "Blooket | Blooks";
    if (pageHeader) pageHeader.textContent = "Blooks";
    if (packsRow) packsRow.classList.add("hidden");
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
