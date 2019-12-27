// Displays search results in columns of the same size
import searchItemHTML from '../../templates/search_item.txt'
import { fetchSearch, populateItemWithGIFData } from '../api/giphy';

class SearchPageLoader {

    constructor(searchTerm, isLoadingStickers = false, startOffset = 0, pageSize = 100) {
        this.searchTerm = searchTerm;
        this.searchOffset = startOffset;
        this.isLoadingStickers = isLoadingStickers;
        this.pageSize = pageSize;
    }

    async InitLoader(firstSearchSize) {
        this.searchResultsCols = document.querySelectorAll('.search-results-col');
        this.colHeights = [...this.searchResultsCols].map(_ => 0);                  // Creates an element in the array for each column

        let firstSearchData = await fetchSearch(this.searchTerm, firstSearchSize, this.searchOffset, this.isLoadingStickers);

        this.firstSearchResultSize = firstSearchData.length;

        let firstSearchOffset = this.pageSize >= firstSearchData.length ? firstSearchData.length : this.pageSize;
        this.searchOffset += firstSearchOffset;

        await this.PopulatePage(firstSearchData);

        return firstSearchData;
    }

    LoadPage() {
        return fetchSearch(this.searchTerm, this.pageSize, this.searchOffset, this.isLoadingStickers)
            .then(gifData => {
                this.PopulatePage(gifData);
                this.searchOffset += this.pageSize >= gifData.length ? gifData.length : this.pageSize;
            });
    }

    async PopulatePage(imgData) {

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
            newItem.innerHTML = searchItemHTML;
            newItem = populateItemWithGIFData(newItem, imgData[i], this.isLoadingStickers);

            this.colHeights[smallestIdx] += parseInt(imgData[i].images.original.height);
            smallestCol.appendChild(newItem);
        }
    }

}

export default SearchPageLoader;