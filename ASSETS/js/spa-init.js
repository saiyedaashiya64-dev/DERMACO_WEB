function initHomeBanner() {

  if (!$('.banner-carousel').length) return;

  // hard reset
  $('.banner-carousel').html($('.banner-carousel').html());

  $('.banner-carousel').slick({
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: true,
    speed: 600,
    prevArrow: '<button class="carousel-control left"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button class="carousel-control right"><i class="fas fa-chevron-right"></i></button>'
  });
}
