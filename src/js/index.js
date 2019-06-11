const SEARCH_THEME = 'cats';


// Modules
const giphy = require('./giphy_api.js');
const scrollLoading = require('./scroll_loading.js');
const utils = require('./utils.js');

// Trending parameters
const trendingSection = document.querySelector('.trending-carousel');
const trendingList = document.querySelector('.trending-carousel-list');
const trendingItems = document.querySelectorAll('.trending-carousel-item');
const trendingPrev = document.querySelector('.trending-carousel-arrow-prev');
const trendingNext = document.querySelector('.trending-carousel-arrow-next');

const TRENDING_SIZE = trendingItems.length;
const TRENDING_RATING = 'G';


trendingSection.addEventListener('mouseover', () => ToggleTrendingArrows(true));
trendingSection.addEventListener('mouseout', () => ToggleTrendingArrows(false));

trendingList.addEventListener('scroll', () => ToggleTrendingArrows(true));

trendingNext.addEventListener('click', () => ScrollTrendingHorizontal(true));
trendingPrev.addEventListener('click', () => ScrollTrendingHorizontal(false));


// Daily feed parameters
const dailyFeedContainers = document.querySelectorAll('.daily-feed');
const DAILY_FEED_SIZE = 10;
let feedItemHTML;
let searchOffset = 0;


const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const todayDate = new Date();
let scrollDate = new Date();


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

async function PopulateHomeFeed() {
    let fetchSize = DAILY_FEED_SIZE * dailyFeedContainers.length;
    let data = await giphy.FetchSearch(SEARCH_THEME, fetchSize, searchOffset);

    for (let i = 0; i < dailyFeedContainers.length; i++) {
        let currentFeed = dailyFeedContainers[i];
        let feedData = data.slice(i * DAILY_FEED_SIZE, i * DAILY_FEED_SIZE + DAILY_FEED_SIZE);
        PopulateFeed(currentFeed, feedData, scrollDate);

        scrollDate.setDate(scrollDate.getDate() - 1);
    }

    searchOffset += data.length;
}

function PopulateFeed(feed, gifList, feedDate) {
    let items = feed.querySelectorAll('.daily-feed-item');

    let headerTitle = feed.querySelector('.daily-feed-header h2');
    let headerTitleWeekday = headerTitle.querySelector('.weekday');

    // Populating header info for the feed object
    if (feedDate.getDate() == todayDate.getDate()) {
        headerTitleWeekday.textContent = "Today";
    }
    else if (feedDate.getDate() == todayDate.getDate() - 1) {
        headerTitleWeekday.textContent = "Yesterday";
    }
    else {
        headerTitleWeekday.textContent = weekdays[feedDate.getDay()];

        let monthTxt = document.createTextNode(months[feedDate.getMonth()]);
        let dayTxt = document.createTextNode(" " + String(feedDate.getDate()).padStart(2, '0'));
        headerTitle.appendChild(monthTxt);
        headerTitle.appendChild(dayTxt);
    }

    for (let i = 0; i < DAILY_FEED_SIZE; i++) {
        let img = items[i].querySelector('img');
        let title = items[i].querySelector('.daily-feed-item-info h4');
        let currentGif = gifList[i];

        img.src = currentGif.images.fixed_height.url;
        title.textContent = currentGif.title;
        items[i].href = `item?id=${currentGif.id}`;

        // Adding a random color to the current item
        color_index = utils.RandomInt(1, 5);
        color_class = "card-color-" + color_index;
        items[i].classList.add(color_class);
    }
}

function LoadNewFeed() {
    return giphy.FetchSearch(SEARCH_THEME, DAILY_FEED_SIZE, searchOffset)
        .then(data => {
            PopulateFeed(CreateFeedItem(), data, scrollDate);
            searchOffset += DAILY_FEED_SIZE;
            scrollDate.setDate(scrollDate.getDate() - 1);
        });
}

function CreateFeedItem() {
    let newFeedItem = document.createElement('section');
    newFeedItem.innerHTML = feedItemHTML;
    document.body.appendChild(newFeedItem);

    return newFeedItem;
}

async function Init() {
    feedItemHTML = await utils.LoadComponent("components/feed.html");

    PopulateHomeFeed();

    let trending_data = await giphy.FetchTrending(TRENDING_SIZE, TRENDING_RATING)
    PopulateTrendingSection(trending_data);

    scrollLoading.SetLoadingPromise(LoadNewFeed);
}

Init();