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


async function Init(searchTerm, pageTitle) {
    carousel.Init();
    // Initializing trending section
    trending.InitializeTrending();

    let categorySearchTerm = '@' + searchTerm;

    // Initializing page header
    galleryHeaderTitle.textContent = pageTitle;
    galleryHeaderCategory.textContent = categorySearchTerm;

    // Initializing search results
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

exports.Init = Init;