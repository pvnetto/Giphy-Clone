import SearchPageLoader from './components/search_results';
import { setScrollLoadingCallback } from './components/scroll_loading';
import { fetchGIFByID } from './components/giphy';
import { getQueryVariable } from './components/helpers';

// Gallery parameters
const galleryHeaderTitle = document.querySelector('.gallery-header-title');
const galleryHeaderCategory = document.querySelector('.gallery-header-category');
const itemImg = document.querySelector('.item-container-img');
const itemSources = document.querySelectorAll('.item-container-src');

const sidenavUser = document.querySelector('.item-sidenav-user');
const usernameLink = sidenavUser.querySelector('a');
const userAvatarImg = sidenavUser.querySelector('img');

// Search Loading parameters
let pageLoader;


const setPageData = (itemData) => {
    itemImg.src = itemData.images.fixed_height.url;

    // Initializing page header
    galleryHeaderTitle.textContent = itemData.title;
    galleryHeaderCategory.textContent = itemData.import_datetime;

    itemSources.forEach(itemSource => {
        itemSource.textContent = itemData.source;
        itemSource.href = itemData.source;
    });

    if (itemData.username != "") {
        sidenavUser.classList.add('active');
        usernameLink.textContent = "@" + itemData.username;
        userAvatarImg.src = itemData.user.avatar_url;
    }
}

const loadPage = () => {
    return pageLoader.LoadPage();
}

async function initItemPage(searchStickers = false) {
    let searchID = getQueryVariable('id');
    if (!searchID) return;

    let itemData = await fetchGIFByID(searchID);
    setPageData(itemData);

    let splitTitle = itemData.title.split(' ');
    let relatedSearchTerm = splitTitle.length > 1 ? splitTitle[1] : splitTitle[0];

    pageLoader = new SearchPageLoader(relatedSearchTerm, searchStickers);
    await pageLoader.InitLoader(pageLoader.pageSize);

    setScrollLoadingCallback(loadPage);
}

initItemPage();