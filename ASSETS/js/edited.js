fetch("CONTENT/header.php")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
    initMobileSubMenu();
    updateCartBadge();
    loadPage("PAGES/home.html"); // ← moved here
  });


// Load footer
fetch("CONTENT/footer.html")
  .then(res => res.text())
  .then(data => document.getElementById("footer").innerHTML = data);


function showSpinner() {
  document.getElementById('global-spinner').classList.add('active');
}
function hideSpinner() {
  document.getElementById('global-spinner').classList.remove('active');
}

function initOfferSlider() {
  if (window.innerWidth > 991) {
    if ($('.offer-wrapper').hasClass('slick-initialized')) {
      $('.offer-wrapper').slick('unslick');
    }
    return;
  }
  if (!$('.offer-wrapper').length) return;
  if (!$('.offer-wrapper').hasClass('slick-initialized')) {
    $('.offer-wrapper').slick({
      slidesToShow: 1,
      dots: true,
      arrows: false
    });
  }
}

initOfferSlider();
window.addEventListener('resize', initOfferSlider);

document.addEventListener('click', function (e) {
  const card = e.target.closest('.track-offer');
  if (!card) return;
  console.log('Offer clicked:', card.dataset.offer);
});

function initTabs() {
  const tabContainers = document.querySelectorAll(".acne-tabs");
  if (!tabContainers.length) return;
  tabContainers.forEach(container => {
    const buttons = container.querySelectorAll(".tab-btn");
    const panes = container.querySelectorAll(".tab-pane");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        panes.forEach(p => p.classList.remove("active"));
        btn.classList.add("active");
        const id = btn.getAttribute("data-tab");
        container.querySelector("#" + id).classList.add("active");
      });
    });
  });
}

const cases = {
  case1: "<h3>Client 1</h3><p>Severe acne reduced significantly after 8 weeks with controlled breakouts.</p>",
  case2: "<h3>Client 2</h3><p>Inflammation and acne marks improved after 10 weeks of treatment.</p>",
  case3: "<h3>Client 3</h3><p>Clearer skin achieved after 6 weeks with smoother texture.</p>"
};

document.querySelectorAll(".client-card").forEach(card => {
  card.onclick = () => {
    document.getElementById("popup-content").innerHTML = cases[card.dataset.popup];
    document.getElementById("case-popup").style.display = "flex";
  };
});

const popupClose = document.querySelector(".popup-close");
if (popupClose) {
  popupClose.onclick = () => {
    document.getElementById("case-popup").style.display = "none";
  };
}

document.addEventListener("click", function (e) {
  if (window.innerWidth > 991) return;
  const trigger = e.target.closest(".dropdown-submenu > a");
  if (!trigger) return;
  e.preventDefault();
  const submenu = trigger.nextElementSibling;
  document.querySelectorAll(".dropdown-submenu .dropdown-menu").forEach(menu => {
    if (menu !== submenu) menu.style.display = "none";
  });
  submenu.style.display = submenu.style.display === "block" ? "none" : "block";
});

document.body.style.overflow = "";

document.addEventListener("click", function (e) {
  if (window.innerWidth > 991) return;
  if (e.target.closest(".dropdown-menu")) {
    e.stopPropagation();
  }
});

function disableBootstrapDropdownOnMobile() {
  if (window.innerWidth <= 991) {
    document.querySelectorAll('.dropdown-toggle').forEach(el => {
      el.removeAttribute('data-toggle');
    });
  }
}
window.addEventListener('resize', disableBootstrapDropdownOnMobile);
disableBootstrapDropdownOnMobile();

function initReviewsSlider() {
  const track = document.getElementById("reviewsTrack");
  if (!track) return;
  const prevBtn = document.querySelector(".review-nav.prev");
  const nextBtn = document.querySelector(".review-nav.next");
  if (!prevBtn || !nextBtn) return;
  let reviewIndex = 0;
  function getVisibleCount() {
    return window.innerWidth <= 768 ? 1 : 3;
  }
  function move(direction) {
    const cards = track.children;
    if (!cards.length) return;
    const gap = 30;
    const cardWidth = cards[0].offsetWidth + gap;
    const visible = getVisibleCount();
    const maxIndex = Math.max(0, cards.length - visible);
    reviewIndex += direction;
    if (reviewIndex < 0) reviewIndex = 0;
    if (reviewIndex > maxIndex) reviewIndex = maxIndex;
    track.style.transform = `translateX(-${reviewIndex * cardWidth}px)`;
  }
  prevBtn.onclick = () => move(-1);
  nextBtn.onclick = () => move(1);
  window.addEventListener("resize", () => {
    reviewIndex = 0;
    track.style.transform = "translateX(0)";
  });
}

function renderProductsByTreatment(treatment) {
  const slider = document.getElementById("productSlider");
  if (!slider) return;
  if (!window.PRODUCTS_READY) {
    window._pendingTreatment = treatment;
    return;
  }
  slider.innerHTML = "";
  const matched = Object.entries(window.PRODUCTS).filter(([id, product]) =>
    product.treatments && product.treatments.includes(treatment)
  );
  if (matched.length === 0) {
    slider.innerHTML = "<p class='text-muted'>No products found for this treatment.</p>";
    return;
  }
  matched.forEach(([id, product]) => {
    slider.innerHTML += `
      <div class="product-slide-card">
        <div class="slide-img-wrap">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="slide-info">
          <h4>${product.title}</h4>
          <p class="slide-size">${product.size}</p>
          <p class="slide-price">₹${product.price}</p>
          <div class="slide-actions">
            <button class="btn-view" onclick="openProduct('${id}')">View</button>
            <button class="btn-cart"
              data-id="${id}"
              data-name="${product.title}"
              data-price="${product.price}"
              data-image="${product.image}">
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

function initFAQ() {
  const questions = document.querySelectorAll(".faq-question");
  if (!questions.length) return;
  questions.forEach(q => {
    q.onclick = function () {
      const item = this.parentElement;
      document.querySelectorAll(".faq-item").forEach(faq => {
        if (faq !== item) faq.classList.remove("active");
      });
      item.classList.toggle("active");
    };
  });
}

function initRecommendedProductSlider() {
  const slider = document.querySelector(".product-slider");
  const next = document.querySelector(".slider-arrow.next");
  const prev = document.querySelector(".slider-arrow.prev");
  if (!slider || !next || !prev) return;
  next.onclick = () => slider.scrollBy({ left: 320, behavior: "smooth" });
  prev.onclick = () => slider.scrollBy({ left: -320, behavior: "smooth" });
}

document.addEventListener("click", function (e) {
  const card = e.target.closest(".product-card");
  if (!card) return;
  const productId = card.dataset.productId;
  const product = PRODUCTS[productId];
  if (!product) return;
  const overlay = document.querySelector(".product-detail-overlay");
  if (!overlay) return;
  const img = overlay.querySelector(".popup-image");
  const title = overlay.querySelector(".popup-title");
  const desc = overlay.querySelector(".popup-description");
  const ingredientsList = overlay.querySelector(".popup-ingredients");
  const bestForList = overlay.querySelector(".popup-bestfor ul");
  const concernsList = overlay.querySelector(".popup-concerns ul");
  img.src = product.image;
  img.alt = product.title;
  title.textContent = product.title;
  desc.textContent = product.description;
  ingredientsList.innerHTML = "";
  product.ingredients.forEach(i => {
    const li = document.createElement("li");
    li.textContent = i;
    ingredientsList.appendChild(li);
  });
  bestForList.innerHTML = "";
  product.bestFor.forEach(i => {
    const li = document.createElement("li");
    li.textContent = "✔ " + i;
    bestForList.appendChild(li);
  });
  concernsList.innerHTML = "";
  product.concerns.forEach(i => {
    const li = document.createElement("li");
    li.textContent = "✔ " + i;
    concernsList.appendChild(li);
  });
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
});

function openProduct(id) {
  const product = PRODUCTS[id];
  showSpinner();                                          // ← spinner on
  fetch("PAGES/product.html?v=" + Date.now())
    .then(r => r.text())
    .then(html => {
      document.getElementById("content").innerHTML = html;
      hideSpinner();                                      // ← spinner off
      document.getElementById("product-title").textContent = product.title;
      document.getElementById("product-image").src = product.image;
      document.getElementById("product-price").textContent = "₹" + product.price;
      document.getElementById("product-size").textContent = product.size;
      document.getElementById("product-description").textContent = product.description;
      renderList("ingredients", product.ingredients);
      renderList("bestFor", product.bestFor);
      renderList("concerns", product.concerns);
      const addBtn = document.getElementById("btn-add-to-bag");
      if (addBtn) {
        addBtn.dataset.id    = id;
        addBtn.dataset.name  = product.title;
        addBtn.dataset.price = product.price;
        addBtn.dataset.image = product.image;
      }
    })
    .catch(() => hideSpinner());                         // ← spinner off on error
}

function renderList(id, list) {
  const ul = document.getElementById(id);
  if (!ul) return;
  ul.innerHTML = "";
  list.forEach(item => {
    ul.innerHTML += `<li>${item}</li>`;
  });
}

function initProductPopupClose() {
  const overlay = document.querySelector(".product-detail-overlay");
  if (!overlay) return;
  overlay.querySelector(".product-close")?.addEventListener("click", () => {
    overlay.style.display = "none";
    document.body.style.overflow = "";
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.style.display = "none";
      document.body.style.overflow = "";
    }
  });
}



function loadPage(page) {
  showSpinner();                                          // ← spinner on

  // Products page — cache busted
  if (page.includes("products")) {
    fetch("PAGES/products.html?v=" + Date.now())
      .then(r => r.text())
      .then(html => {
        document.getElementById("content").innerHTML = html;
        hideSpinner();                                    // ← spinner off
        setTimeout(() => renderAllProducts(), 100);
      })
      .catch(() => hideSpinner());
    return;
  }

  // Cart page — cache busted
  if (page.includes("cart")) {
    fetch("PAGES/cart.html?v=" + Date.now())
      .then(r => r.text())
      .then(html => {
        document.getElementById("content").innerHTML = html;
        hideSpinner();                                    // ← spinner off
        setTimeout(() => loadCart(), 100);
      })
      .catch(() => hideSpinner());
    return;
  }

  // All other pages
  fetch(page)
    .then(r => r.text())
    .then(d => {
      const content = document.getElementById("content");
      content.innerHTML = d;
      hideSpinner();                                      // ← spinner off

      // Fade-in observer
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('show');
        });
      }, { threshold: 0.15 });
      document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

      requestAnimationFrame(() => {
        if (page.includes("home")) initHomeBanner();
      });

      initTabs();
      initReviewsSlider();
      initFAQ();
      initRecommendedProductSlider();
      initProductPopupClose();

      if (page.includes("wishlist")) setTimeout(() => loadWishlist(), 100);
      if (page.includes("profile"))  setTimeout(() => loadProfile(), 100);
      if (page.includes("checkout")) setTimeout(() => loadCheckout(), 100);
      if (page.includes("orders"))   setTimeout(() => loadOrders(), 100);

      const treatmentMap = {
        "acne_scar":        "acne-scar",
        "anti_age":         "anti-age",
        "anti_wrinkle":     "anti-wrinkle",
        "eye_circle":       "eye-circle",
        "hair":             "hair",
        "skin_brightening": "brightening",
        "facial":           "facial"
      };
      const pageLower = page.toLowerCase();
      for (const [key, treatment] of Object.entries(treatmentMap)) {
        if (pageLower.includes(key)) {
          setTimeout(() => renderProductsByTreatment(treatment), 200);
          break;
        }
      }
    })
    .catch(() => hideSpinner());                         // ← spinner off on error
}

function initMobileSubMenu() {
  const navbar = document.getElementById("navbar-collapse");
  navbar.addEventListener("click", function (e) {
    const title = e.target.closest(".submenu-title");
    if (!title) return;
    if (window.innerWidth > 991) return;
    e.preventDefault();
    e.stopPropagation();
    const parent = title.closest(".mobile-submenu");
    parent.parentElement.querySelectorAll(".mobile-submenu").forEach(item => {
      if (item !== parent) item.classList.remove("open");
    });
    parent.classList.toggle("open");
  });
}

document.addEventListener("click", function (e) {
  const link = e.target.closest('.dropdown-menu a[onclick], .nav-link[onclick]');
  if (!link) return;
  if (window.innerWidth > 991) return;
  const navbar = document.getElementById("navbar-collapse");
  if (navbar && navbar.classList.contains("show")) {
    navbar.classList.remove("show");
  }
  document.querySelectorAll(".mobile-submenu.open").forEach(item => {
    item.classList.remove("open");
  });
});