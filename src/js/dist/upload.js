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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/upload.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/components/giphy_api.js":
/*!****************************************!*\
  !*** ./src/js/components/giphy_api.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const API_KEY = 'YEq174exoFhVhmvEOqMka3RtRh2KKZe8';\r\nconst GIPHY_HOST = 'https://api.giphy.com';\r\nconst SEARCH_GIFS_PATH = '/v1/gifs/search';\r\nconst SEARCH_STICKERS_PATH = '/v1/stickers/search';\r\nconst UPLOAD_URL = '//upload.giphy.com/v1/gifs';\r\n\r\n// key, limit (max num of records), offset, rating, format (json)\r\nconst TRENDING_GIFS_PATH = '/v1/gifs/trending';\r\nconst TRENDING_STICKERS_PATH = '/v1/stickers/trending';\r\n\r\nfunction FetchItemByID(searchID) {\r\n    const gifByIdPath = `/v1/gifs/${searchID}`;\r\n    const requestURL = GIPHY_HOST + gifByIdPath + `?api_key=${API_KEY}&gif_id=${searchID}`;\r\n\r\n    return fetch(requestURL)\r\n        .then(res => res.json())\r\n        .then(jsonData => jsonData.data);\r\n}\r\n\r\nfunction FetchSearch(searchTxt, limit, offset, searchStickers = false) {\r\n    let searchPath = searchStickers ? SEARCH_STICKERS_PATH : SEARCH_GIFS_PATH;\r\n    const requestURL = GIPHY_HOST + searchPath + `?api_key=${API_KEY}&q=${searchTxt}&limit=${limit}&offset=${offset}`;\r\n    return fetch(requestURL)\r\n        .then(res => res.json())\r\n        .then(jsonData => jsonData.data);\r\n}\r\n\r\nfunction FetchTrending(trendingSize, trendingRating, fetchStickers = false) {\r\n    let trendingPath = fetchStickers ? TRENDING_STICKERS_PATH : TRENDING_GIFS_PATH;\r\n    const requestURL = GIPHY_HOST + trendingPath + `?api_key=${API_KEY}&limit=${trendingSize}&rating=${trendingRating}`;\r\n\r\n    return fetch(requestURL)\r\n        .then(res => res.json())\r\n        .then(gifs => gifs.data);\r\n}\r\n\r\nasync function AsyncSearch(search_txt, limit, offset) {\r\n    const requestURL = GIPHY_HOST + SEARCH_GIFS_PATH + `?api_key=${API_KEY}&q=${search_txt}&limit=${limit}&offset=${offset}`;\r\n    const searchResponse = await fetch(requestURL);\r\n    const searchJSON = await searchResponse.json();\r\n\r\n    if (searchResponse.status !== 200) {\r\n        throw Error(searchJSON.detail);\r\n    }\r\n\r\n    return await searchJSON.data;\r\n}\r\n\r\nfunction UploadMultipleItems(itemsURL, tags, sourceURL) {\r\n\r\n}\r\n\r\nfunction UploadItem(file, tags, sourceURL) {\r\n    let http = new XMLHttpRequest();\r\n    let url = UPLOAD_URL;\r\n    let params = `api_key=${API_KEY}&file=${file}&tags=${tags}&source_post_url=${sourceURL}`;\r\n    http.open('POST', url, true);\r\n\r\n    // Send the proper header information along with the request\r\n    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');\r\n    // http.setRequestHeader(\"Access-Control-Allow-Origin\", \"http://127.0.0.1:5500/\")\r\n    http.setRequestHeader('Access-Control-Allow-Credentials', true);\r\n    http.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');\r\n    http.setRequestHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');\r\n    http.setRequestHeader('Access-Control-Allow-Origin', '*');\r\n\r\n    // Call a function when the state changes.\r\n    http.onreadystatechange = function () {\r\n        if (http.readyState == 4 && http.status == 200) {\r\n            alert(http.responseText);\r\n        }\r\n        else {\r\n            console.log(\"ReadyState: \", http.readyState);\r\n            console.log(\"Status: \", http.status);\r\n        }\r\n    }\r\n\r\n    http.send(params);\r\n\r\n    // const requestURL = UPLOAD_URL + `?api_key=${API_KEY}&source_image_url=${fileURL}&tags=${tags}&source_post_url=${sourceURL}`;\r\n\r\n    // return fetch(UPLOAD_URL, {\r\n    //     method: 'post'\r\n    // }).then(res => {\r\n    //     console.log(res);\r\n    //     return res;\r\n    // });\r\n}\r\n\r\nfunction RemoveUnloadedOnFinish() {\r\n    let closestUnloaded = this.closest('.unloaded');\r\n\r\n    if (closestUnloaded != undefined) {\r\n        closestUnloaded.classList.remove('unloaded');\r\n    }\r\n}\r\n\r\nfunction PopulateItemWithData(item, data, isLoadingStickers = false) {\r\n    let img = item.tagName == 'IMG' ? item : item.querySelector('img');\r\n    let a = item.tagName == 'A' ? item : item.querySelector('a');\r\n\r\n    img.onload = RemoveUnloadedOnFinish;\r\n    img.src = data.images.fixed_height.url;\r\n    a.href = `item.html?id=${data.id}`;\r\n\r\n    if (isLoadingStickers) {\r\n        img.classList.add('sticker');\r\n    }\r\n\r\n    return item;\r\n}\r\n\r\nexports.FetchItemByID = FetchItemByID;\r\nexports.FetchSearch = FetchSearch;\r\nexports.FetchTrending = FetchTrending;\r\nexports.AsyncSearch = AsyncSearch;\r\nexports.UploadItem = UploadItem;\r\nexports.PopulateItemWithData = PopulateItemWithData;\r\n\n\n//# sourceURL=webpack:///./src/js/components/giphy_api.js?");

/***/ }),

/***/ "./src/js/components/utils.js":
/*!************************************!*\
  !*** ./src/js/components/utils.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports.CapitalizeFirstLetter = function (term) {\r\n    return term.charAt(0).toUpperCase() + term.slice(1);\r\n}\r\n\r\nexports.RandomInt = function (min, max) {\r\n    min = Math.ceil(min);\r\n    max = Math.floor(max);\r\n\r\n    return Math.floor(Math.random() * (max - min)) + min;\r\n}\r\n\r\nexports.LoopIndex = function (idx, max) {\r\n    return idx >= 0 ? idx % max : max - 1;\r\n}\r\n\r\nexports.LoadComponent = function (component_url) {\r\n    return fetch(component_url)\r\n        .then((response) => response.text())\r\n        .then((html) => {\r\n            return html;\r\n        })\r\n        .catch((error) => {\r\n            console.warn(error);\r\n        });\r\n}\r\n\r\nexports.GetQueryVariable = function (variable) {\r\n    // window.location is the URL for the current page\r\n    let query = window.location.search.substring(1);\r\n\r\n    // Splits URL variables into multiple strings\r\n    let vars = query.split(\"&\");\r\n    for (let i = 0; i < vars.length; i++) {\r\n        let pair = vars[i].split(\"=\");\r\n        if (pair[0] === variable) {\r\n            return decodeURIComponent(pair[1].replace(/\\+/g, \"%20\"));\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/js/components/utils.js?");

/***/ }),

/***/ "./src/js/upload.js":
/*!**************************!*\
  !*** ./src/js/upload.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const utils = __webpack_require__(/*! ./components/utils.js */ \"./src/js/components/utils.js\");\r\nconst giphy = __webpack_require__(/*! ./components/giphy_api.js */ \"./src/js/components/giphy_api.js\");\r\n\r\n// TODO: Handle file browsing\r\nconst fileInput = document.querySelector('[type=file]');\r\nfileInput.addEventListener('input', HandleFileSelection);\r\n\r\nconst uploadModal = document.getElementById('upload_modal');\r\nconst uploadDropArea = document.getElementById('upload_drop');\r\nconst uploadModalBody = uploadModal.querySelector('modal-body');\r\nconst uploadModalTags = document.getElementById('upload_tags');\r\nconst uploadModalSrc = document.getElementById('upload_source');\r\nconst uploadBtn = document.getElementById('upload_btn');\r\nconst uploadContainer = uploadModal.querySelector('.modal-upload-container');\r\nlet uploadItemHTML;\r\n\r\nutils.LoadComponent('./components/upload_item.txt').then(data => uploadItemHTML = data);\r\n\r\nlet selectedFiles = [];\r\nlet uploadItems = [];\r\nlet numItems = 0;\r\n\r\nuploadDropArea.addEventListener('drop', HandleFileDrop);\r\nuploadDropArea.addEventListener('dragover', HandleDrag);\r\n\r\nuploadBtn.addEventListener('click', UploadItems);\r\n\r\nfunction HandleDrag(e) {\r\n    e.preventDefault();\r\n}\r\n\r\nfunction HandleFileSelection(e) {\r\n    UpdateUploadModal(this.files);\r\n}\r\n\r\nfunction HandleFileDrop(e) {\r\n    e.preventDefault();\r\n    UpdateUploadModal(e.dataTransfer.files);\r\n}\r\n\r\nfunction UpdateUploadModal(files) {\r\n    $('#upload_modal').modal('show');\r\n\r\n    selectedFiles = [];\r\n    uploadItems = [];\r\n    numItems = 0;\r\n\r\n    let filesFragment = document.createDocumentFragment();\r\n    for (let i = 0; i < files.length; i++) {\r\n        let path = (window.URL || window.webkitURL).createObjectURL(files[i]);\r\n        selectedFiles.push(files[i]);\r\n\r\n        let uploadItem = document.createElement('div');\r\n        uploadItem.innerHTML = uploadItemHTML;\r\n\r\n        let uploadImg = uploadItem.querySelector('img');\r\n        uploadImg.src = path;\r\n\r\n        let uploadTitle = uploadItem.querySelector('p');\r\n        uploadTitle.textContent = files[i].name;\r\n\r\n        let uploadDeleteBtn = uploadItem.querySelector('button');\r\n        uploadDeleteBtn.addEventListener('click', () => {\r\n            selectedFiles[i] = undefined;\r\n            uploadItems[i].style.setProperty('display', 'none');\r\n            numItems--;\r\n\r\n            if (numItems == 0) {\r\n                $('#upload_modal').modal('hide');\r\n            }\r\n        });\r\n\r\n        filesFragment.appendChild(uploadItem);\r\n        uploadItems.push(uploadItem);\r\n    }\r\n\r\n    numItems = files.length;\r\n    uploadContainer.appendChild(filesFragment);\r\n}\r\n\r\nasync function UploadItems() {\r\n    let fileToUpload = selectedFiles[0];\r\n    let tags = uploadModalTags.value.split(',');\r\n    tags = tags.map(tag => tag.trim(' '));\r\n    tags = tags.join(',');\r\n    let sourceTxt = uploadModalSrc.value;\r\n\r\n    console.log(\"Uploading: \", fileToUpload);\r\n    console.log(\"Tags: \", tags);\r\n    console.log(\"Source: \", sourceTxt);\r\n\r\n    var preview = document.querySelector('.preview');\r\n    // var file    = document.querySelector('input[type=file]').files[0];\r\n    var reader = new FileReader();\r\n\r\n    reader.addEventListener(\"load\", function () {\r\n        var base64gif = reader.result; // your gif in base64 here\r\n        giphy.UploadItem(base64gif, tags, sourceTxt);\r\n        // preview.src = base64gif;\r\n        // document.getElementById('base64').innerHTML = base64gif;\r\n    }, false);\r\n\r\n    if (fileToUpload) {\r\n        reader.readAsBinaryString(fileToUpload);\r\n    }\r\n\r\n    // giphy.UploadItem(fileToUpload, tags, sourceTxt);\r\n}\r\n\n\n//# sourceURL=webpack:///./src/js/upload.js?");

/***/ })

/******/ });