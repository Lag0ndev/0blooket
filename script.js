// Simple page switcher – both pages are just white + checkers

const navLinks = document.querySelectorAll(".nav-link");
const titleEl = document.querySelector("title");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // Remove active from all
    navLinks.forEach((l) => l.classList.remove("active"));

    // Add active to clicked
    link.classList.add("active");

    // Update title
    const page = link.dataset.page;
    if (page === "blooks") {
      titleEl.textContent = "Blooket | Blooks";
    } else {
      titleEl.textContent = "Blooket | Market";
    }
  });
});
