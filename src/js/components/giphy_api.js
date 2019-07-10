const API_KEY = 'YEq174exoFhVhmvEOqMka3RtRh2KKZe8';
const GIPHY_HOST = 'https://api.giphy.com';
const SEARCH_GIFS_PATH = '/v1/gifs/search';
const SEARCH_STICKERS_PATH = '/v1/stickers/search';
const UPLOAD_URL = '//upload.giphy.com/v1/gifs';

// key, limit (max num of records), offset, rating, format (json)
const TRENDING_GIFS_PATH = '/v1/gifs/trending';
const TRENDING_STICKERS_PATH = '/v1/stickers/trending';

function FetchItemByID(searchID) {
    const gifByIdPath = `/v1/gifs/${searchID}`;
    const requestURL = GIPHY_HOST + gifByIdPath + `?api_key=${API_KEY}&gif_id=${searchID}`;

    return fetch(requestURL)
        .then(res => res.json())
        .then(jsonData => jsonData.data);
}

function FetchSearch(searchTxt, limit, offset, searchStickers = false) {
    let searchPath = searchStickers ? SEARCH_STICKERS_PATH : SEARCH_GIFS_PATH;
    const requestURL = GIPHY_HOST + searchPath + `?api_key=${API_KEY}&q=${searchTxt}&limit=${limit}&offset=${offset}`;
    return fetch(requestURL)
        .then(res => res.json())
        .then(jsonData => jsonData.data);
}

function FetchTrending(trendingSize, trendingRating, fetchStickers = false) {
    let trendingPath = fetchStickers ? TRENDING_STICKERS_PATH : TRENDING_GIFS_PATH;
    const requestURL = GIPHY_HOST + trendingPath + `?api_key=${API_KEY}&limit=${trendingSize}&rating=${trendingRating}`;

    return fetch(requestURL)
        .then(res => res.json())
        .then(gifs => gifs.data);
}

async function AsyncSearch(search_txt, limit, offset) {
    const requestURL = GIPHY_HOST + SEARCH_GIFS_PATH + `?api_key=${API_KEY}&q=${search_txt}&limit=${limit}&offset=${offset}`;
    const searchResponse = await fetch(requestURL);
    const searchJSON = await searchResponse.json();

    if (searchResponse.status !== 200) {
        throw Error(searchJSON.detail);
    }

    return await searchJSON.data;
}

function UploadMultipleItems(itemsURL, tags, sourceURL) {

}

function UploadItem(file, tags, sourceURL) {
    let http = new XMLHttpRequest();
    let url = UPLOAD_URL;
    let params = `api_key=${API_KEY}&file=${file}&tags=${tags}&source_post_url=${sourceURL}`;
    http.open('POST', url, true);

    // Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // http.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500/")
    http.setRequestHeader('Access-Control-Allow-Credentials', true);
    http.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    http.setRequestHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    http.setRequestHeader('Access-Control-Allow-Origin', '*');

    // Call a function when the state changes.
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
        else {
            console.log("ReadyState: ", http.readyState);
            console.log("Status: ", http.status);
        }
    }

    http.send(params);

    // const requestURL = UPLOAD_URL + `?api_key=${API_KEY}&source_image_url=${fileURL}&tags=${tags}&source_post_url=${sourceURL}`;

    // return fetch(UPLOAD_URL, {
    //     method: 'post'
    // }).then(res => {
    //     console.log(res);
    //     return res;
    // });
}

function RemoveUnloadedOnFinish() {
    let closestUnloaded = this.closest('.unloaded');

    if (closestUnloaded != undefined) {
        closestUnloaded.classList.remove('unloaded');
    }
}

function PopulateItemWithData(item, data, isLoadingStickers = false) {
    let img = item.tagName == 'IMG' ? item : item.querySelector('img');
    let a = item.tagName == 'A' ? item : item.querySelector('a');

    img.onload = RemoveUnloadedOnFinish;
    img.src = data.images.fixed_height.url;
    a.href = `item.html?id=${data.id}`;

    if (isLoadingStickers) {
        img.classList.add('sticker');
    }

    return item;
}

exports.FetchItemByID = FetchItemByID;
exports.FetchSearch = FetchSearch;
exports.FetchTrending = FetchTrending;
exports.AsyncSearch = AsyncSearch;
exports.UploadItem = UploadItem;
exports.PopulateItemWithData = PopulateItemWithData;
