/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/components/carousel.js":
/*!***************************************!*\
  !*** ./src/js/components/carousel.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function InitCarousel(customCarousel) {\r\n    let carouselList = customCarousel.querySelector('.custom-carousel-list');\r\n    let carouselPrev = customCarousel.querySelector('.custom-carousel-arrow-prev');\r\n    let carouselNext = customCarousel.querySelector('.custom-carousel-arrow-next');\r\n\r\n    carouselList.addEventListener('scroll', ToggleTrendingArrows);\r\n    carouselNext.addEventListener('click', ScrollTrendingNext);\r\n    carouselPrev.addEventListener('click', ScrollTrendingPrev);\r\n}\r\n\r\nfunction DisableTrendingArrows() {\r\n    carousel = this.classList.contains('.custom-carousel') ? this : this.closest(\".custom-carousel\");\r\n    carouselPrev = carousel.querySelector('.custom-carousel-arrow-prev');\r\n    carouselNext = carousel.querySelector('.custom-carousel-arrow-next');\r\n\r\n    carouselPrev.classList.remove('active');\r\n    carouselNext.classList.remove('active');\r\n}\r\n\r\nfunction ToggleTrendingArrows() {\r\n    if (this.closest) {\r\n        carousel = this.classList.contains('.custom-carousel') ? this : this.closest(\".custom-carousel\");\r\n        carouselList = carousel.querySelector('.custom-carousel-list');\r\n        carouselPrev = carousel.querySelector('.custom-carousel-arrow-prev');\r\n        carouselNext = carousel.querySelector('.custom-carousel-arrow-next');\r\n\r\n        let max_scroll = carouselList.scrollWidth - carouselList.clientWidth;\r\n\r\n        if (carouselList.scrollLeft > 0) {\r\n            carouselPrev.classList.add('active');\r\n        }\r\n        else {\r\n            carouselPrev.classList.remove('active');\r\n        }\r\n\r\n        if (carouselList.scrollLeft < max_scroll) {\r\n            carouselNext.classList.add('active');\r\n        }\r\n        else {\r\n            carouselNext.classList.remove('active');\r\n        }\r\n    }\r\n}\r\n\r\nfunction ScrollTrendingNext() {\r\n    carousel = this.classList.contains('.custom-carousel') ? this : this.closest(\".custom-carousel\");\r\n    carouselList = carousel.querySelector('.custom-carousel-list');\r\n\r\n    let scrollSize = carouselList.clientWidth;\r\n    carouselList.scrollLeft += scrollSize;\r\n\r\n    ToggleTrendingArrows();\r\n}\r\n\r\nfunction ScrollTrendingPrev() {\r\n    carousel = this.classList.contains('.custom-carousel') ? this : this.closest(\".custom-carousel\");\r\n    carouselList = carousel.querySelector('.custom-carousel-list');\r\n\r\n    let scrollSize = carouselList.clientWidth;\r\n    carouselList.scrollLeft -= scrollSize;\r\n\r\n    ToggleTrendingArrows();\r\n}\r\n\r\nfunction Init() {\r\n    customCarousels = document.querySelectorAll('.custom-carousel');\r\n\r\n    [...customCarousels].forEach(customCarousel => {\r\n        InitCarousel(customCarousel);\r\n    });\r\n}\r\n\r\nexports.Init = Init;\r\nexports.ToggleTrendingArrows = ToggleTrendingArrows;\r\nexports.DisableTrendingArrows = DisableTrendingArrows;\n\n//# sourceURL=webpack:///./src/js/components/carousel.js?");

/***/ }),

/***/ "./src/js/components/giphy_api.js":
/*!****************************************!*\
  !*** ./src/js/components/giphy_api.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const API_KEY = 'YEq174exoFhVhmvEOqMka3RtRh2KKZe8';\r\nconst GIPHY_HOST = 'https://api.giphy.com';\r\nconst SEARCH_GIFS_PATH = '/v1/gifs/search';\r\nconst SEARCH_STICKERS_PATH = '/v1/stickers/search';\r\n\r\n// key, limit (max num of records), offset, rating, format (json)\r\nconst TRENDING_GIFS_PATH = '/v1/gifs/trending';\r\nconst TRENDING_STICKERS_PATH = '/v1/stickers/trending';\r\n\r\nfunction FetchItemByID(searchID) {\r\n    const gifByIdPath = `/v1/gifs/${searchID}`;\r\n    const requestURL = GIPHY_HOST + gifByIdPath + `?api_key=${API_KEY}&gif_id=${searchID}`;\r\n\r\n    return fetch(requestURL)\r\n        .then(res => res.json())\r\n        .then(jsonData => jsonData.data);\r\n}\r\n\r\nfunction FetchSearch(searchTxt, limit, offset, searchStickers = false) {\r\n    let searchPath = searchStickers ? SEARCH_STICKERS_PATH : SEARCH_GIFS_PATH;\r\n    const requestURL = GIPHY_HOST + searchPath + `?api_key=${API_KEY}&q=${searchTxt}&limit=${limit}&offset=${offset}`;\r\n    return fetch(requestURL)\r\n        .then(res => res.json())\r\n        .then(jsonData => jsonData.data);\r\n}\r\n\r\nfunction FetchTrending(trendingSize, trendingRating, fetchStickers = false) {\r\n    let trendingPath = fetchStickers ? TRENDING_STICKERS_PATH : TRENDING_GIFS_PATH;\r\n    const requestURL = GIPHY_HOST + trendingPath + `?api_key=${API_KEY}&limit=${trendingSize}&rating=${trendingRating}`;\r\n\r\n    return fetch(requestURL)\r\n        .then(res => res.json())\r\n        .then(gifs => gifs.data);\r\n}\r\n\r\nasync function AsyncSearch(search_txt, limit, offset) {\r\n    const requestURL = GIPHY_HOST + SEARCH_GIFS_PATH + `?api_key=${API_KEY}&q=${search_txt}&limit=${limit}&offset=${offset}`;\r\n    const searchResponse = await fetch(requestURL);\r\n    const searchJSON = await searchResponse.json();\r\n\r\n    if (searchResponse.status !== 200) {\r\n        throw Error(searchJSON.detail);\r\n    }\r\n\r\n    return await searchJSON.data;\r\n}\r\n\r\nfunction RemoveUnloadedOnFinish() {\r\n    let closestUnloaded = this.closest('.unloaded');\r\n\r\n    if (closestUnloaded != undefined) {\r\n        closestUnloaded.classList.remove('unloaded');\r\n    }\r\n}\r\n\r\nfunction PopulateItemWithData(item, data, isLoadingStickers = false) {\r\n    let img = item.tagName == 'IMG' ? item : item.querySelector('img');\r\n    let a = item.tagName == 'A' ? item : item.querySelector('a');\r\n\r\n    img.onload = RemoveUnloadedOnFinish;\r\n    img.src = data.images.fixed_height.url;\r\n    a.href = `item.html?id=${data.id}`;\r\n\r\n    if (isLoadingStickers) {\r\n        img.classList.add('sticker');\r\n    }\r\n\r\n    return item;\r\n}\r\n\r\nexports.FetchItemByID = FetchItemByID;\r\nexports.FetchSearch = FetchSearch;\r\nexports.FetchTrending = FetchTrending;\r\nexports.AsyncSearch = AsyncSearch;\r\nexports.PopulateItemWithData = PopulateItemWithData;\r\n\n\n//# sourceURL=webpack:///./src/js/components/giphy_api.js?");

/***/ }),

/***/ "./src/js/components/scroll_loading.js":
/*!*********************************************!*\
  !*** ./src/js/components/scroll_loading.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Scroll loading parameters\r\nconst loading_animation = document.querySelector('.loading-animation');\r\nconst page_bottom_offset = 30;\r\nlet isLoading = false;\r\nlet loadingPromise;\r\n\r\nwindow.addEventListener('scroll', LoadOnScroll);\r\n\r\nasync function LoadOnScroll() {\r\n    if (!isLoading && window.innerHeight + window.pageYOffset >= document.body.offsetHeight - page_bottom_offset) {\r\n        ToggleLoading(true);\r\n\r\n        if (loadingPromise != undefined) {\r\n            await loadingPromise();\r\n            ToggleLoading(false);\r\n        }\r\n    }\r\n}\r\n\r\nexports.ToggleLoading = function (val) {\r\n    ToggleLoading(val);\r\n}\r\n\r\nfunction ToggleLoading(val) {\r\n    ToggleLoadingAnimation(val);\r\n    isLoading = val;\r\n}\r\n\r\nfunction ToggleLoadingAnimation(val) {\r\n    if (val) {\r\n        if (loading_animation) {\r\n            loading_animation.classList.add('active');\r\n        }\r\n        else {\r\n            console.log(\"> No loading animation found...\");\r\n        }\r\n    }\r\n    else {\r\n        if (loading_animation) {\r\n            loading_animation.classList.remove('active');\r\n        }\r\n        else {\r\n            console.log(\"> No loading animation found...\");\r\n        }\r\n    }\r\n}\r\n\r\nexports.GetLoadingPromise = function () {\r\n    return loadingPromise;\r\n}\r\n\r\nexports.SetLoadingPromise = function (newPromise) {\r\n    loadingPromise = newPromise;\r\n}\n\n//# sourceURL=webpack:///./src/js/components/scroll_loading.js?");

/***/ }),

/***/ "./src/js/components/trending.js":
/*!***************************************!*\
  !*** ./src/js/components/trending.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Modules\r\nconst giphy = __webpack_require__(/*! ./giphy_api.js */ \"./src/js/components/giphy_api.js\");\r\nconst carousel = __webpack_require__(/*! ./carousel.js */ \"./src/js/components/carousel.js\");\r\nconst utils = __webpack_require__(/*! ./utils.js */ \"./src/js/components/utils.js\");\r\n\r\n// Trending parameters\r\nconst trendingSection = document.querySelector('.trending.custom-carousel');\r\nconst trendingList = trendingSection.querySelector('.custom-carousel-list');\r\n\r\n// Trending parameters\r\nconst TRENDING_RATING = 'G';\r\nconst TRENDING_SIZE = 20;\r\n\r\nlet trendingItemHTML;\r\n\r\nexports.InitializeTrending = async function (fetchStickers = false) {\r\n    let trendingData = await giphy.FetchTrending(TRENDING_SIZE, TRENDING_RATING, fetchStickers)\r\n    await PopulateTrendingSection(trendingData, fetchStickers);\r\n\r\n    trendingSection.addEventListener('mouseover', carousel.ToggleTrendingArrows);\r\n    trendingSection.addEventListener('mouseout', carousel.DisableTrendingArrows);\r\n}\r\n\r\nasync function PopulateTrendingSection(data, isLoadingStickers) {\r\n    if (trendingItemHTML == undefined) {\r\n        trendingItemHTML = await utils.LoadComponent('./components/trending_item.txt');\r\n    }\r\n\r\n    let trendingFragment = document.createDocumentFragment();\r\n    for (let i = 0; i < TRENDING_SIZE; i++) {\r\n        let newItem = document.createElement('div');\r\n        newItem.innerHTML = trendingItemHTML;\r\n        newItem = newItem.querySelector('.custom-carousel-list-item');  // Gets rid of createElement's div to avoid inheriting unwanted properties\r\n        newItem = giphy.PopulateItemWithData(newItem, data[i], isLoadingStickers);\r\n\r\n        let desc = newItem.querySelector('p');\r\n        desc.textContent = data[i].title;\r\n\r\n        trendingFragment.appendChild(newItem);\r\n    }\r\n\r\n    trendingList.appendChild(trendingFragment);\r\n}\n\n//# sourceURL=webpack:///./src/js/components/trending.js?");

/***/ }),

/***/ "./src/js/components/utils.js":
/*!************************************!*\
  !*** ./src/js/components/utils.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports.CapitalizeFirstLetter = function (term) {\r\n    return term.charAt(0).toUpperCase() + term.slice(1);\r\n}\r\n\r\nexports.RandomInt = function (min, max) {\r\n    min = Math.ceil(min);\r\n    max = Math.floor(max);\r\n\r\n    return Math.floor(Math.random() * (max - min)) + min;\r\n}\r\n\r\nexports.LoopIndex = function (idx, max) {\r\n    return idx >= 0 ? idx % max : max - 1;\r\n}\r\n\r\nexports.LoadComponent = function (component_url) {\r\n    return fetch(component_url)\r\n        .then((response) => response.text())\r\n        .then((html) => {\r\n            return html;\r\n        })\r\n        .catch((error) => {\r\n            console.warn(error);\r\n        });\r\n}\r\n\r\nexports.GetQueryVariable = function (variable) {\r\n    // window.location is the URL for the current page\r\n    let query = window.location.search.substring(1);\r\n\r\n    // Splits URL variables into multiple strings\r\n    let vars = query.split(\"&\");\r\n    for (let i = 0; i < vars.length; i++) {\r\n        let pair = vars[i].split(\"=\");\r\n        if (pair[0] === variable) {\r\n            return decodeURIComponent(pair[1].replace(/\\+/g, \"%20\"));\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/js/components/utils.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const SEARCH_THEME = 'cats';\r\n\r\n\r\n// Modules\r\nconst carousel = __webpack_require__(/*! ./components/carousel.js */ \"./src/js/components/carousel.js\");\r\nconst giphy = __webpack_require__(/*! ./components/giphy_api.js */ \"./src/js/components/giphy_api.js\");\r\nconst scrollLoading = __webpack_require__(/*! ./components/scroll_loading.js */ \"./src/js/components/scroll_loading.js\");\r\nconst utils = __webpack_require__(/*! ./components/utils.js */ \"./src/js/components/utils.js\");\r\nconst trending = __webpack_require__(/*! ./components/trending.js */ \"./src/js/components/trending.js\");\r\n\r\n\r\n// Trending parameters\r\nconst TRENDING_RATING = 'G';\r\n\r\n\r\n// Daily feed parameters\r\nconst dailyFeedContainers = document.querySelectorAll('.daily-feed');\r\nconst DAILY_FEED_SIZE = 10;\r\nlet feedItemHTML;\r\nlet searchOffset = 0;\r\n\r\n\r\nconst weekdays = [\"Sunday\", \"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\"];\r\nconst months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];\r\nconst todayDate = new Date();\r\nlet scrollDate = new Date();\r\n\r\n\r\nasync function PopulateHomeFeed() {\r\n    let fetchSize = DAILY_FEED_SIZE * dailyFeedContainers.length;\r\n    let data = await giphy.FetchSearch(SEARCH_THEME, fetchSize, searchOffset);\r\n\r\n    for (let i = 0; i < dailyFeedContainers.length; i++) {\r\n        let currentFeed = dailyFeedContainers[i];\r\n        let feedData = data.slice(i * DAILY_FEED_SIZE, i * DAILY_FEED_SIZE + DAILY_FEED_SIZE);\r\n        PopulateFeed(currentFeed, feedData, scrollDate);\r\n\r\n        scrollDate.setDate(scrollDate.getDate() - 1);\r\n    }\r\n\r\n    searchOffset += data.length;\r\n}\r\n\r\nfunction PopulateFeed(feed, gifList, feedDate) {\r\n    let items = feed.querySelectorAll('.daily-feed-item');\r\n\r\n    let headerTitle = feed.querySelector('.daily-feed-header h2');\r\n    let headerTitleWeekday = headerTitle.querySelector('.weekday');\r\n\r\n    // Populating header info for the feed object\r\n    if (feedDate.getDate() == todayDate.getDate()) {\r\n        headerTitleWeekday.textContent = \"Today\";\r\n    }\r\n    else if (feedDate.getDate() == todayDate.getDate() - 1) {\r\n        headerTitleWeekday.textContent = \"Yesterday\";\r\n    }\r\n    else {\r\n        headerTitleWeekday.textContent = weekdays[feedDate.getDay()];\r\n\r\n        let monthTxt = document.createTextNode(months[feedDate.getMonth()]);\r\n        let dayTxt = document.createTextNode(\" \" + String(feedDate.getDate()).padStart(2, '0'));\r\n        headerTitle.appendChild(monthTxt);\r\n        headerTitle.appendChild(dayTxt);\r\n    }\r\n\r\n    for (let i = 0; i < DAILY_FEED_SIZE; i++) {\r\n        let currentGIF = gifList[i];\r\n        items[i] = giphy.PopulateItemWithData(items[i], currentGIF);\r\n\r\n        let title = items[i].querySelector('.daily-feed-item-info h4');\r\n        title.textContent = currentGIF.title;\r\n\r\n        // Adding a random color to the current item\r\n        let colorIndex = utils.RandomInt(1, 5);\r\n        let colorClass = \"card-color-\" + colorIndex;\r\n        items[i].classList.add(colorClass);\r\n    }\r\n}\r\n\r\nfunction LoadNewFeed() {\r\n    return giphy.FetchSearch(SEARCH_THEME, DAILY_FEED_SIZE, searchOffset)\r\n        .then(data => {\r\n            PopulateFeed(CreateFeedItem(), data, scrollDate);\r\n            searchOffset += DAILY_FEED_SIZE;\r\n            scrollDate.setDate(scrollDate.getDate() - 1);\r\n        });\r\n}\r\n\r\nfunction CreateFeedItem() {\r\n    let newFeedItem = document.createElement('section');\r\n    newFeedItem.innerHTML = feedItemHTML;\r\n    document.body.appendChild(newFeedItem);\r\n\r\n    return newFeedItem;\r\n}\r\n\r\nasync function Init() {\r\n    carousel.Init();\r\n    feedItemHTML = await utils.LoadComponent(\"components/feed.html\");\r\n\r\n    PopulateHomeFeed();\r\n\r\n    trending.InitializeTrending();\r\n    scrollLoading.SetLoadingPromise(LoadNewFeed);\r\n}\r\n\r\nInit();\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });