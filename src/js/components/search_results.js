// Displays search results in columns of the same size

// Modules
const giphy = require('./giphy_api.js');
const utils = require('./utils.js');


class SearchPageLoader {

    constructor(searchTerm, isLoadingStickers = false, startOffset = 0, pageSize = 100) {
        this.searchTerm = searchTerm;
        this.searchOffset = startOffset;
        this.isLoadingStickers = isLoadingStickers;
        this.pageSize = pageSize;
        this.searchItemHTML = undefined;
    }

    async InitLoader(firstSearchSize) {
        this.searchResultsCols = document.querySelectorAll('.search-results-col');
        this.colHeights = [...this.searchResultsCols].map(_ => 0);                  // Creates an element in the array for each column

        let firstSearchData = await giphy.FetchSearch(this.searchTerm, firstSearchSize, this.searchOffset, this.isLoadingStickers);

        this.firstSearchResultSize = firstSearchData.length;

        let firstSearchOffset = this.pageSize >= firstSearchData.length ? firstSearchData.length : this.pageSize;
        this.searchOffset += firstSearchOffset;

        await this.PopulatePage(firstSearchData);

        return firstSearchData;
    }

    LoadPage() {
        return giphy.FetchSearch(this.searchTerm, this.pageSize, this.searchOffset, this.isLoadingStickers)
            .then(gifData => {
                this.PopulatePage(gifData);
                this.searchOffset += this.pageSize >= gifData.length ? gifData.length : this.pageSize;
            });
    }

    async PopulatePage(imgData) {
        if (this.searchItemHTML == undefined) {
            this.searchItemHTML = await utils.LoadComponent("./components/item.html");
        }

        for (let i = 0; i < this.pageSize && i < imgData.length; i++) {
            let smallestIdx;
            let smallestCol;
            let lowestHeight = Infinity;

            for (let j = 0; j < this.searchResultsCols.length; j++) {
                let currentHeight = this.colHeights[j];

                if (currentHeight < lowestHeight) {
                    lowestHeight = currentHeight;
                    smallestIdx = j;
                    smallestCol = this.searchResultsCols[j];
                }
            }

            let newItem = document.createElement('div');
            newItem.innerHTML = this.searchItemHTML;

            let img = newItem.querySelector('img');
            img.src = imgData[i].images.fixed_height.url;

            if (this.isLoadingStickers) {
                img.classList.add('sticker');
            }

            this.colHeights[smallestIdx] += parseInt(imgData[i].images.original.height);
            smallestCol.appendChild(newItem);
        }
    }

}

exports.SearchPageLoader = SearchPageLoader;

// exports.SetSearchTerm = function (term) {
//     searchTerm = term;
// }

// exports.GetPageSize = function () {
//     return pageSize;
// }

// exports.SetPageSize = function (newSize) {
//     pageSize = newSize;
// }

// exports.GetSearchOffset = function () {
//     return searchOffset;
// }

// exports.AddSearchOffset = function (offset) {
//     searchOffset += offset;
// }

// exports.PopulatePage = async function (imgData, areResultsStickers = false) {
//     AddResultsToPage(imgData, areResultsStickers);
// }

// exports.LoadPage = function () {
//     return giphy.FetchSearch(searchTerm, pageSize, searchOffset)
//         .then(gifData => {
//             AddResultsToPage(gifData);
//             searchOffset += pageSize >= gifData.length ? gifData.length : pageSize;
//         });
// }

// async function AddResultsToPage(imgData, areResultsStickers = false) {
//     if (searchItemHTML == undefined) {
//         searchItemHTML = await utils.LoadComponent("./components/item.html");
//     }

//     for (let i = 0; i < pageSize && i < imgData.length; i++) {
//         let smallestIdx;
//         let smallestCol;
//         let lowestHeight = Infinity;

//         for (let j = 0; j < searchResultsCols.length; j++) {
//             let currentHeight = colHeights[j];

//             if (currentHeight < lowestHeight) {
//                 lowestHeight = currentHeight;
//                 smallestIdx = j;
//                 smallestCol = searchResultsCols[j];
//             }
//         }

//         let newItem = document.createElement('div');
//         newItem.innerHTML = searchItemHTML;

//         let img = newItem.querySelector('img');
//         img.src = imgData[i].images.fixed_height.url;

//         if (areResultsStickers) {
//             img.classList.add('sticker');
//         }

//         colHeights[smallestIdx] += parseInt(imgData[i].images.original.height);
//         smallestCol.appendChild(newItem);
//     }
// }