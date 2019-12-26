import InitializeTrending from './trending';
import SearchPageLoader from './search_results';
import { initAllCarousels } from './carousel';
import { setScrollLoadingCallback, toggleIsLoading } from './scroll_loading';
import { startTV } from './tv';


// Gallery parameters
const galleryHeaderTitle = document.querySelector('.gallery-header-title');
const galleryHeaderCategory = document.querySelector('.gallery-header-category');

// Page loader parameters
let pageLoader;

const LoadPage = () => {
    return pageLoader.LoadPage();
}

const InitGallery = async (searchTerm, pageTitle, searchStickers = false, extraTerm = "") => {
    initAllCarousels();
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
        startTV(searchTerm, firstSearchData.slice(0, tvContentSize));
    }

    setScrollLoadingCallback(LoadPage);
}

export default InitGallery;