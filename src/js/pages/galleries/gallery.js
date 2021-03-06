import InitializeTrending from '../../components/trending';
import SearchPageLoader from '../../components/search-loader';
import { initAllCarousels } from '../../components/carousel';
import { setScrollLoadingCallback, toggleIsLoading } from '../../components/scroll-loader';
import { startTV } from '../../components/tv';


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