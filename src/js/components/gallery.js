import InitializeTrending from './trending.js';
import SearchPageLoader from './search_results.js';

// Modules
const giphy = require('./giphy_api.js');
const scrollLoading = require('./scroll_loading.js');
const resultsTV = require('./results_tv.js');
const carousel = require('./carousel.js');

// Gallery parameters
const galleryHeaderTitle = document.querySelector('.gallery-header-title');
const galleryHeaderCategory = document.querySelector('.gallery-header-category');

// Page loader parameters
let pageLoader;

const LoadPage = () => {
    return pageLoader.LoadPage();
}

const InitGallery = async (searchTerm, pageTitle, searchStickers = false, extraTerm = "") => {
    carousel.Init();
    // Initializing trending section
    InitializeTrending(searchStickers);

    let channelSearchTerm = '@' + searchTerm;

    // Initializing page header
    galleryHeaderTitle.textContent = pageTitle;
    galleryHeaderCategory.textContent = channelSearchTerm;

    // Initializing search results
    let finalSearchTerm = channelSearchTerm;
    finalSearchTerm = extraTerm != undefined && extraTerm != "" ? finalSearchTerm + " " + extraTerm : finalSearchTerm;

    pageLoader = new SearchPageLoader(finalSearchTerm, searchStickers);
    let firstSearchData = await pageLoader.InitLoader(pageLoader.pageSize);

    if (pageLoader.firstSearchResultSize >= 4) {
        let tvContentSize = pageLoader.pageSize >= pageLoader.firstSearchResultSize ? pageLoader.firstSearchResultSize : pageLoader.pageSize;
        resultsTV.EnableTV(searchTerm, firstSearchData.slice(0, tvContentSize));
    }

    scrollLoading.SetLoadingPromise(LoadPage);
    scrollLoading.ToggleLoading(false);
}

export default InitGallery;