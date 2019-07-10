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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/artists.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/artists.js":
/*!***************************!*\
  !*** ./src/js/artists.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const gallery = __webpack_require__(/*! ./components/gallery.js */ \"./src/js/components/gallery.js\");\r\nconst utils = __webpack_require__(/*! ./components/utils.js */ \"./src/js/components/utils.js\");\r\n\r\nlet searchTerm = 'peekasso';\r\nlet pageTitle = 'Artist GIFs';\r\n\r\ngallery.Init(searchTerm, pageTitle);\n\n//# sourceURL=webpack:///./src/js/artists.js?");

/***/ }),

/***/ "./src/js/components/carousel.js":
/*!***************************************!*\
  !*** ./src/js/components/carousel.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function InitCarousel(customCarousel) {\r\n    let carouselList = customCarousel.querySelector('.custom-carousel-list');\r\n    let carouselPrev = customCarousel.querySelector('.custom-carousel-arrow-prev');\r\n    let carouselNext = customCarousel.querySelector('.custom-carousel-arrow-next');\r\n\r\n    carouselList.addEventListener('scroll', ToggleTrendingArrows);\r\n    carouselNext.addEventListener('click', ScrollTrendingNext);\r\n    carouselPrev.addEventListener('click', ScrollTrendingPrev);\r\n}\r\n\r\nfunction DisableTrendingArrows() {\r\n    carousel = this.classList.contains('.custom-carousel') ? this : this.closest(\".custom-carousel\");\r\n    carouselPrev = carousel.querySelector('.custom-carousel-arrow-prev');\r\n    carouselNext = carousel.querySelector('.custom-carousel-arrow-next');\r\n\r\n    carouselPrev.classList.remove('active');\r\n    carouselNext.classList.remove('active');\r\n}\r\n\r\nfunction ToggleTrendingArrows() {\r\n    if (this.closest) {\r\n        carousel = this.classList.contains('.custom-carousel') ? this : this.closest(\".custom-carousel\");\r\n        carouselList = carousel.querySelector('.custom-carousel-list');\r\n        carouselPrev = carousel.querySelector('.custom-carousel-arrow-prev');\r\n        carouselNext = carousel.querySelector('.custom-carousel-arrow-next');\r\n\r\n        let max_scroll = carouselList.scrollWidth - carouselList.clientWidth;\r\n\r\n        if (carouselList.scrollLeft > 0) {\r\n            carouselPrev.classList.add('active');\r\n        }\r\n        else {\r\n            carouselPrev.classList.remove('active');\r\n        }\r\n\r\n        if (carouselList.scrollLeft < max_scroll) {\r\n            carouselNext.classList.add('active');\r\n        }\r\n        else {\r\n            carouselNext.classList.remove('active');\r\n        }\r\n    }\r\n}\r\n\r\nfunction ScrollTrendingNext() {\r\n    carousel = this.classList.contains('.custom-carousel') ? this : this.closest(\".custom-carousel\");\r\n    carouselList = carousel.querySelector('.custom-carousel-list');\r\n\r\n    let scrollSize = carouselList.clientWidth;\r\n    carouselList.scrollLeft += scrollSize;\r\n\r\n    ToggleTrendingArrows();\r\n}\r\n\r\nfunction ScrollTrendingPrev() {\r\n    carousel = this.classList.contains('.custom-carousel') ? this : this.closest(\".custom-carousel\");\r\n    carouselList = carousel.querySelector('.custom-carousel-list');\r\n\r\n    let scrollSize = carouselList.clientWidth;\r\n    carouselList.scrollLeft -= scrollSize;\r\n\r\n    ToggleTrendingArrows();\r\n}\r\n\r\nfunction Init() {\r\n    customCarousels = document.querySelectorAll('.custom-carousel');\r\n\r\n    [...customCarousels].forEach(customCarousel => {\r\n        InitCarousel(customCarousel);\r\n    });\r\n}\r\n\r\nexports.Init = Init;\r\nexports.ToggleTrendingArrows = ToggleTrendingArrows;\r\nexports.DisableTrendingArrows = DisableTrendingArrows;\n\n//# sourceURL=webpack:///./src/js/components/carousel.js?");

/***/ }),

/***/ "./src/js/components/gallery.js":
/*!**************************************!*\
  !*** ./src/js/components/gallery.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Modules\r\nconst giphy = __webpack_require__(/*! ./giphy_api.js */ \"./src/js/components/giphy_api.js\");\r\nconst scrollLoading = __webpack_require__(/*! ./scroll_loading.js */ \"./src/js/components/scroll_loading.js\");\r\nconst trending = __webpack_require__(/*! ./trending.js */ \"./src/js/components/trending.js\");\r\nconst resultsTV = __webpack_require__(/*! ./results_tv.js */ \"./src/js/components/results_tv.js\");\r\nconst searchResults = __webpack_require__(/*! ./search_results.js */ \"./src/js/components/search_results.js\");\r\nconst carousel = __webpack_require__(/*! ./carousel.js */ \"./src/js/components/carousel.js\");\r\n\r\n// Gallery parameters\r\nconst galleryHeaderTitle = document.querySelector('.gallery-header-title');\r\nconst galleryHeaderCategory = document.querySelector('.gallery-header-category');\r\n\r\n// Page loader parameters\r\nlet pageLoader;\r\n\r\nfunction LoadPage() {\r\n    return pageLoader.LoadPage();\r\n}\r\n\r\nasync function Init(searchTerm, pageTitle, searchStickers = false, extraTerm = \"\") {\r\n    carousel.Init();\r\n    // Initializing trending section\r\n    trending.InitializeTrending(searchStickers);\r\n\r\n    let channelSearchTerm = '@' + searchTerm;\r\n\r\n    // Initializing page header\r\n    galleryHeaderTitle.textContent = pageTitle;\r\n    galleryHeaderCategory.textContent = channelSearchTerm;\r\n\r\n    // Initializing search results\r\n    let finalSearchTerm = channelSearchTerm;\r\n    finalSearchTerm = extraTerm != undefined && extraTerm != \"\" ? finalSearchTerm + \" \" + extraTerm : finalSearchTerm;\r\n\r\n    pageLoader = new searchResults.SearchPageLoader(finalSearchTerm, searchStickers);\r\n    let firstSearchData = await pageLoader.InitLoader(pageLoader.pageSize);\r\n\r\n    if (pageLoader.firstSearchResultSize >= 4) {\r\n        let tvContentSize = pageLoader.pageSize >= pageLoader.firstSearchResultSize ? pageLoader.firstSearchResultSize : pageLoader.pageSize;\r\n        resultsTV.EnableTV(searchTerm, firstSearchData.slice(0, tvContentSize));\r\n    }\r\n\r\n    scrollLoading.SetLoadingPromise(LoadPage);\r\n    scrollLoading.ToggleLoading(false);\r\n}\r\n\r\nexports.Init = Init;\n\n//# sourceURL=webpack:///./src/js/components/gallery.js?");

/***/ }),

/***/ "./src/js/components/giphy_api.js":
/*!****************************************!*\
  !*** ./src/js/components/giphy_api.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const API_KEY = 'YEq174exoFhVhmvEOqMka3RtRh2KKZe8';\r\nconst GIPHY_HOST = 'https://api.giphy.com';\r\nconst SEARCH_GIFS_PATH = '/v1/gifs/search';\r\nconst SEARCH_STICKERS_PATH = '/v1/stickers/search';\r\nconst UPLOAD_URL = 'https://upload.giphy.com/v1/gifs';\r\n\r\n// key, limit (max num of records), offset, rating, format (json)\r\nconst TRENDING_GIFS_PATH = '/v1/gifs/trending';\r\nconst TRENDING_STICKERS_PATH = '/v1/stickers/trending';\r\n\r\nfunction FetchItemByID(searchID) {\r\n    const gifByIdPath = `/v1/gifs/${searchID}`;\r\n    const requestURL = GIPHY_HOST + gifByIdPath + `?api_key=${API_KEY}&gif_id=${searchID}`;\r\n\r\n    return fetch(requestURL)\r\n        .then(res => res.json())\r\n        .then(jsonData => jsonData.data);\r\n}\r\n\r\nfunction FetchSearch(searchTxt, limit, offset, searchStickers = false) {\r\n    let searchPath = searchStickers ? SEARCH_STICKERS_PATH : SEARCH_GIFS_PATH;\r\n    const requestURL = GIPHY_HOST + searchPath + `?api_key=${API_KEY}&q=${searchTxt}&limit=${limit}&offset=${offset}`;\r\n    return fetch(requestURL)\r\n        .then(res => res.json())\r\n        .then(jsonData => jsonData.data);\r\n}\r\n\r\nfunction FetchTrending(trendingSize, trendingRating, fetchStickers = false) {\r\n    let trendingPath = fetchStickers ? TRENDING_STICKERS_PATH : TRENDING_GIFS_PATH;\r\n    const requestURL = GIPHY_HOST + trendingPath + `?api_key=${API_KEY}&limit=${trendingSize}&rating=${trendingRating}`;\r\n\r\n    return fetch(requestURL)\r\n        .then(res => res.json())\r\n        .then(gifs => gifs.data);\r\n}\r\n\r\nasync function AsyncSearch(search_txt, limit, offset) {\r\n    const requestURL = GIPHY_HOST + SEARCH_GIFS_PATH + `?api_key=${API_KEY}&q=${search_txt}&limit=${limit}&offset=${offset}`;\r\n    const searchResponse = await fetch(requestURL);\r\n    const searchJSON = await searchResponse.json();\r\n\r\n    if (searchResponse.status !== 200) {\r\n        throw Error(searchJSON.detail);\r\n    }\r\n\r\n    return await searchJSON.data;\r\n}\r\n\r\nfunction UploadMultipleItems(itemsURL, tags, sourceURL) {\r\n\r\n}\r\n\r\nfunction UploadItem(file, tags, sourceURL) {\r\n    let http = new XMLHttpRequest();\r\n    let url = UPLOAD_URL;\r\n    let params = `api_key=${API_KEY}&file=${file}&tags=${tags}&source_post_url=${sourceURL}`;\r\n    http.open('POST', url, true);\r\n\r\n    // Send the proper header information along with the request\r\n    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');\r\n    // http.setRequestHeader(\"Access-Control-Allow-Origin\", \"http://127.0.0.1:5500/\")\r\n    http.setRequestHeader('Access-Control-Allow-Credentials', true);\r\n    http.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');\r\n    http.setRequestHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');\r\n    http.setRequestHeader('Access-Control-Allow-Origin', '*');\r\n\r\n    // Call a function when the state changes.\r\n    http.onreadystatechange = function () {\r\n        if (http.readyState == 4 && http.status == 200) {\r\n            alert(http.responseText);\r\n        }\r\n        else {\r\n            console.log(\"ReadyState: \", http.readyState);\r\n            console.log(\"Status: \", http.status);\r\n        }\r\n    }\r\n\r\n    http.send(params);\r\n\r\n    // const requestURL = UPLOAD_URL + `?api_key=${API_KEY}&source_image_url=${fileURL}&tags=${tags}&source_post_url=${sourceURL}`;\r\n\r\n    // return fetch(UPLOAD_URL, {\r\n    //     method: 'post'\r\n    // }).then(res => {\r\n    //     console.log(res);\r\n    //     return res;\r\n    // });\r\n}\r\n\r\nfunction RemoveUnloadedOnFinish() {\r\n    let closestUnloaded = this.closest('.unloaded');\r\n\r\n    if (closestUnloaded != undefined) {\r\n        closestUnloaded.classList.remove('unloaded');\r\n    }\r\n}\r\n\r\nfunction PopulateItemWithData(item, data, isLoadingStickers = false) {\r\n    let img = item.tagName == 'IMG' ? item : item.querySelector('img');\r\n    let a = item.tagName == 'A' ? item : item.querySelector('a');\r\n\r\n    img.onload = RemoveUnloadedOnFinish;\r\n    img.src = data.images.fixed_height.url;\r\n    a.href = `item.html?id=${data.id}`;\r\n\r\n    if (isLoadingStickers) {\r\n        img.classList.add('sticker');\r\n    }\r\n\r\n    return item;\r\n}\r\n\r\nexports.FetchItemByID = FetchItemByID;\r\nexports.FetchSearch = FetchSearch;\r\nexports.FetchTrending = FetchTrending;\r\nexports.AsyncSearch = AsyncSearch;\r\nexports.UploadItem = UploadItem;\r\nexports.PopulateItemWithData = PopulateItemWithData;\r\n\n\n//# sourceURL=webpack:///./src/js/components/giphy_api.js?");

/***/ }),

/***/ "./src/js/components/results_tv.js":
/*!*****************************************!*\
  !*** ./src/js/components/results_tv.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const utils = __webpack_require__(/*! ./utils.js */ \"./src/js/components/utils.js\");\r\nconst giphy = __webpack_require__(/*! ./giphy_api.js */ \"./src/js/components/giphy_api.js\");\r\n\r\n// Results TV parameters\r\nconst tv = document.querySelector('.search-results-tv');\r\nconst tvImg = tv.querySelector('.img-fluid');\r\nlet tvLink = tv.querySelector('a');\r\nconst tvTitle = tv.querySelector('.search-results-tv-header h2');\r\nconst tvPlayBtn = tv.querySelector('.fa-play');\r\nconst tvPauseBtn = tv.querySelector('.fa-pause');\r\nconst tvPrevBtn = tv.querySelector('.search-results-tv-prev');\r\nconst tvNextBtn = tv.querySelector('.search-results-tv-forward');\r\n\r\n// Results TV state variables\r\nlet isTVPlaying = false;\r\nlet tvData;\r\nlet tvDataIdx = 0;\r\nlet autoplayRate = 5000;    // Given in milliseconds\r\nlet autoplayInterval;\r\n\r\ntvPlayBtn.addEventListener('click', ToggleTVAutoplay);\r\ntvPauseBtn.addEventListener('click', ToggleTVAutoplay);\r\n\r\ntvPrevBtn.addEventListener('click', () => RefreshTV(-1));\r\ntvNextBtn.addEventListener('click', () => RefreshTV(1));\r\n\r\nexports.EnableTV = function (title, data, isLoadingStickers = false) {\r\n    tv.classList.add('active');\r\n    tvTitle.textContent = \"#\" + utils.CapitalizeFirstLetter(title) + \" TV\";\r\n    tvData = data;\r\n\r\n    if (isLoadingStickers) {\r\n        tvImg.classList.add('sticker');\r\n    }\r\n\r\n    ToggleTVAutoplay();\r\n}\r\n\r\n// TODO: Call autoplay only when the current image finishes loading\r\nfunction ToggleTVAutoplay() {\r\n    if (!isTVPlaying) {\r\n        tvDataIdx = utils.RandomInt(0, tvData.length);\r\n        autoplayInterval = setInterval(() => RefreshTV(1), autoplayRate);\r\n\r\n        tvPlayBtn.classList.remove('active');\r\n        tvPauseBtn.classList.add('active');\r\n    }\r\n    else {\r\n        clearInterval(autoplayInterval);\r\n\r\n        tvPlayBtn.classList.add('active');\r\n        tvPauseBtn.classList.remove('active');\r\n    }\r\n\r\n    isTVPlaying = !isTVPlaying;\r\n}\r\n\r\nfunction RefreshTV(val) {\r\n    tvDataIdx = utils.LoopIndex(tvDataIdx + val, tvData.length);\r\n    tvLink = giphy.PopulateItemWithData(tvLink, tvData[tvDataIdx]);\r\n}\n\n//# sourceURL=webpack:///./src/js/components/results_tv.js?");

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

eval("// Displays search results in columns of the same size\r\n\r\n// Modules\r\nconst giphy = __webpack_require__(/*! ./giphy_api.js */ \"./src/js/components/giphy_api.js\");\r\nconst utils = __webpack_require__(/*! ./utils.js */ \"./src/js/components/utils.js\");\r\n\r\n\r\nclass SearchPageLoader {\r\n\r\n    constructor(searchTerm, isLoadingStickers = false, startOffset = 0, pageSize = 100) {\r\n        this.searchTerm = searchTerm;\r\n        this.searchOffset = startOffset;\r\n        this.isLoadingStickers = isLoadingStickers;\r\n        this.pageSize = pageSize;\r\n        this.searchItemHTML = undefined;\r\n    }\r\n\r\n    async InitLoader(firstSearchSize) {\r\n        this.searchResultsCols = document.querySelectorAll('.search-results-col');\r\n        this.colHeights = [...this.searchResultsCols].map(_ => 0);                  // Creates an element in the array for each column\r\n\r\n        let firstSearchData = await giphy.FetchSearch(this.searchTerm, firstSearchSize, this.searchOffset, this.isLoadingStickers);\r\n\r\n        this.firstSearchResultSize = firstSearchData.length;\r\n\r\n        let firstSearchOffset = this.pageSize >= firstSearchData.length ? firstSearchData.length : this.pageSize;\r\n        this.searchOffset += firstSearchOffset;\r\n\r\n        await this.PopulatePage(firstSearchData);\r\n\r\n        return firstSearchData;\r\n    }\r\n\r\n    LoadPage() {\r\n        return giphy.FetchSearch(this.searchTerm, this.pageSize, this.searchOffset, this.isLoadingStickers)\r\n            .then(gifData => {\r\n                this.PopulatePage(gifData);\r\n                this.searchOffset += this.pageSize >= gifData.length ? gifData.length : this.pageSize;\r\n            });\r\n    }\r\n\r\n    async PopulatePage(imgData) {\r\n        if (this.searchItemHTML == undefined) {\r\n            this.searchItemHTML = await utils.LoadComponent(\"./components/search_item.txt\");\r\n        }\r\n\r\n        for (let i = 0; i < this.pageSize && i < imgData.length; i++) {\r\n            let smallestIdx;\r\n            let smallestCol;\r\n            let lowestHeight = Infinity;\r\n\r\n            for (let j = 0; j < this.searchResultsCols.length; j++) {\r\n                let currentHeight = this.colHeights[j];\r\n\r\n                if (currentHeight < lowestHeight) {\r\n                    lowestHeight = currentHeight;\r\n                    smallestIdx = j;\r\n                    smallestCol = this.searchResultsCols[j];\r\n                }\r\n            }\r\n\r\n            let newItem = document.createElement('div');\r\n            newItem.innerHTML = this.searchItemHTML;\r\n            newItem = giphy.PopulateItemWithData(newItem, imgData[i], this.isLoadingStickers);\r\n\r\n            this.colHeights[smallestIdx] += parseInt(imgData[i].images.original.height);\r\n            smallestCol.appendChild(newItem);\r\n        }\r\n    }\r\n\r\n}\r\n\r\nexports.SearchPageLoader = SearchPageLoader;\n\n//# sourceURL=webpack:///./src/js/components/search_results.js?");

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

/***/ })

/******/ });