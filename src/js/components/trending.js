// Modules
const giphy = require('./giphy_api.js');

// Trending parameters
const trendingSection = document.querySelector('.trending-carousel');
const trendingList = document.querySelector('.trending-carousel-list');
const trendingItems = document.querySelectorAll('.trending-carousel-item');
const trendingPrev = document.querySelector('.trending-carousel-arrow-prev');
const trendingNext = document.querySelector('.trending-carousel-arrow-next');

trendingSection.addEventListener('mouseover', () => ToggleTrendingArrows(true));
trendingSection.addEventListener('mouseout', () => ToggleTrendingArrows(false));

trendingList.addEventListener('scroll', () => ToggleTrendingArrows(true));

trendingNext.addEventListener('click', () => ScrollTrendingHorizontal(true));
trendingPrev.addEventListener('click', () => ScrollTrendingHorizontal(false));

// Trending parameters
const TRENDING_RATING = 'G';
const TRENDING_SIZE = trendingItems.length;

exports.InitializeTrending = async function () {
    let trendingData = await giphy.FetchTrending(TRENDING_SIZE, TRENDING_RATING)
    PopulateTrendingSection(trendingData);
}

function PopulateTrendingSection(data) {
    for (let i = 0; i < trendingItems.length; i++) {
        let img = trendingItems[i].querySelector('img');
        let desc = trendingItems[i].querySelector('p');
        img.src = data[i].images.fixed_height.url;
        desc.textContent = data[i].title;
    }
}

function ToggleTrendingArrows(on) {
    if (on) {
        let max_scroll = trendingList.scrollWidth - trendingList.clientWidth;

        if (trendingList.scrollLeft > 0) {
            trendingPrev.classList.add('active');
        }
        else {
            trendingPrev.classList.remove('active');
        }

        if (trendingList.scrollLeft < max_scroll) {
            trendingNext.classList.add('active');
        }
        else {
            trendingNext.classList.remove('active');
        }
    }
    else {
        trendingPrev.classList.remove('active');
        trendingNext.classList.remove('active');
    }
}

function ScrollTrendingHorizontal(add) {
    let scrollSize = trendingList.clientWidth;

    if (add) {
        trendingList.scrollLeft += scrollSize;
    }
    else {
        trendingList.scrollLeft -= scrollSize;
    }

    ToggleTrendingArrows(true);
}