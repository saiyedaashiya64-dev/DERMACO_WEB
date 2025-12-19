// Load header
fetch("../CONTENT/header.html")
  .then(res => res.text())
  .then(data => document.getElementById("header").innerHTML = data);

// Load footer
fetch("../CONTENT/footer.html")
  .then(res => res.text())
  .then(data => document.getElementById("footer").innerHTML = data);

// Load pages dynamically
function loadPage(page) {
  fetch(page)
    .then(r => r.text())
    .then(d => {
      const content = document.getElementById("content");
      content.innerHTML = d;

      // 🔥 banner init ONLY after DOM paint
      requestAnimationFrame(() => {
        if (page.includes("home")) {
          initHomeBanner();
        }
      });
    });
}

loadPage("../PAGES/home.html");
