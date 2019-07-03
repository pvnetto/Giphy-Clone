const API_KEY = 'YEq174exoFhVhmvEOqMka3RtRh2KKZe8';
const giphy_host = 'https://api.giphy.com';
const SEARCH_GIFS_PATH = '/v1/gifs/search';
const SEARCH_STICKERS_PATH = '/v1/stickers/search';

// key, limit (max num of records), offset, rating, format (json)
const TRENDING_GIFS_PATH = '/v1/gifs/trending';
const TRENDING_STICKERS_PATH = '/v1/stickers/trending';

function FetchSearch(search_txt, limit, offset, searchStickers = false) {
    let searchPath = searchStickers ? SEARCH_STICKERS_PATH : SEARCH_GIFS_PATH;
    const requestURL = giphy_host + searchPath + `?api_key=${API_KEY}&q=${search_txt}&limit=${limit}&offset=${offset}`;
    return fetch(requestURL)
        .then(res => res.json())
        .then(jsonData => jsonData.data);
}

function FetchTrending(trendingSize, trendingRating, fetchStickers = false) {
    let trendingPath = fetchStickers ? TRENDING_STICKERS_PATH : TRENDING_GIFS_PATH;
    const requestURL = giphy_host + trendingPath + `?api_key=${API_KEY}&limit=${trendingSize}&rating=${trendingRating}`;

    return fetch(requestURL)
        .then(res => res.json())
        .then(gifs => gifs.data);
}

async function AsyncSearch(search_txt, limit, offset) {
    const requestURL = giphy_host + SEARCH_GIFS_PATH + `?api_key=${API_KEY}&q=${search_txt}&limit=${limit}&offset=${offset}`;
    const searchResponse = await fetch(requestURL);
    const searchJSON = await searchResponse.json();

    if (searchResponse.status !== 200) {
        throw Error(searchJSON.detail);
    }

    return await searchJSON.data;
}

exports.FetchSearch = FetchSearch;
exports.FetchTrending = FetchTrending;
exports.AsyncSearch = AsyncSearch;
