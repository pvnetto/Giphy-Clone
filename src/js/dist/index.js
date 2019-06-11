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

/***/ "./src/js/giphy_api.js":
/*!*****************************!*\
  !*** ./src/js/giphy_api.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const API_KEY = 'YEq174exoFhVhmvEOqMka3RtRh2KKZe8';\r\nconst giphy_host = 'https://api.giphy.com';\r\nconst SEARCH_PATH = '/v1/gifs/search';\r\n\r\n// key, limit (max num of records), offset, rating, format (json)\r\nconst TRENDING_PATH = '/v1/gifs/trending';\r\n\r\nexports.FetchSearch = function (search_txt, limit, offset) {\r\n    const requestURL = giphy_host + SEARCH_PATH + `?api_key=${API_KEY}&q=${search_txt}&limit=${limit}&offset=${offset}`;\r\n    return fetch(requestURL)\r\n        .then(res => res.json())\r\n        .then(jsonData => jsonData.data);\r\n}\r\n\r\nexports.FetchTrending = function (trendingSize, trendingRating) {\r\n    const requestURL = giphy_host + TRENDING_PATH + `?api_key=${API_KEY}&limit=${trendingSize}&rating=${trendingRating}`;\r\n\r\n    return fetch(requestURL)\r\n        .then(res => res.json())\r\n        .then(gifs => gifs.data);\r\n}\r\n\r\nexports.AsyncSearch = async function (search_txt, limit, offset) {\r\n    const requestURL = giphy_host + SEARCH_PATH + `?api_key=${API_KEY}&q=${search_txt}&limit=${limit}&offset=${offset}`;\r\n    const searchResponse = await fetch(requestURL);\r\n    const searchJSON = await searchResponse.json();\r\n\r\n    if (searchResponse.status !== 200) {\r\n        throw Error(searchJSON.detail);\r\n    }\r\n\r\n    return await searchJSON.data;\r\n}\n\n//# sourceURL=webpack:///./src/js/giphy_api.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const SEARCH_THEME = 'cats';\r\n\r\n\r\n// Modules\r\nconst giphy = __webpack_require__(/*! ./giphy_api.js */ \"./src/js/giphy_api.js\");\r\nconst scrollLoading = __webpack_require__(/*! ./scroll_loading.js */ \"./src/js/scroll_loading.js\");\r\nconst utils = __webpack_require__(/*! ./utils.js */ \"./src/js/utils.js\");\r\n\r\n// Trending parameters\r\nconst trendingSection = document.querySelector('.trending-carousel');\r\nconst trendingList = document.querySelector('.trending-carousel-list');\r\nconst trendingItems = document.querySelectorAll('.trending-carousel-item');\r\nconst trendingPrev = document.querySelector('.trending-carousel-arrow-prev');\r\nconst trendingNext = document.querySelector('.trending-carousel-arrow-next');\r\n\r\nconst TRENDING_SIZE = trendingItems.length;\r\nconst TRENDING_RATING = 'G';\r\n\r\n\r\ntrendingSection.addEventListener('mouseover', () => ToggleTrendingArrows(true));\r\ntrendingSection.addEventListener('mouseout', () => ToggleTrendingArrows(false));\r\n\r\ntrendingList.addEventListener('scroll', () => ToggleTrendingArrows(true));\r\n\r\ntrendingNext.addEventListener('click', () => ScrollTrendingHorizontal(true));\r\ntrendingPrev.addEventListener('click', () => ScrollTrendingHorizontal(false));\r\n\r\n\r\n// Daily feed parameters\r\nconst dailyFeedContainers = document.querySelectorAll('.daily-feed');\r\nconst DAILY_FEED_SIZE = 10;\r\nlet feedItemHTML;\r\nlet searchOffset = 0;\r\n\r\n\r\nconst weekdays = [\"Sunday\", \"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\"];\r\nconst months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];\r\nconst todayDate = new Date();\r\nlet scrollDate = new Date();\r\n\r\n\r\nfunction PopulateTrendingSection(data) {\r\n    for (let i = 0; i < trendingItems.length; i++) {\r\n        let img = trendingItems[i].querySelector('img');\r\n        let desc = trendingItems[i].querySelector('p');\r\n        img.src = data[i].images.fixed_height.url;\r\n        desc.textContent = data[i].title;\r\n    }\r\n}\r\n\r\nfunction ToggleTrendingArrows(on) {\r\n    if (on) {\r\n        let max_scroll = trendingList.scrollWidth - trendingList.clientWidth;\r\n\r\n        if (trendingList.scrollLeft > 0) {\r\n            trendingPrev.classList.add('active');\r\n        }\r\n        else {\r\n            trendingPrev.classList.remove('active');\r\n        }\r\n\r\n        if (trendingList.scrollLeft < max_scroll) {\r\n            trendingNext.classList.add('active');\r\n        }\r\n        else {\r\n            trendingNext.classList.remove('active');\r\n        }\r\n    }\r\n    else {\r\n        trendingPrev.classList.remove('active');\r\n        trendingNext.classList.remove('active');\r\n    }\r\n}\r\n\r\nfunction ScrollTrendingHorizontal(add) {\r\n    let scrollSize = trendingList.clientWidth;\r\n\r\n    if (add) {\r\n        trendingList.scrollLeft += scrollSize;\r\n    }\r\n    else {\r\n        trendingList.scrollLeft -= scrollSize;\r\n    }\r\n\r\n    ToggleTrendingArrows(true);\r\n}\r\n\r\nasync function PopulateHomeFeed() {\r\n    let fetchSize = DAILY_FEED_SIZE * dailyFeedContainers.length;\r\n    let data = await giphy.FetchSearch(SEARCH_THEME, fetchSize, searchOffset);\r\n\r\n    for (let i = 0; i < dailyFeedContainers.length; i++) {\r\n        let currentFeed = dailyFeedContainers[i];\r\n        let feedData = data.slice(i * DAILY_FEED_SIZE, i * DAILY_FEED_SIZE + DAILY_FEED_SIZE);\r\n        PopulateFeed(currentFeed, feedData, scrollDate);\r\n\r\n        scrollDate.setDate(scrollDate.getDate() - 1);\r\n    }\r\n\r\n    searchOffset += data.length;\r\n}\r\n\r\nfunction PopulateFeed(feed, gifList, feedDate) {\r\n    let items = feed.querySelectorAll('.daily-feed-item');\r\n\r\n    let headerTitle = feed.querySelector('.daily-feed-header h2');\r\n    let headerTitleWeekday = headerTitle.querySelector('.weekday');\r\n\r\n    // Populating header info for the feed object\r\n    if (feedDate.getDate() == todayDate.getDate()) {\r\n        headerTitleWeekday.textContent = \"Today\";\r\n    }\r\n    else if (feedDate.getDate() == todayDate.getDate() - 1) {\r\n        headerTitleWeekday.textContent = \"Yesterday\";\r\n    }\r\n    else {\r\n        headerTitleWeekday.textContent = weekdays[feedDate.getDay()];\r\n\r\n        let monthTxt = document.createTextNode(months[feedDate.getMonth()]);\r\n        let dayTxt = document.createTextNode(\" \" + String(feedDate.getDate()).padStart(2, '0'));\r\n        headerTitle.appendChild(monthTxt);\r\n        headerTitle.appendChild(dayTxt);\r\n    }\r\n\r\n    for (let i = 0; i < DAILY_FEED_SIZE; i++) {\r\n        let img = items[i].querySelector('img');\r\n        let title = items[i].querySelector('.daily-feed-item-info h4');\r\n        let currentGif = gifList[i];\r\n\r\n        img.src = currentGif.images.fixed_height.url;\r\n        title.textContent = currentGif.title;\r\n        items[i].href = `item?id=${currentGif.id}`;\r\n\r\n        // Adding a random color to the current item\r\n        color_index = utils.RandomInt(1, 5);\r\n        color_class = \"card-color-\" + color_index;\r\n        items[i].classList.add(color_class);\r\n    }\r\n}\r\n\r\nfunction LoadNewFeed() {\r\n    return giphy.FetchSearch(SEARCH_THEME, DAILY_FEED_SIZE, searchOffset)\r\n        .then(data => {\r\n            PopulateFeed(CreateFeedItem(), data, scrollDate);\r\n            searchOffset += DAILY_FEED_SIZE;\r\n            scrollDate.setDate(scrollDate.getDate() - 1);\r\n        });\r\n}\r\n\r\nfunction CreateFeedItem() {\r\n    let newFeedItem = document.createElement('section');\r\n    newFeedItem.innerHTML = feedItemHTML;\r\n    document.body.appendChild(newFeedItem);\r\n\r\n    return newFeedItem;\r\n}\r\n\r\nasync function Init() {\r\n    feedItemHTML = await utils.LoadComponent(\"components/feed.html\");\r\n\r\n    PopulateHomeFeed();\r\n\r\n    let trending_data = await giphy.FetchTrending(TRENDING_SIZE, TRENDING_RATING)\r\n    PopulateTrendingSection(trending_data);\r\n\r\n    scrollLoading.SetLoadingPromise(LoadNewFeed);\r\n}\r\n\r\nInit();\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/scroll_loading.js":
/*!**********************************!*\
  !*** ./src/js/scroll_loading.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Scroll loading parameters\r\nconst loading_animation = document.querySelector('.loading-animation');\r\nconst page_bottom_offset = 30;\r\nlet isLoading = false;\r\nlet loadingPromise;\r\n\r\nwindow.addEventListener('scroll', LoadOnScroll);\r\n\r\nasync function LoadOnScroll() {\r\n    if (!isLoading && window.innerHeight + window.pageYOffset >= document.body.offsetHeight - page_bottom_offset) {\r\n        ToggleLoading(true);\r\n\r\n        if (loadingPromise != undefined) {\r\n            await loadingPromise();\r\n            ToggleLoading(false);\r\n        }\r\n    }\r\n}\r\n\r\nexports.ToggleLoading = function (val) {\r\n    ToggleLoading(val);\r\n}\r\n\r\nfunction ToggleLoading(val) {\r\n    ToggleLoadingAnimation(val);\r\n    isLoading = val;\r\n}\r\n\r\nfunction ToggleLoadingAnimation(val) {\r\n    if (val) {\r\n        if (loading_animation) {\r\n            loading_animation.classList.add('active');\r\n        }\r\n        else {\r\n            console.log(\"> No loading animation found...\");\r\n        }\r\n    }\r\n    else {\r\n        if (loading_animation) {\r\n            loading_animation.classList.remove('active');\r\n        }\r\n        else {\r\n            console.log(\"> No loading animation found...\");\r\n        }\r\n    }\r\n}\r\n\r\nexports.GetLoadingPromise = function () {\r\n    return loadingPromise;\r\n}\r\n\r\nexports.SetLoadingPromise = function (newPromise) {\r\n    loadingPromise = newPromise;\r\n}\n\n//# sourceURL=webpack:///./src/js/scroll_loading.js?");

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports.CapitalizeFirstLetter = function (term) {\r\n    return term.charAt(0).toUpperCase() + term.slice(1);\r\n}\r\n\r\nexports.RandomInt = function (min, max) {\r\n    min = Math.ceil(min);\r\n    max = Math.floor(max);\r\n\r\n    return Math.floor(Math.random() * (max - min)) + min;\r\n}\r\n\r\nexports.LoopIndex = function (idx, max) {\r\n    return idx >= 0 ? idx % max : max - 1;\r\n}\r\n\r\nexports.LoadComponent = function (component_url) {\r\n    return fetch(component_url)\r\n        .then((response) => response.text())\r\n        .then((html) => {\r\n            return html;\r\n        })\r\n        .catch((error) => {\r\n            console.warn(error);\r\n        });\r\n}\n\n//# sourceURL=webpack:///./src/js/utils.js?");

/***/ })

/******/ });