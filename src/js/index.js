const SEARCH_THEME = 'cats';


// Modules
const carousel = require('./components/carousel.js');
const giphy = require('./components/giphy_api.js');
const scrollLoading = require('./components/scroll_loading.js');
const utils = require('./components/utils.js');
const trending = require('./components/trending.js');


// Trending parameters
const TRENDING_RATING = 'G';


// Daily feed parameters
const dailyFeedContainers = document.querySelectorAll('.daily-feed');
const DAILY_FEED_SIZE = 10;
let feedItemHTML;
let searchOffset = 0;


const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const todayDate = new Date();
let scrollDate = new Date();


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
        let colorIndex = utils.RandomInt(1, 5);
        let colorClass = "card-color-" + colorIndex;
        items[i].classList.add(colorClass);
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
    carousel.Init();
    feedItemHTML = await utils.LoadComponent("components/feed.html");

    PopulateHomeFeed();

    trending.InitializeTrending();
    scrollLoading.SetLoadingPromise(LoadNewFeed);
}

Init();