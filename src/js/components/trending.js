import trendingItemHTML from '../../components/trending_item.txt';
import { ToggleTrendingArrows, DisableTrendingArrows } from './carousel.js';


// Modules
const giphy = require('./giphy_api.js');

// Trending parameters
const trendingSection = document.querySelector('.trending.custom-carousel');
const trendingList = trendingSection.querySelector('.custom-carousel-list');

// Trending parameters
const TRENDING_RATING = 'G';
const TRENDING_SIZE = 20;


const InitializeTrending = async (fetchStickers = false) => {
    let trendingData = await giphy.FetchTrending(TRENDING_SIZE, TRENDING_RATING, fetchStickers)
    await PopulateTrendingSection(trendingData, fetchStickers);

    trendingSection.addEventListener('mouseover', ToggleTrendingArrows);
    trendingSection.addEventListener('mouseout', DisableTrendingArrows);
}

async function PopulateTrendingSection(data, isLoadingStickers) {
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

export default InitializeTrending;