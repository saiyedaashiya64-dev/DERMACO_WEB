fetch("../CONTENT/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
    initMobileSubMenu(); // 🔥 VERY IMPORTANT
  });


// Load footer
fetch("../CONTENT/footer.html")
  .then(res => res.text())
  .then(data => document.getElementById("footer").innerHTML = data);

// Load pages dynamically



loadPage("../PAGES/home.html");
document.addEventListener("click", function (e) {

  if (e.target.classList.contains("open-cta-popup")) {
    document.querySelector(".cta-popup-overlay").style.display = "flex";
  }

  if (
    e.target.classList.contains("cta-close") ||
    e.target.classList.contains("cta-popup-overlay")
  ) {
    document.querySelector(".cta-popup-overlay").style.display = "none";
  }

});






function initOfferSlider() {

  // Desktop / LP: NO slider
  if (window.innerWidth > 991) {
    if ($('.offer-wrapper').hasClass('slick-initialized')) {
      $('.offer-wrapper').slick('unslick');
    }
    return;
  }

  // Mobile / Tablet: slider ON
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

/* basic click tracking */
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
    document.getElementById("popup-content").innerHTML =
      cases[card.dataset.popup];
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

  // Close other accordion sections
  document.querySelectorAll(".dropdown-submenu .dropdown-menu").forEach(menu => {
    if (menu !== submenu) menu.style.display = "none";
  });

  submenu.style.display =
    submenu.style.display === "block" ? "none" : "block";
});
// When opening popup
document.body.style.overflow = "hidden";

// When closing popup
document.body.style.overflow = "";

// Prevent Bootstrap from closing dropdown on submenu click (mobile)
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


// Reviews slider logic
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

    const gap = 30; // card margin-gap
    const cardWidth = cards[0].offsetWidth + gap;

    const visible = getVisibleCount();
    const maxIndex = Math.max(0, cards.length - visible);

    reviewIndex += direction;

    if (reviewIndex < 0) reviewIndex = 0;
    if (reviewIndex > maxIndex) reviewIndex = maxIndex;

    track.style.transform =
      `translateX(-${reviewIndex * cardWidth}px)`;
  }

  prevBtn.onclick = () => move(-1);
  nextBtn.onclick = () => move(1);

  // Reset properly on resize
  window.addEventListener("resize", () => {
    reviewIndex = 0;
    track.style.transform = "translateX(0)";
  });
}




function initFAQ() {
  const questions = document.querySelectorAll(".faq-question");

  if (!questions.length) {
    console.log("FAQ not found yet");
    return;
  }

  questions.forEach(q => {
    q.onclick = function () {
      const item = this.parentElement;

      // close others (professional behaviour)
      document.querySelectorAll(".faq-item").forEach(faq => {
        if (faq !== item) faq.classList.remove("active");
      });

      item.classList.toggle("active");
    };
  });

  console.log("FAQ initialized");
}
function initRecommendedProductSlider() {
  const slider = document.querySelector(".product-slider");
  const next = document.querySelector(".slider-arrow.next");
  const prev = document.querySelector(".slider-arrow.prev");

  if (!slider || !next || !prev) return;

  next.onclick = () => {
    slider.scrollBy({ left: 320, behavior: "smooth" });
  };

  prev.onclick = () => {
    slider.scrollBy({ left: -320, behavior: "smooth" });
  };
}
document.addEventListener("click", function (e) {

  const card = e.target.closest(".product-card");
  if (!card) return;

  const productId = card.dataset.productId;
  const product = PRODUCTS[productId];

  if (!product) {
    console.warn("Product not found:", productId);
    return;
  }

  const overlay = document.querySelector(".product-detail-overlay");
  if (!overlay) return;

  const img = overlay.querySelector(".popup-image");
  const title = overlay.querySelector(".popup-title");
  const desc = overlay.querySelector(".popup-description");

  const ingredientsList = overlay.querySelector(".popup-ingredients");
  const bestForList = overlay.querySelector(".popup-bestfor ul");
  const concernsList = overlay.querySelector(".popup-concerns ul");

  // Fill content
  img.src = product.image;
  img.alt = product.title;

  title.textContent = product.title;
  desc.textContent = product.description;

  // Ingredients
  ingredientsList.innerHTML = "";
  product.ingredients.forEach(i => {
    const li = document.createElement("li");
    li.textContent = i;
    ingredientsList.appendChild(li);
  });

  // Best for
  bestForList.innerHTML = "";
  product.bestFor.forEach(i => {
    const li = document.createElement("li");
    li.textContent = "✔ " + i;
    bestForList.appendChild(li);
  });

  // Concerns
  concernsList.innerHTML = "";
  product.concerns.forEach(i => {
    const li = document.createElement("li");
    li.textContent = "✔ " + i;
    concernsList.appendChild(li);
  });

  // Show popup
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
});



function initProductPopupClose() {

  const overlay = document.querySelector(".product-detail-overlay");
  if (!overlay) return;

  // Close when clicking ❌
  overlay.querySelector(".product-close")?.addEventListener("click", () => {
    overlay.style.display = "none";
    document.body.style.overflow = "";
  });

  // Close when clicking outside panel
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.style.display = "none";
      document.body.style.overflow = "";
    }
  });
}






function loadPage(page) {
  fetch(page)
    .then(r => r.text())
    .then(d => {
      const content = document.getElementById("content");
      content.innerHTML = d;

      // Re-init fade-in observer for new content
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      }, { threshold: 0.15 });

      document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

      // 🔥 banner init ONLY after DOM paint
      requestAnimationFrame(() => {
        if (page.includes("home")) {
          initHomeBanner();
        }
      });
      initTabs();
      initReviewsSlider();
      initFAQ();
      initRecommendedProductSlider();
      initProductPopupClose();
      if (page.includes("acne_scar")) {
        renderProductsByTreatment("acne-scar");
      }
      if (page.includes("anti_age")) {
        renderProductsByTreatment("anti-age");
      }

      if (page.includes("anti_wrinkle")) {
        renderProductsByTreatment("anti-wrinkle");
      }
      if (page.includes("eye_circle")) {
        renderProductsByTreatment("eye-circle");
      }
      if (page.includes("hair")) {
        renderProductsByTreatment("hair");
      }
      if (page.toLowerCase().includes("skin_brightening")) {
        renderProductsByTreatment("brightening");
      }
      if (page.toLowerCase().includes("facial")) {
        renderProductsByTreatment("facial");
      }



    });
}

function initMobileSubMenu() {

  // prevent bootstrap from closing menu
  const navbar = document.getElementById("navbar-collapse");

  navbar.addEventListener("click", function (e) {

    const title = e.target.closest(".submenu-title");
    if (!title) return;

    // mobile only
    if (window.innerWidth > 991) return;

    // 🔥 VERY IMPORTANT
    e.preventDefault();
    e.stopPropagation();

    const parent = title.closest(".mobile-submenu");

    // close other open submenus
    parent.parentElement
      .querySelectorAll(".mobile-submenu")
      .forEach(item => {
        if (item !== parent) item.classList.remove("open");
      });

    // toggle current submenu
    parent.classList.toggle("open");
  });

  console.log("✅ Mobile submenu fix applied");
}
// ===== CLOSE MOBILE MENU ON PAGE OPEN =====
document.addEventListener("click", function (e) {

  // final menu links only (not submenu titles)
  const link = e.target.closest(
    '.dropdown-menu a[onclick], .nav-link[onclick]'
  );

  if (!link) return;

  // mobile only
  if (window.innerWidth > 991) return;

  // close bootstrap navbar
  const navbar = document.getElementById("navbar-collapse");
  if (navbar && navbar.classList.contains("show")) {
    navbar.classList.remove("show");
  }

  // reset all open submenus
  document.querySelectorAll(".mobile-submenu.open").forEach(item => {
    item.classList.remove("open");
  });
});
