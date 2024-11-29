const swiper = new Swiper('.swiper', {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      1024: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 2,
      },
      480: {
        slidesPerView: 1,
      },
    },
  });
  document.querySelectorAll('.btn-cart').forEach(button => {
    button.addEventListener('click', () => {
      alert('Товар додано до кошика!');
    });
  });
  