// Displays search results in columns of the same size

// Modules
const giphy = require('./giphy_api.js');
const utils = require('./utils.js');

// HTML DOM objects
const searchResultsCols = document.querySelectorAll('.search-results-col');
let colHeights = [...searchResultsCols].map(_ => 0);  // Creates an element in the array for each column

// Search parameters
let searchTerm;
let pageSize = 100;
let searchOffset = 0;
let searchItemHTML;

exports.SetSearchTerm = function (term) {
    searchTerm = term;
}

exports.GetPageSize = function () {
    return pageSize;
}

exports.SetPageSize = function (newSize) {
    pageSize = newSize;
}

exports.GetSearchOffset = function () {
    return searchOffset;
}

exports.AddSearchOffset = function (offset) {
    searchOffset += offset;
}

exports.PopulatePage = async function (imgData, areResultsStickers = false) {
    AddResultsToPage(imgData, areResultsStickers);
}

exports.LoadPage = function () {
    return giphy.FetchSearch(searchTerm, pageSize, searchOffset)
        .then(gifData => {
            AddResultsToPage(gifData);
            searchOffset += pageSize >= gifData.length ? gifData.length : pageSize;
        });
}

async function AddResultsToPage(imgData, areResultsStickers = false) {
    if (searchItemHTML == undefined) {
        searchItemHTML = await utils.LoadComponent("./components/item.html");
    }

    for (let i = 0; i < pageSize && i < imgData.length; i++) {
        let smallestIdx;
        let smallestCol;
        let lowestHeight = Infinity;

        for (let j = 0; j < searchResultsCols.length; j++) {
            let currentHeight = colHeights[j];

            if (currentHeight < lowestHeight) {
                lowestHeight = currentHeight;
                smallestIdx = j;
                smallestCol = searchResultsCols[j];
            }
        }

        let newItem = document.createElement('div');
        newItem.innerHTML = searchItemHTML;

        let img = newItem.querySelector('img');
        img.src = imgData[i].images.fixed_height.url;

        if (areResultsStickers) {
            img.classList.add('sticker');
        }

        colHeights[smallestIdx] += parseInt(imgData[i].images.original.height);
        smallestCol.appendChild(newItem);
    }
}