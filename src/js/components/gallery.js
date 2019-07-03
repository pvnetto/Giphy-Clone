// Modules
const giphy = require('./giphy_api.js');
const scrollLoading = require('./scroll_loading.js');
const trending = require('./trending.js');
const resultsTV = require('./results_tv.js');
const searchResults = require('./search_results.js');
const carousel = require('./carousel.js');

// Gallery parameters
const galleryHeaderTitle = document.querySelector('.gallery-header-title');
const galleryHeaderCategory = document.querySelector('.gallery-header-category');


async function Init(searchTerm, pageTitle, searchStickers = false, extraTerm = "") {
    carousel.Init();
    // Initializing trending section
    trending.InitializeTrending(searchStickers);

    let channelSearchTerm = '@' + searchTerm;

    // Initializing page header
    galleryHeaderTitle.textContent = pageTitle;
    galleryHeaderCategory.textContent = channelSearchTerm;

    // Initializing search results
    let finalSearchTerm = channelSearchTerm;
    finalSearchTerm = extraTerm != undefined && extraTerm != "" ? finalSearchTerm + " " + extraTerm : finalSearchTerm;

    let firstSearchData = await giphy.FetchSearch(finalSearchTerm, 99999, searchResults.GetSearchOffset(), searchStickers);
    let initialOffset = searchResults.GetPageSize() >= firstSearchData.length ? firstSearchData.length : searchResults.GetPageSize();

    searchResults.SetSearchTerm(finalSearchTerm);
    searchResults.AddSearchOffset(initialOffset);
    searchResults.PopulatePage(firstSearchData, searchStickers);

    // Enabling results TV
    if (firstSearchData.length >= 4) {
        resultsTV.EnableTV(searchTerm, firstSearchData.slice(0, initialOffset), searchStickers);
    }

    scrollLoading.SetLoadingPromise(searchResults.LoadPage);
    scrollLoading.ToggleLoading(false);
}

exports.Init = Init;