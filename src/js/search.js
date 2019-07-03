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

// Search page loading parameters
let pageLoader;

// pageLoader.LoadPage is wrapped inside a function to guarantee that 'this' context is correct
function LoadPage() {
    return pageLoader.LoadPage();
}

async function Init() {
    scrollLoading.ToggleLoading(true);

    let searchTerm = utils.GetQueryVariable("q");
    if (searchTerm) {
        searchHeaderTitle.textContent = searchTerm;

        pageLoader = new searchResults.SearchPageLoader(searchTerm);
        let firstSearchData = await pageLoader.InitLoader(2000);

        if (pageLoader.firstSearchResultSize >= 1000) {
            searchHeaderResultCount.textContent = firstSearchData.length + "+ GIFs";
        }
        else {
            searchHeaderResultCount.textContent = firstSearchData.length + " GIFs";
        }

        if (pageLoader.firstSearchResultSize >= 4) {
            let tvContentSize = pageLoader.pageSize >= pageLoader.firstSearchResultSize ? pageLoader.firstSearchResultSize : pageLoader.pageSize;
            resultsTV.EnableTV(searchTerm, firstSearchData.slice(0, tvContentSize));
        }

        scrollLoading.SetLoadingPromise(LoadPage);
        scrollLoading.ToggleLoading(false);
    }
}

Init();