function InitCarousel(customCarousel) {
    let carouselList = customCarousel.querySelector('.custom-carousel-list');
    let carouselPrev = customCarousel.querySelector('.custom-carousel-arrow-prev');
    let carouselNext = customCarousel.querySelector('.custom-carousel-arrow-next');

    carouselList.addEventListener('scroll', ToggleTrendingArrows);
    carouselNext.addEventListener('click', ScrollTrendingNext);
    carouselPrev.addEventListener('click', ScrollTrendingPrev);
}

function DisableTrendingArrows() {
    carousel = this.classList.contains('.custom-carousel') ? this : this.closest(".custom-carousel");
    carouselPrev = carousel.querySelector('.custom-carousel-arrow-prev');
    carouselNext = carousel.querySelector('.custom-carousel-arrow-next');

    carouselPrev.classList.remove('active');
    carouselNext.classList.remove('active');
}

function ToggleTrendingArrows() {
    if (this.closest) {
        carousel = this.classList.contains('.custom-carousel') ? this : this.closest(".custom-carousel");
        carouselList = carousel.querySelector('.custom-carousel-list');
        carouselPrev = carousel.querySelector('.custom-carousel-arrow-prev');
        carouselNext = carousel.querySelector('.custom-carousel-arrow-next');

        let max_scroll = carouselList.scrollWidth - carouselList.clientWidth;

        if (carouselList.scrollLeft > 0) {
            carouselPrev.classList.add('active');
        }
        else {
            carouselPrev.classList.remove('active');
        }

        if (carouselList.scrollLeft < max_scroll) {
            carouselNext.classList.add('active');
        }
        else {
            carouselNext.classList.remove('active');
        }
    }
}

function ScrollTrendingNext() {
    carousel = this.classList.contains('.custom-carousel') ? this : this.closest(".custom-carousel");
    carouselList = carousel.querySelector('.custom-carousel-list');

    let scrollSize = carouselList.clientWidth;
    carouselList.scrollLeft += scrollSize;

    ToggleTrendingArrows();
}

function ScrollTrendingPrev() {
    carousel = this.classList.contains('.custom-carousel') ? this : this.closest(".custom-carousel");
    carouselList = carousel.querySelector('.custom-carousel-list');

    let scrollSize = carouselList.clientWidth;
    carouselList.scrollLeft -= scrollSize;

    ToggleTrendingArrows();
}

function Init() {
    customCarousels = document.querySelectorAll('.custom-carousel');

    [...customCarousels].forEach(customCarousel => {
        InitCarousel(customCarousel);
    });
}

exports.Init = Init;
exports.ToggleTrendingArrows = ToggleTrendingArrows;
exports.DisableTrendingArrows = DisableTrendingArrows;