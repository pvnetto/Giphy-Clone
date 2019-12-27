import { setScrollLoadingCallback } from '../components/scroll-loader';
import SearchPageLoader from '../components/search-loader';
import { startTV } from '../components/tv';
import { getQueryVariable } from '../helpers';


// Page header objects
const searchHeader = document.querySelector('.search-header');
const searchHeaderTitle = searchHeader.querySelector('h1');
const searchHeaderResultCount = searchHeader.querySelector('p');

// DOM search options
const gifLink = document.querySelector('#gif-link');
const gifBtn = gifLink.querySelector('button');

const stickerLink = document.querySelector('#sticker-link');
const stickerBtn = stickerLink.querySelector('button');


// Search parameters
const searchTerm = getQueryVariable("q") || ' ';
const searchType = getQueryVariable('type') || 'gifs';
const isLoadingStickers = searchType === 'stickers';

gifLink.href = `?q=${searchTerm}&type=gifs`;
stickerLink.href = `?q=${searchTerm}&type=stickers`;
searchHeaderTitle.textContent = searchTerm;

// Search page loading parameters
let pageLoader;

// pageLoader.LoadPage is wrapped inside a function to guarantee that 'this' context is correct
const loadPage = () => {
    return pageLoader.LoadPage();
}

const toggleActiveSearchType = () => {
    if (searchType === 'gifs') {
        gifBtn.classList.add('active');
        stickerBtn.classList.remove('active');
    }
    else {
        gifBtn.classList.remove('active');
        stickerBtn.classList.add('active');
    }
}

const initSearchPage = async () => {
    if (searchTerm) {
        pageLoader = new SearchPageLoader(searchTerm, isLoadingStickers);
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
toggleActiveSearchType();