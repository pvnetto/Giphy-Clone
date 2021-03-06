
import InitializeTrending from '../components/trending';
import feedItemHTML from '../../templates/feed.html'
import { initAllCarousels } from '../components/carousel';
import { setScrollLoadingCallback } from '../components/scroll-loader';
import { fetchSearch, populateItemWithGIFData } from '../api/giphy';
import { randomInt } from '../helpers';


// Search parameters
const SEARCH_THEME = 'cats';


// Daily feed parameters
const dailyFeedContainers = document.querySelectorAll('.daily-feed');
const NUM_STARTING_FEEDS = 3;
const DAILY_FEED_SIZE = 10;
let searchOffset = 0;


const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const todayDate = new Date();
let scrollDate = new Date();


const PopulateHomeFeed = async () => {
    let startFetchSize = DAILY_FEED_SIZE * NUM_STARTING_FEEDS;
    let data = await fetchSearch(SEARCH_THEME, startFetchSize, searchOffset);

    for (let i = 0; i < NUM_STARTING_FEEDS; i++) {
        let feedData = data.slice(i * DAILY_FEED_SIZE, i * DAILY_FEED_SIZE + DAILY_FEED_SIZE);
        LoadNewFeedWithData(feedData);
    }
}

const PopulateFeed = (feed, gifList, feedDate) => {
    let items = feed.querySelectorAll('.daily-feed-item');
    items = [...items];

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
        let currentGIF = gifList[i];
        items[i] = populateItemWithGIFData(items[i], currentGIF);

        let title = items[i].querySelector('.daily-feed-item-info h4');
        title.textContent = currentGIF.title;

        // Adding a random color to the current item
        let colorIndex = randomInt(1, 5);
        let colorClass = "card-color-" + colorIndex;
        items[i].classList.add(colorClass);
    }
}

const LoadNewFeedWithData = (data) => {
    let newFeedItem = CreateFeedItem();
    PopulateFeed(newFeedItem, data, scrollDate);
    searchOffset += DAILY_FEED_SIZE;
    scrollDate.setDate(scrollDate.getDate() - 1);

    return newFeedItem;
}

const LoadNewFeed = () => {
    return fetchSearch(SEARCH_THEME, DAILY_FEED_SIZE, searchOffset)
        .then(data => {
            PopulateFeed(CreateFeedItem(), data, scrollDate);
            searchOffset += DAILY_FEED_SIZE;
            scrollDate.setDate(scrollDate.getDate() - 1);
        });
}

const CreateFeedItem = () => {
    let newFeedItem = document.createElement('section');
    newFeedItem.innerHTML = feedItemHTML;
    document.body.appendChild(newFeedItem);

    return newFeedItem;
}

const Init = async () => {
    initAllCarousels();
    await PopulateHomeFeed();
    InitializeTrending();
    setScrollLoadingCallback(LoadNewFeed);
}

Init();