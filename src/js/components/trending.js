// Modules
const giphy = require('./giphy_api.js');
const carousel = require('./carousel.js');

// Trending parameters
const trendingSection = document.querySelector('.trending.custom-carousel');
const trendingItems = trendingSection.querySelectorAll('.custom-carousel-item');

// Trending parameters
const TRENDING_RATING = 'G';
const TRENDING_SIZE = trendingItems.length;

exports.InitializeTrending = async function () {
    let trendingData = await giphy.FetchTrending(TRENDING_SIZE, TRENDING_RATING)
    PopulateTrendingSection(trendingData);

    trendingSection.addEventListener('mouseover', carousel.ToggleTrendingArrows);
    trendingSection.addEventListener('mouseout', carousel.DisableTrendingArrows);
}

function PopulateTrendingSection(data) {
    for (let i = 0; i < trendingItems.length; i++) {
        let img = trendingItems[i].querySelector('img');
        let desc = trendingItems[i].querySelector('p');
        img.src = data[i].images.fixed_height.url;
        desc.textContent = data[i].title;
    }
}