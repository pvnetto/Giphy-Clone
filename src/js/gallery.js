// Modules
const giphy = require('./components/giphy_api.js');
const scrollLoading = require('./components/scroll_loading.js');
const utils = require('./components/utils.js');
const trending = require('./components/trending.js');
const resultsTV = require('./components/results_tv.js');
const searchResults = require('./components/search_results.js');
const carousel = require('./components/carousel.js');

// Trending parameters
const TRENDING_RATING = 'G';


async function Init() {
    carousel.Init();
    // Initializing trending section
    trending.InitializeTrending();

    // Initializing search results
    let searchTerm = utils.GetQueryVariable('category');
    let categorySearchTerm = '@' + searchTerm;

    let firstSearchData = await giphy.FetchSearch(categorySearchTerm, 99999, searchResults.GetSearchOffset());
    let initialOffset = searchResults.GetPageSize() >= firstSearchData.length ? firstSearchData.length : searchResults.GetPageSize();

    searchResults.SetSearchTerm(categorySearchTerm);
    searchResults.AddSearchOffset(initialOffset);
    searchResults.PopulatePage(firstSearchData);

    // Enabling results TV
    if (firstSearchData.length >= 4) {
        resultsTV.EnableTV(searchTerm, firstSearchData.slice(0, initialOffset));
    }

    scrollLoading.SetLoadingPromise(searchResults.LoadPage);
    scrollLoading.ToggleLoading(false);
}

Init();