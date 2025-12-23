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

document.addEventListener("DOMContentLoaded", function () {

  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  if (!tabButtons.length) return; // agar is page pe tabs nahi ho

  tabButtons.forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      tabButtons.forEach(b => b.classList.remove("active"));
      tabPanes.forEach(p => p.classList.remove("active"));

      this.classList.add("active");

      const target = this.getAttribute("data-tab");
      document.getElementById(target).classList.add("active");
    });
  });

});
