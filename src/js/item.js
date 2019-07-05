// Modules
const giphy = require('./components/giphy_api.js');
const searchResults = require('./components/search_results.js');
const utils = require('./components/utils.js');
const scrollLoading = require('./components/scroll_loading.js');

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


function SetPageData(itemData) {
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

function LoadPage() {
    return pageLoader.LoadPage();
}

async function Init(searchStickers = false) {

    let searchID = utils.GetQueryVariable('id');

    if (searchID != undefined) {
        let itemData = await giphy.FetchItemByID(searchID);
        SetPageData(itemData);

        let splitTitle = itemData.title.split(' ');
        let relatedSearchTerm = splitTitle.length > 1 ? splitTitle[1] : splitTitle[0];

        pageLoader = new searchResults.SearchPageLoader(relatedSearchTerm, searchStickers);
        await pageLoader.InitLoader(pageLoader.pageSize);

        scrollLoading.SetLoadingPromise(LoadPage);
        scrollLoading.ToggleLoading(false);
    }
}

Init();
