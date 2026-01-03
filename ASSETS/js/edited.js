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

/* ===============================
   PRODUCT DATA (Dynamic)
   =============================== */

const PRODUCTS = {

  "toner-purifying": {
    title: "DermaCo Purifying Toner (Alcohol-Free)",
    image: "../../ASSETS/images/products/product1.png",
    description:
      "Designed for oily and acne-prone skin, this alcohol-free toner gently cleanses pores and refines skin texture without drying.",
    ingredients: [
      "Niacinamide – Minimizes pores and improves skin tone",
      "Mandelic Acid – Gentle exfoliation for smoother skin",
      "Botanical Extracts – Calm and refresh the skin"
    ],
    bestFor: ["Oily Skin", "Combination Skin", "Acne-prone Skin"],
    concerns: ["Acne", "Oily Skin", "Large Pores"],
    size: "100 ml"
  },

  "cleansing-gel": {
    title: "DermaCo Soothing Cleansing Gel",
    image: "../../ASSETS/images/products/product2.png",
    description:
      "A gentle soap-free gel cleanser suitable for daily use. Cleanses without stripping and maintains hydration.",
    ingredients: [
      "Niacinamide – Supports skin barrier",
      "Glycerin – Long-lasting hydration",
      "Mild Cleansing Agents – Remove impurities gently"
    ],
    bestFor: ["All Skin Types", "Sensitive Skin"],
    concerns: ["Dehydration", "Dullness", "Clogged Pores"],
    size: "50 ml"
  },

  "scrub-vitc": {
    title: "DermaCo Salicylic Acid Vit C Scrub",
    image: "../../ASSETS/images/products/product3.png",
    description:
      "A gentle exfoliating scrub that unclogs pores, controls oil, and helps reduce acne and marks.",
    ingredients: [
      "Salicylic Acid – Unclogs pores",
      "Vitamin C – Reduces acne marks",
      "CICA – Soothes irritated skin",
      "Witch Hazel – Controls oil"
    ],
    bestFor: ["Oily Skin", "Combination Skin"],
    concerns: ["Acne", "Blemishes", "Excess Oil"],
    size: "100 ml"
  },

  "spot-serum": {
    title: "DermaCo Spot On Spot Gone Serum",
    image: "../../ASSETS/images/products/product4.png",
    description:
      "A fast-acting spot treatment that targets active acne, reduces redness, and prevents future breakouts.",
    ingredients: [
      "Salicylic Acid – Clears clogged pores",
      "Glycolic Acid – Mild exfoliation",
      "Zinc PCA – Controls oil",
      "Tea Tree – Antibacterial action"
    ],
    bestFor: ["Acne-prone Skin"],
    concerns: ["Active Acne", "Clogged Pores"],
    size: "8 ml"
  },
  /* ===== ADD BELOW YOUR EXISTING PRODUCTS ===== */

  "cleansing-balm": {
    title: "Barrier Renew Cleansing Balm",
    image: "../../ASSETS/images/products/product5.png",
    description:
      "A gentle yet effective cleansing balm that melts away makeup and impurities while protecting the skin barrier.",
    ingredients: [
      "5 Ceramides – Strengthen and restore skin barrier",
      "Algae Extract – Antioxidant hydration",
      "Macadamia Nut Oil – Nourishes and softens skin",
      "CICA Oil – Soothes and repairs barrier"
    ],
    bestFor: ["Acne-prone Skin", "Sensitive Skin"],
    concerns: ["Skin Barrier Damage", "Wrinkles", "Ageing"],
    size: "110 ml"
  },

  "collagen-peptides": {
    title: "Nutra+ Collagen Peptides",
    image: "../../ASSETS/images/products/product6.png",
    description:
      "Orange-flavored collagen supplement that supports skin elasticity, hair, nails, and joint health.",
    ingredients: [
      "Hydrolyzed Marine Collagen – Improves elasticity",
      "Hyaluronic Acid – Deep hydration",
      "Glutathione – Brightens skin",
      "Biotin – Strengthens hair & nails",
      "Vitamin C & E – Antioxidant support"
    ],
    bestFor: ["All Skin Types"],
    concerns: ["Wrinkles", "Loss of Firmness", "Low Collagen"],
    size: "270 gm"
  },

  "dreamy-glow-serum": {
    title: "Dreamy Glow Serum",
    image: "../../ASSETS/images/products/product7.png",
    description:
      "Advanced serum with Alpha Arbutin and Tranexamic Acid to visibly reduce pigmentation and dark spots.",
    ingredients: [
      "Alpha Arbutin 2% – Reduces pigmentation",
      "Tranexamic Acid 3% – Evens skin tone"
    ],
    bestFor: ["Oily Skin", "Normal Skin"],
    concerns: ["Dark Spots", "Pigmentation"],
    size: "100 ml"
  },

  "stemness-cream": {
    title: "Derma Stemness Restoring Cream",
    image: "../../ASSETS/images/products/product8.png",
    description:
      "Anti-ageing cream with plant stem cell technology that firms, tightens, and protects skin.",
    ingredients: [
      "Argan Stem Cell Extract – Skin renewal",
      "UVA & UVB Filters – Sun protection"
    ],
    bestFor: ["All Skin Types"],
    concerns: [
      "Fine Lines",
      "Wrinkles",
      "Sagging Skin",
      "Age Spots",
      "Advanced Ageing"
    ],
    size: "100 gm"
  },
  "RetinoBoost-Face-Serum": {
    title: "DermaCo RetinoBoost Face Serum",
    image: "../../ASSETS/images/products/product9.png",
    description:
      "DermaCo RetinoBoost Face Serum is a powerful anti-ageing serum formulated to visibly reduce fine lines and wrinkles while improving skin firmness. Enriched with Retinol, Matrixyl 3000, and Niacinamide, it boosts collagen, smoothens skin texture, and restores a youthful, tighter appearance with regular use. Suitable for a complete day & night skincare routine.",
    ingredients: [
      "Retinol: Helps reduce fine lines and wrinkles by boosting cell turnover and improving skin texture.",
      "Matrixyl 3000: A powerful peptide that supports collagen production, improving skin firmness and elasticity.",
      "Niacinamide: Strengthens the skin barrier, evens skin tone, and helps reduce signs of ageing."
    ],
    bestFor: ["All Skin Types"],
    concerns: [
      "Wrinkles",
      "Uneven skin tone",
      "Ageing skin",
      "Dryness"
    ],
    size: "30 ml"
  },
  "Stemness-Restoring-Serum": {
    title: "DermaCo Stemness Restoring Serum",
    image: "../../ASSETS/images/products/product10.png",
    description:
      "A lightweight, oil-free serum powered by Argan plant stem cells to boost skin regeneration and repair. It helps firm, tighten, and rejuvenate skin for a youthful, radiant appearance. Dermatologically tested and free from parabens, sulphates, fragrance, silicones, and oils. Suitable for all skin types.",
    ingredients: [
      "Argan Plant Stem Cells: Help protect and reinforce the skin’s regenerative cells, supporting repair, firmness, and youthful skin renewal.",
      "Advanced Liposome Technology: Enhances deep penetration of active ingredients, allowing them to reach hard-to-target regenerative skin cells and accelerate natural repair.",
      
    ],
    bestFor: ["All Skin Types"],
    concerns: [
      "Wrinkles",
      "Ageing skin",
      "Dryness",
      "Fine lines",
      "Age spots",
      "Sagging skin",
      "Advanced signs of ageing",
      "Hydration"
    ],
    size: "30 ml"
  },



};




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
  const content = document.querySelector(".product-detail-content");

  if (!overlay || !content) return;

  content.innerHTML = `
    <div class="product-detail-image">
      <img src="${product.image}" alt="${product.title}">
    </div>

    <h3>${product.title}</h3>
    <p>${product.description}</p>

    <ul class="ingredient-list">
      ${product.ingredients.map(i => `<li>${i}</li>`).join("")}
    </ul>

    <div class="product-meta">
      <div class="meta-block">
        <h4>Best for</h4>
        <ul>${product.bestFor.map(i => `<li>✔ ${i}</li>`).join("")}</ul>
      </div>

      <div class="meta-divider"></div>

      <div class="meta-block">
        <h4>Concerns</h4>
        <ul>${product.concerns.map(i => `<li>✔ ${i}</li>`).join("")}</ul>
      </div>
    </div>
  `;

  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("product-detail-overlay")) {
    e.target.style.display = "none";
    document.body.style.overflow = "";
  }
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
