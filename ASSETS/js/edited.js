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
    .then(res => res.text())
    .then(data => document.getElementById("content").innerHTML = data);
}

// Default page
loadPage("../PAGES/home.html");
