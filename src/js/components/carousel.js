const initAllCarousels = () => {
    let customCarousels = document.querySelectorAll('.custom-carousel');

    [...customCarousels].forEach(customCarousel => {
        initCarousel(customCarousel);
    });
}

const initCarousel = (customCarousel) => {
    let carouselList = customCarousel.querySelector('.custom-carousel-list');
    let carouselPrev = customCarousel.querySelector('.custom-carousel-arrow-prev');
    let carouselNext = customCarousel.querySelector('.custom-carousel-arrow-next');

    carouselList.addEventListener('scroll', toggleTrendingArrows);
    carouselNext.addEventListener('click', scrollTrendingFwd);
    carouselPrev.addEventListener('click', scrollTrendingBck);
}

const scrollTrendingFwd = function (e) {
    let carousel = this.classList.contains('.custom-carousel') ? this : this.closest(".custom-carousel");
    let carouselList = carousel.querySelector('.custom-carousel-list');

    let scrollSize = carouselList.clientWidth;
    carouselList.scrollLeft += scrollSize;
}

const scrollTrendingBck = function (e) {
    let carousel = this.classList.contains('.custom-carousel') ? this : this.closest(".custom-carousel");
    let carouselList = carousel.querySelector('.custom-carousel-list');

    let scrollSize = carouselList.clientWidth;
    carouselList.scrollLeft -= scrollSize;
}

const toggleTrendingArrows = function (e) {
    if (this.closest) {
        let carousel = this.classList.contains('.custom-carousel') ? this : this.closest(".custom-carousel");
        let carouselList = carousel.querySelector('.custom-carousel-list');
        let carouselPrev = carousel.querySelector('.custom-carousel-arrow-prev');
        let carouselNext = carousel.querySelector('.custom-carousel-arrow-next');

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

const disableTrendingArrows = function () {
    let carousel = this.classList.contains('.custom-carousel') ? this : this.closest(".custom-carousel");
    let carouselPrev = carousel.querySelector('.custom-carousel-arrow-prev');
    let carouselNext = carousel.querySelector('.custom-carousel-arrow-next');

    carouselPrev.classList.remove('active');
    carouselNext.classList.remove('active');
}

export { initAllCarousels, toggleTrendingArrows, disableTrendingArrows };