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
      initTabs();
      initReviewsSlider();
      initFAQ();
    });
}


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

document.querySelector(".popup-close").onclick = () => {
  document.getElementById("case-popup").style.display = "none";
};
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
