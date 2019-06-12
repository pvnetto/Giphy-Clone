// Modules
const giphy = require('./giphy_api.js');
const utils = require('./utils.js');

// HTML DOM objects
const searchResultsCols = document.querySelectorAll('.search-results-col');
let colHeights = [...searchResultsCols].map(element => 0);  // Creates an element in the array for each column

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

exports.PopulatePage = async function (gifData) {
    AddResultsToPage(gifData);
}

exports.LoadPage = function () {
    return giphy.FetchSearch(searchTerm, pageSize, searchOffset)
        .then(gifData => {
            AddResultsToPage(gifData);
            searchOffset += pageSize >= gifData.length ? gifData.length : pageSize;
        });
}

async function AddResultsToPage(gifData) {
    if (searchItemHTML == undefined) {
        searchItemHTML = await utils.LoadComponent("./components/item.html");
    }

    for (let i = 0; i < pageSize && i < gifData.length; i++) {
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
        img.src = gifData[i].images.fixed_height.url;

        colHeights[smallestIdx] += parseInt(gifData[i].images.original.height);
        smallestCol.appendChild(newItem);
    }
}