// Modules
const giphy = require('./giphy_api.js');
const carousel = require('./carousel.js');
const utils = require('./utils.js');

// Trending parameters
const trendingSection = document.querySelector('.trending.custom-carousel');
const trendingList = trendingSection.querySelector('.custom-carousel-list');

// Trending parameters
const TRENDING_RATING = 'G';
const TRENDING_SIZE = 20;

let trendingItemHTML;

exports.InitializeTrending = async function (fetchStickers = false) {
    let trendingData = await giphy.FetchTrending(TRENDING_SIZE, TRENDING_RATING, fetchStickers)
    await PopulateTrendingSection(trendingData, fetchStickers);

    trendingSection.addEventListener('mouseover', carousel.ToggleTrendingArrows);
    trendingSection.addEventListener('mouseout', carousel.DisableTrendingArrows);
}

async function PopulateTrendingSection(data, isLoadingStickers) {
    if (trendingItemHTML == undefined) {
        trendingItemHTML = await utils.LoadComponent('./components/trending_item.txt');
    }

    let trendingFragment = document.createDocumentFragment();
    for (let i = 0; i < TRENDING_SIZE; i++) {
        let newItem = document.createElement('div');
        newItem.innerHTML = trendingItemHTML;
        newItem = newItem.querySelector('.custom-carousel-list-item');  // Gets rid of createElement's div to avoid inheriting unwanted properties
        newItem = giphy.PopulateItemWithData(newItem, data[i], isLoadingStickers);

        let desc = newItem.querySelector('p');
        desc.textContent = data[i].title;

        trendingFragment.appendChild(newItem);
    }

    trendingList.appendChild(trendingFragment);
}