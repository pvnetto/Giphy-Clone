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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/search.js");
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

/***/ "./src/js/scroll_loading.js":
/*!**********************************!*\
  !*** ./src/js/scroll_loading.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Scroll loading parameters\r\nconst loading_animation = document.querySelector('.loading-animation');\r\nconst page_bottom_offset = 30;\r\nlet isLoading = false;\r\nlet loadingPromise;\r\n\r\nwindow.addEventListener('scroll', LoadOnScroll);\r\n\r\nasync function LoadOnScroll() {\r\n    if (!isLoading && window.innerHeight + window.pageYOffset >= document.body.offsetHeight - page_bottom_offset) {\r\n        ToggleLoading(true);\r\n\r\n        if (loadingPromise != undefined) {\r\n            await loadingPromise();\r\n            ToggleLoading(false);\r\n        }\r\n    }\r\n}\r\n\r\nexports.ToggleLoading = function (val) {\r\n    ToggleLoading(val);\r\n}\r\n\r\nfunction ToggleLoading(val) {\r\n    ToggleLoadingAnimation(val);\r\n    isLoading = val;\r\n}\r\n\r\nfunction ToggleLoadingAnimation(val) {\r\n    if (val) {\r\n        if (loading_animation) {\r\n            loading_animation.classList.add('active');\r\n        }\r\n        else {\r\n            console.log(\"> No loading animation found...\");\r\n        }\r\n    }\r\n    else {\r\n        if (loading_animation) {\r\n            loading_animation.classList.remove('active');\r\n        }\r\n        else {\r\n            console.log(\"> No loading animation found...\");\r\n        }\r\n    }\r\n}\r\n\r\nexports.GetLoadingPromise = function () {\r\n    return loadingPromise;\r\n}\r\n\r\nexports.SetLoadingPromise = function (newPromise) {\r\n    loadingPromise = newPromise;\r\n}\n\n//# sourceURL=webpack:///./src/js/scroll_loading.js?");

/***/ }),

/***/ "./src/js/search.js":
/*!**************************!*\
  !*** ./src/js/search.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Modules\r\nconst giphy = __webpack_require__(/*! ./giphy_api.js */ \"./src/js/giphy_api.js\");\r\nconst scrollLoading = __webpack_require__(/*! ./scroll_loading.js */ \"./src/js/scroll_loading.js\");\r\nconst utils = __webpack_require__(/*! ./utils.js */ \"./src/js/utils.js\");\r\n\r\n\r\n// HTML DOM objects\r\nconst searchResultsCols = document.querySelectorAll('.search-results-col');\r\nlet colHeights = [0, 0, 342, 342];\r\n\r\n\r\n// Search parameters\r\nconst PAGE_SIZE = 100;\r\nlet searchOffset = 0;\r\nlet searchTerm = GetQueryVariable(\"q\");\r\nlet searchItemHTML;\r\n\r\n// Page header objects\r\nconst searchHeader = document.querySelector('.search-header');\r\nconst searchHeaderTitle = searchHeader.querySelector('h1');\r\nconst searchHeaderResultCount = searchHeader.querySelector('p');\r\n\r\n\r\n// Results TV parameters\r\nconst tv = document.querySelector('.search-results-tv');\r\nconst tvImg = tv.querySelector('.img-fluid');\r\nconst tvTitle = tv.querySelector('.search-results-tv-header h2');\r\nconst tvPlayBtn = tv.querySelector('.fa-play');\r\nconst tvPauseBtn = tv.querySelector('.fa-pause');\r\nconst tvPrevBtn = tv.querySelector('.search-results-tv-prev');\r\nconst tvNextBtn = tv.querySelector('.search-results-tv-forward');\r\n\r\n// Results TV state variables\r\nlet isTVPlaying = false;\r\nlet tvData;\r\nlet tvDataIdx = 0;\r\nlet autoplayRate = 5000;    // Given in milliseconds\r\nlet autoplayInterval;\r\n\r\ntvPlayBtn.addEventListener('click', ToggleResultsTV);\r\ntvPauseBtn.addEventListener('click', ToggleResultsTV);\r\n\r\ntvPrevBtn.addEventListener('click', () => RefreshTV(-1));\r\ntvNextBtn.addEventListener('click', () => RefreshTV(1));\r\n\r\n\r\nfunction GetQueryVariable(variable) {\r\n    // window.location is the URL for the current page\r\n    let query = window.location.search.substring(1);\r\n\r\n    // Splits URL variables into multiple strings\r\n    let vars = query.split(\"&\");\r\n    for (let i = 0; i < vars.length; i++) {\r\n        let pair = vars[i].split(\"=\");\r\n        if (pair[0] === variable) {\r\n            return decodeURIComponent(pair[1].replace(/\\+/g, \"%20\"));\r\n        }\r\n    }\r\n}\r\n\r\nfunction PopulatePage(gifData) {\r\n    for (let i = 0; i < PAGE_SIZE && i < gifData.length; i++) {\r\n\r\n        let smallestIdx;\r\n        let smallestCol;\r\n        let lowestHeight = Infinity;\r\n\r\n        for (let j = 0; j < searchResultsCols.length; j++) {\r\n            let currentHeight = colHeights[j];\r\n\r\n            if (currentHeight < lowestHeight) {\r\n                lowestHeight = currentHeight;\r\n                smallestIdx = j;\r\n                smallestCol = searchResultsCols[j];\r\n            }\r\n        }\r\n\r\n        let newItem = document.createElement('div');\r\n        newItem.innerHTML = searchItemHTML;\r\n\r\n        let img = newItem.querySelector('img');\r\n        img.src = gifData[i].images.fixed_height.url;\r\n\r\n        colHeights[smallestIdx] += parseInt(gifData[i].images.original.height);\r\n        smallestCol.appendChild(newItem);\r\n    }\r\n}\r\n\r\nfunction LoadPage() {\r\n    return FetchSearch(searchTerm, PAGE_SIZE, searchOffset)\r\n        .then(gifData => {\r\n            PopulatePage(gifData);\r\n            searchOffset += PAGE_SIZE >= gifData.length ? gifData.length : PAGE_SIZE;\r\n        });\r\n}\r\n\r\nfunction ToggleResultsTV() {\r\n    if (!isTVPlaying) {\r\n        tvDataIdx = utils.RandomInt(0, tvData.length);\r\n        autoplayInterval = setInterval(() => RefreshTV(1), autoplayRate);\r\n\r\n        tvPlayBtn.classList.remove('active');\r\n        tvPauseBtn.classList.add('active');\r\n    }\r\n    else {\r\n        clearInterval(autoplayInterval);\r\n\r\n        tvPlayBtn.classList.add('active');\r\n        tvPauseBtn.classList.remove('active');\r\n    }\r\n\r\n    isTVPlaying = !isTVPlaying;\r\n}\r\n\r\nfunction RefreshTV(val) {\r\n    tvDataIdx = utils.LoopIndex(tvDataIdx + val, tvData.length);\r\n    current_tv_img = tvData[tvDataIdx];\r\n    tvImg.src = current_tv_img.images.fixed_height.url;\r\n}\r\n\r\nasync function Init() {\r\n    scrollLoading.ToggleLoading(true);\r\n\r\n    searchItemHTML = await utils.LoadComponent(\"components/item.html\");\r\n\r\n    if (searchTerm) {\r\n        searchHeaderTitle.textContent = searchTerm;\r\n        tvTitle.textContent = \"#\" + utils.CapitalizeFirstLetter(searchTerm) + \" TV\";\r\n\r\n        let data = await giphy.FetchSearch(searchTerm, 99999, searchOffset);\r\n\r\n        if (data.length >= 1000) {\r\n            searchHeaderResultCount.textContent = data.length + \"+ GIFs\";\r\n        }\r\n        else {\r\n            searchHeaderResultCount.textContent = data.length + \" GIFs\";\r\n        }\r\n\r\n        if (data.length >= 4) {\r\n            tv.classList.add('active');\r\n        }\r\n\r\n        // Initializing search offset and TV data\r\n        searchOffset = PAGE_SIZE >= data.length ? data.length : PAGE_SIZE;\r\n        tvData = data.slice(0, searchOffset);\r\n\r\n        PopulatePage(data);\r\n        scrollLoading.ToggleLoading(false);\r\n        ToggleResultsTV();\r\n        loadingPromise = LoadPage;\r\n    }\r\n}\r\n\r\nInit();\n\n//# sourceURL=webpack:///./src/js/search.js?");

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