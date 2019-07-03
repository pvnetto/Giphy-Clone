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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/item.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/components/giphy_api.js":
/*!****************************************!*\
  !*** ./src/js/components/giphy_api.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const API_KEY = 'YEq174exoFhVhmvEOqMka3RtRh2KKZe8';\r\nconst GIPHY_HOST = 'https://api.giphy.com';\r\nconst SEARCH_GIFS_PATH = '/v1/gifs/search';\r\nconst SEARCH_STICKERS_PATH = '/v1/stickers/search';\r\n\r\n// key, limit (max num of records), offset, rating, format (json)\r\nconst TRENDING_GIFS_PATH = '/v1/gifs/trending';\r\nconst TRENDING_STICKERS_PATH = '/v1/stickers/trending';\r\n\r\nfunction FetchItemByID(searchID) {\r\n    const gifByIdPath = `/v1/gifs/${searchID}`;\r\n    const requestURL = GIPHY_HOST + gifByIdPath + `?api_key=${API_KEY}&gif_id=${searchID}`;\r\n\r\n    return fetch(requestURL)\r\n        .then(res => res.json())\r\n        .then(jsonData => jsonData.data);\r\n}\r\n\r\nfunction FetchSearch(searchTxt, limit, offset, searchStickers = false) {\r\n    let searchPath = searchStickers ? SEARCH_STICKERS_PATH : SEARCH_GIFS_PATH;\r\n    const requestURL = GIPHY_HOST + searchPath + `?api_key=${API_KEY}&q=${searchTxt}&limit=${limit}&offset=${offset}`;\r\n    return fetch(requestURL)\r\n        .then(res => res.json())\r\n        .then(jsonData => jsonData.data);\r\n}\r\n\r\nfunction FetchTrending(trendingSize, trendingRating, fetchStickers = false) {\r\n    let trendingPath = fetchStickers ? TRENDING_STICKERS_PATH : TRENDING_GIFS_PATH;\r\n    const requestURL = GIPHY_HOST + trendingPath + `?api_key=${API_KEY}&limit=${trendingSize}&rating=${trendingRating}`;\r\n\r\n    return fetch(requestURL)\r\n        .then(res => res.json())\r\n        .then(gifs => gifs.data);\r\n}\r\n\r\nasync function AsyncSearch(search_txt, limit, offset) {\r\n    const requestURL = GIPHY_HOST + SEARCH_GIFS_PATH + `?api_key=${API_KEY}&q=${search_txt}&limit=${limit}&offset=${offset}`;\r\n    const searchResponse = await fetch(requestURL);\r\n    const searchJSON = await searchResponse.json();\r\n\r\n    if (searchResponse.status !== 200) {\r\n        throw Error(searchJSON.detail);\r\n    }\r\n\r\n    return await searchJSON.data;\r\n}\r\n\r\nexports.FetchItemByID = FetchItemByID;\r\nexports.FetchSearch = FetchSearch;\r\nexports.FetchTrending = FetchTrending;\r\nexports.AsyncSearch = AsyncSearch;\r\n\n\n//# sourceURL=webpack:///./src/js/components/giphy_api.js?");

/***/ }),

/***/ "./src/js/components/scroll_loading.js":
/*!*********************************************!*\
  !*** ./src/js/components/scroll_loading.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Scroll loading parameters\r\nconst loading_animation = document.querySelector('.loading-animation');\r\nconst page_bottom_offset = 30;\r\nlet isLoading = false;\r\nlet loadingPromise;\r\n\r\nwindow.addEventListener('scroll', LoadOnScroll);\r\n\r\nasync function LoadOnScroll() {\r\n    if (!isLoading && window.innerHeight + window.pageYOffset >= document.body.offsetHeight - page_bottom_offset) {\r\n        ToggleLoading(true);\r\n\r\n        if (loadingPromise != undefined) {\r\n            await loadingPromise();\r\n            ToggleLoading(false);\r\n        }\r\n    }\r\n}\r\n\r\nexports.ToggleLoading = function (val) {\r\n    ToggleLoading(val);\r\n}\r\n\r\nfunction ToggleLoading(val) {\r\n    ToggleLoadingAnimation(val);\r\n    isLoading = val;\r\n}\r\n\r\nfunction ToggleLoadingAnimation(val) {\r\n    if (val) {\r\n        if (loading_animation) {\r\n            loading_animation.classList.add('active');\r\n        }\r\n        else {\r\n            console.log(\"> No loading animation found...\");\r\n        }\r\n    }\r\n    else {\r\n        if (loading_animation) {\r\n            loading_animation.classList.remove('active');\r\n        }\r\n        else {\r\n            console.log(\"> No loading animation found...\");\r\n        }\r\n    }\r\n}\r\n\r\nexports.GetLoadingPromise = function () {\r\n    return loadingPromise;\r\n}\r\n\r\nexports.SetLoadingPromise = function (newPromise) {\r\n    loadingPromise = newPromise;\r\n}\n\n//# sourceURL=webpack:///./src/js/components/scroll_loading.js?");

/***/ }),

/***/ "./src/js/components/search_results.js":
/*!*********************************************!*\
  !*** ./src/js/components/search_results.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Displays search results in columns of the same size\r\n\r\n// Modules\r\nconst giphy = __webpack_require__(/*! ./giphy_api.js */ \"./src/js/components/giphy_api.js\");\r\nconst utils = __webpack_require__(/*! ./utils.js */ \"./src/js/components/utils.js\");\r\n\r\n\r\nclass SearchPageLoader {\r\n\r\n    constructor(searchTerm, isLoadingStickers = false, startOffset = 0, pageSize = 100) {\r\n        this.searchTerm = searchTerm;\r\n        this.searchOffset = startOffset;\r\n        this.isLoadingStickers = isLoadingStickers;\r\n        this.pageSize = pageSize;\r\n        this.searchItemHTML = undefined;\r\n    }\r\n\r\n    async InitLoader(firstSearchSize) {\r\n        this.searchResultsCols = document.querySelectorAll('.search-results-col');\r\n        this.colHeights = [...this.searchResultsCols].map(_ => 0);                  // Creates an element in the array for each column\r\n\r\n        let firstSearchData = await giphy.FetchSearch(this.searchTerm, firstSearchSize, this.searchOffset, this.isLoadingStickers);\r\n\r\n        this.firstSearchResultSize = firstSearchData.length;\r\n\r\n        let firstSearchOffset = this.pageSize >= firstSearchData.length ? firstSearchData.length : this.pageSize;\r\n        this.searchOffset += firstSearchOffset;\r\n\r\n        await this.PopulatePage(firstSearchData);\r\n\r\n        return firstSearchData;\r\n    }\r\n\r\n    LoadPage() {\r\n        return giphy.FetchSearch(this.searchTerm, this.pageSize, this.searchOffset, this.isLoadingStickers)\r\n            .then(gifData => {\r\n                this.PopulatePage(gifData);\r\n                this.searchOffset += this.pageSize >= gifData.length ? gifData.length : this.pageSize;\r\n            });\r\n    }\r\n\r\n    async PopulatePage(imgData) {\r\n        if (this.searchItemHTML == undefined) {\r\n            this.searchItemHTML = await utils.LoadComponent(\"./components/item.html\");\r\n        }\r\n\r\n        for (let i = 0; i < this.pageSize && i < imgData.length; i++) {\r\n            let smallestIdx;\r\n            let smallestCol;\r\n            let lowestHeight = Infinity;\r\n\r\n            for (let j = 0; j < this.searchResultsCols.length; j++) {\r\n                let currentHeight = this.colHeights[j];\r\n\r\n                if (currentHeight < lowestHeight) {\r\n                    lowestHeight = currentHeight;\r\n                    smallestIdx = j;\r\n                    smallestCol = this.searchResultsCols[j];\r\n                }\r\n            }\r\n\r\n            let newItem = document.createElement('div');\r\n            newItem.innerHTML = this.searchItemHTML;\r\n\r\n            let img = newItem.querySelector('img');\r\n            img.src = imgData[i].images.fixed_height.url;\r\n\r\n            if (this.isLoadingStickers) {\r\n                img.classList.add('sticker');\r\n            }\r\n\r\n            this.colHeights[smallestIdx] += parseInt(imgData[i].images.original.height);\r\n            smallestCol.appendChild(newItem);\r\n        }\r\n    }\r\n\r\n}\r\n\r\nexports.SearchPageLoader = SearchPageLoader;\r\n\r\n// exports.SetSearchTerm = function (term) {\r\n//     searchTerm = term;\r\n// }\r\n\r\n// exports.GetPageSize = function () {\r\n//     return pageSize;\r\n// }\r\n\r\n// exports.SetPageSize = function (newSize) {\r\n//     pageSize = newSize;\r\n// }\r\n\r\n// exports.GetSearchOffset = function () {\r\n//     return searchOffset;\r\n// }\r\n\r\n// exports.AddSearchOffset = function (offset) {\r\n//     searchOffset += offset;\r\n// }\r\n\r\n// exports.PopulatePage = async function (imgData, areResultsStickers = false) {\r\n//     AddResultsToPage(imgData, areResultsStickers);\r\n// }\r\n\r\n// exports.LoadPage = function () {\r\n//     return giphy.FetchSearch(searchTerm, pageSize, searchOffset)\r\n//         .then(gifData => {\r\n//             AddResultsToPage(gifData);\r\n//             searchOffset += pageSize >= gifData.length ? gifData.length : pageSize;\r\n//         });\r\n// }\r\n\r\n// async function AddResultsToPage(imgData, areResultsStickers = false) {\r\n//     if (searchItemHTML == undefined) {\r\n//         searchItemHTML = await utils.LoadComponent(\"./components/item.html\");\r\n//     }\r\n\r\n//     for (let i = 0; i < pageSize && i < imgData.length; i++) {\r\n//         let smallestIdx;\r\n//         let smallestCol;\r\n//         let lowestHeight = Infinity;\r\n\r\n//         for (let j = 0; j < searchResultsCols.length; j++) {\r\n//             let currentHeight = colHeights[j];\r\n\r\n//             if (currentHeight < lowestHeight) {\r\n//                 lowestHeight = currentHeight;\r\n//                 smallestIdx = j;\r\n//                 smallestCol = searchResultsCols[j];\r\n//             }\r\n//         }\r\n\r\n//         let newItem = document.createElement('div');\r\n//         newItem.innerHTML = searchItemHTML;\r\n\r\n//         let img = newItem.querySelector('img');\r\n//         img.src = imgData[i].images.fixed_height.url;\r\n\r\n//         if (areResultsStickers) {\r\n//             img.classList.add('sticker');\r\n//         }\r\n\r\n//         colHeights[smallestIdx] += parseInt(imgData[i].images.original.height);\r\n//         smallestCol.appendChild(newItem);\r\n//     }\r\n// }\n\n//# sourceURL=webpack:///./src/js/components/search_results.js?");

/***/ }),

/***/ "./src/js/components/utils.js":
/*!************************************!*\
  !*** ./src/js/components/utils.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports.CapitalizeFirstLetter = function (term) {\r\n    return term.charAt(0).toUpperCase() + term.slice(1);\r\n}\r\n\r\nexports.RandomInt = function (min, max) {\r\n    min = Math.ceil(min);\r\n    max = Math.floor(max);\r\n\r\n    return Math.floor(Math.random() * (max - min)) + min;\r\n}\r\n\r\nexports.LoopIndex = function (idx, max) {\r\n    return idx >= 0 ? idx % max : max - 1;\r\n}\r\n\r\nexports.LoadComponent = function (component_url) {\r\n    return fetch(component_url)\r\n        .then((response) => response.text())\r\n        .then((html) => {\r\n            return html;\r\n        })\r\n        .catch((error) => {\r\n            console.warn(error);\r\n        });\r\n}\r\n\r\nexports.GetQueryVariable = function (variable) {\r\n    // window.location is the URL for the current page\r\n    let query = window.location.search.substring(1);\r\n\r\n    // Splits URL variables into multiple strings\r\n    let vars = query.split(\"&\");\r\n    for (let i = 0; i < vars.length; i++) {\r\n        let pair = vars[i].split(\"=\");\r\n        if (pair[0] === variable) {\r\n            return decodeURIComponent(pair[1].replace(/\\+/g, \"%20\"));\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/js/components/utils.js?");

/***/ }),

/***/ "./src/js/item.js":
/*!************************!*\
  !*** ./src/js/item.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Modules\r\nconst giphy = __webpack_require__(/*! ./components/giphy_api.js */ \"./src/js/components/giphy_api.js\");\r\nconst searchResults = __webpack_require__(/*! ./components/search_results.js */ \"./src/js/components/search_results.js\");\r\nconst utils = __webpack_require__(/*! ./components/utils.js */ \"./src/js/components/utils.js\");\r\nconst scrollLoading = __webpack_require__(/*! ./components/scroll_loading.js */ \"./src/js/components/scroll_loading.js\");\r\n\r\n// Gallery parameters\r\nconst galleryHeaderTitle = document.querySelector('.gallery-header-title');\r\nconst galleryHeaderCategory = document.querySelector('.gallery-header-category');\r\nconst itemImg = document.querySelector('.item-container-img');\r\nconst itemSource = document.querySelector('.item-container-src');\r\n\r\n// Search Loading parameters\r\nlet pageLoader;\r\n\r\n\r\nfunction SetPageData(itemData) {\r\n    itemImg.src = itemData.images.fixed_height.url;\r\n\r\n    // Initializing page header\r\n    galleryHeaderTitle.textContent = itemData.title;\r\n    galleryHeaderCategory.textContent = itemData.import_datetime;\r\n    itemSource.textContent = itemData.source;\r\n    itemSource.href = itemData.source;\r\n}\r\n\r\nfunction LoadPage() {\r\n    return pageLoader.LoadPage();\r\n}\r\n\r\nasync function Init(searchStickers = false) {\r\n\r\n    let searchID = utils.GetQueryVariable('id');\r\n\r\n    if (searchID != undefined) {\r\n        let itemData = await giphy.FetchItemByID(searchID);\r\n        console.log(itemData);\r\n        SetPageData(itemData);\r\n\r\n        let splitTitle = itemData.title.split(' ');\r\n        let relatedSearchTerm = splitTitle[1];\r\n\r\n        pageLoader = new searchResults.SearchPageLoader(relatedSearchTerm, searchStickers);\r\n        await pageLoader.InitLoader(pageLoader.pageSize);\r\n\r\n        // scrollLoading.SetLoadingPromise(LoadPage);\r\n        // scrollLoading.ToggleLoading(false);\r\n    }\r\n}\r\n\r\nInit();\r\n\n\n//# sourceURL=webpack:///./src/js/item.js?");

/***/ })

/******/ });