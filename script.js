// Simple page switcher

const navLinks = document.querySelectorAll(".nav-link");
const titleEl = document.querySelector("title");
const pageHeader = document.getElementById("page-header");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    const page = link.dataset.page;
    if (page === "blooks") {
      titleEl.textContent = "Blooket | Blooks";
      if (pageHeader) pageHeader.textContent = "Blooks";
    } else {
      titleEl.textContent = "Blooket | Market";
      if (pageHeader) pageHeader.textContent = "Market";
    }
  });
});
