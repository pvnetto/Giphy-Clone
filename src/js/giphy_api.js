const API_KEY = 'YEq174exoFhVhmvEOqMka3RtRh2KKZe8';
const giphy_host = 'https://api.giphy.com';
const SEARCH_PATH = '/v1/gifs/search';

// key, limit (max num of records), offset, rating, format (json)
const TRENDING_PATH = '/v1/gifs/trending';

function FetchSearch(search_txt, limit, offset) {
    const requestURL = giphy_host + SEARCH_PATH + `?api_key=${API_KEY}&q=${search_txt}&limit=${limit}&offset=${offset}`;
    return fetch(requestURL)
        .then(res => res.json())
        .then(jsonData => jsonData.data);
}

function FetchTrending(trendingSize, trendingRating) {
    const requestURL = giphy_host + TRENDING_PATH + `?api_key=${API_KEY}&limit=${trendingSize}&rating=${trendingRating}`;

    return fetch(requestURL)
        .then(res => res.json())
        .then(gifs => gifs.data);
}

async function AsyncSearch(search_txt, limit, offset) {
    const requestURL = giphy_host + SEARCH_PATH + `?api_key=${API_KEY}&q=${search_txt}&limit=${limit}&offset=${offset}`;
    const searchResponse = await fetch(requestURL);
    const searchJSON = await searchResponse.json();

    if (searchResponse.status !== 200) {
        throw Error(searchJSON.detail);
    }

    return await searchJSON.data;
}