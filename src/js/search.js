import { setScrollLoadingCallback } from './components/scroll_loading';
import SearchPageLoader from './components/search_results';
import { startTV } from './components/tv';
import { getQueryVariable } from './components/helpers';


// Page header objects
const searchHeader = document.querySelector('.search-header');
const searchHeaderTitle = searchHeader.querySelector('h1');
const searchHeaderResultCount = searchHeader.querySelector('p');


// Search page loading parameters
let pageLoader;


// pageLoader.LoadPage is wrapped inside a function to guarantee that 'this' context is correct
const loadPage = () => {
    return pageLoader.LoadPage();
}

const initSearchPage = async () => {
    let searchTerm = getQueryVariable("q");
    if (searchTerm) {
        searchHeaderTitle.textContent = searchTerm;

        pageLoader = new SearchPageLoader(searchTerm);
        let firstSearchData = await pageLoader.InitLoader(2000);

        if (pageLoader.firstSearchResultSize >= 1000) {
            searchHeaderResultCount.textContent = firstSearchData.length + "+ GIFs";
        }
        else {
            searchHeaderResultCount.textContent = firstSearchData.length + " GIFs";
        }

        if (pageLoader.firstSearchResultSize >= 4) {
            let tvContentSize = pageLoader.pageSize >= pageLoader.firstSearchResultSize ? pageLoader.firstSearchResultSize : pageLoader.pageSize;
            startTV(searchTerm, firstSearchData.slice(0, tvContentSize));
        }

        setScrollLoadingCallback(loadPage);
    }
}

initSearchPage();