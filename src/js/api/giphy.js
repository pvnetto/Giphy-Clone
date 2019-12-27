const GIPHY_HOST = 'https://api.giphy.com';
const SEARCH_GIFS_PATH = '/v1/gifs/search';
const SEARCH_STICKERS_PATH = '/v1/stickers/search';
const UPLOAD_URL = '//upload.giphy.com/v1/gifs';

// key, limit (max num of records), offset, rating, format (json)
const TRENDING_GIFS_PATH = '/v1/gifs/trending';
const TRENDING_STICKERS_PATH = '/v1/stickers/trending';

const API_KEY = process.env.GIPHY_API_KEY;

const fetchGIFByID = (searchID) => {
    const gifByIdPath = `/v1/gifs/${searchID}`;
    const requestURL = GIPHY_HOST + gifByIdPath + `?api_key=${API_KEY}&gif_id=${searchID}`;

    return fetch(requestURL)
        .then(res => res.json())
        .then(jsonData => jsonData.data);
}

const fetchSearch = (searchTxt, limit, offset, searchStickers = false) => {
    let searchPath = searchStickers ? SEARCH_STICKERS_PATH : SEARCH_GIFS_PATH;
    const requestURL = GIPHY_HOST + searchPath + `?api_key=${API_KEY}&q=${searchTxt}&limit=${limit}&offset=${offset}`;

    return fetch(requestURL)
        .then(res => res.json())
        .then(jsonData => jsonData.data);
}

const fetchTrending = (trendingSize, trendingRating, fetchStickers = false) => {
    let trendingPath = fetchStickers ? TRENDING_STICKERS_PATH : TRENDING_GIFS_PATH;
    const requestURL = GIPHY_HOST + trendingPath + `?api_key=${API_KEY}&limit=${trendingSize}&rating=${trendingRating}`;

    return fetch(requestURL)
        .then(res => res.json())
        .then(gifs => gifs.data);
}

const fetchSearchAsync = async (search_txt, limit, offset) => {
    const requestURL = GIPHY_HOST + SEARCH_GIFS_PATH + `?api_key=${API_KEY}&q=${search_txt}&limit=${limit}&offset=${offset}`;
    const searchResponse = await fetch(requestURL);
    const searchJSON = await searchResponse.json();

    if (searchResponse.status !== 200) {
        throw Error(searchJSON.detail);
    }

    return await searchJSON.data;
}

function populateItemWithGIFData(item, data, isLoadingStickers = false) {
    const itemLink = item.tagName == 'A' ? item : item.querySelector('a');
    const itemImg = itemLink.querySelector('img');
    const imgData = data.images.fixed_height;


    const previewContainer = item.querySelector('.unloaded') || item.closest('.unloaded');
    if (previewContainer) {
        const aspectRatio = imgData.height / imgData.width;
        previewContainer.style['padding-top'] = `calc(100% * ${aspectRatio})`;
    }


    itemImg.src = imgData.url;
    itemLink.href = `item.html?id=${data.id}`;

    if (isLoadingStickers) itemImg.classList.add('sticker');

    return item;
}

export { fetchGIFByID, fetchSearch, fetchSearchAsync, fetchTrending, populateItemWithGIFData };
