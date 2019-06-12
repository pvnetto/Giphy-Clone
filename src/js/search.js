// Modules
const giphy = require('./components/giphy_api.js');
const scrollLoading = require('./components/scroll_loading.js');
const utils = require('./components/utils.js');
const resultsTV = require('./components/results_tv.js');
const searchResults = require('./components/search_results.js');


// Page header objects
const searchHeader = document.querySelector('.search-header');
const searchHeaderTitle = searchHeader.querySelector('h1');
const searchHeaderResultCount = searchHeader.querySelector('p');


async function Init() {
    scrollLoading.ToggleLoading(true);

    let searchTerm = utils.GetQueryVariable("q");
    if (searchTerm) {
        searchResults.SetSearchTerm(searchTerm);

        searchHeaderTitle.textContent = searchTerm;

        let firstSearchData = await giphy.FetchSearch(searchTerm, 99999, searchResults.GetSearchOffset());

        if (firstSearchData.length >= 1000) {
            searchHeaderResultCount.textContent = firstSearchData.length + "+ GIFs";
        }
        else {
            searchHeaderResultCount.textContent = firstSearchData.length + " GIFs";
        }

        // Initializing search offset and TV data
        let initialOffset = searchResults.GetPageSize() >= firstSearchData.length ? firstSearchData.length : searchResults.GetPageSize();
        searchResults.AddSearchOffset(initialOffset);
        searchResults.PopulatePage(firstSearchData);

        if (firstSearchData.length >= 4) {
            resultsTV.EnableTV(searchTerm, firstSearchData.slice(0, initialOffset));
        }

        scrollLoading.SetLoadingPromise(searchResults.LoadPage);
        scrollLoading.ToggleLoading(false);
    }
}

Init();