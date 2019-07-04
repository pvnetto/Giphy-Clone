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

// Page loader parameters
let pageLoader;

function LoadPage() {
    return pageLoader.LoadPage();
}

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

    pageLoader = new searchResults.SearchPageLoader(finalSearchTerm, searchStickers);
    let firstSearchData = await pageLoader.InitLoader(pageLoader.pageSize);

    if (pageLoader.firstSearchResultSize >= 4) {
        let tvContentSize = pageLoader.pageSize >= pageLoader.firstSearchResultSize ? pageLoader.firstSearchResultSize : pageLoader.pageSize;
        resultsTV.EnableTV(searchTerm, firstSearchData.slice(0, tvContentSize));
    }

    scrollLoading.SetLoadingPromise(LoadPage);
    scrollLoading.ToggleLoading(false);
}

exports.Init = Init;