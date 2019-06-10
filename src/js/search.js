// HTML DOM objects
const searchResultsCols = document.querySelectorAll('.search-results-col');
let colHeights = [0, 0, 342, 342];


// Search parameters
const PAGE_SIZE = 100;
let searchOffset = 0;
let searchTerm = GetQueryVariable("q");
let searchItemHTML;

// Page header objects
const searchHeader = document.querySelector('.search-header');
const searchHeaderTitle = searchHeader.querySelector('h1');
const searchHeaderResultCount = searchHeader.querySelector('p');


// Results TV parameters
const tv = document.querySelector('.search-results-tv');
const tvImg = tv.querySelector('.img-fluid');
const tvTitle = tv.querySelector('.search-results-tv-header h2');
const tvPlayBtn = tv.querySelector('.fa-play');
const tvPauseBtn = tv.querySelector('.fa-pause');
const tvPrevBtn = tv.querySelector('.search-results-tv-prev');
const tvNextBtn = tv.querySelector('.search-results-tv-forward');

// Results TV state variables
let isTVPlaying = false;
let tvData;
let tvDataIdx = 0;
let autoplayRate = 5000;    // Given in milliseconds
let autoplayInterval;

tvPlayBtn.addEventListener('click', ToggleResultsTV);
tvPauseBtn.addEventListener('click', ToggleResultsTV);

tvPrevBtn.addEventListener('click', () => RefreshTV(-1));
tvNextBtn.addEventListener('click', () => RefreshTV(1));


function GetQueryVariable(variable) {
    // window.location is the URL for the current page
    let query = window.location.search.substring(1);

    // Splits URL variables into multiple strings
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] === variable) {
            return decodeURIComponent(pair[1].replace(/\+/g, "%20"));
        }
    }
}

function PopulatePage(gifData) {
    for (let i = 0; i < PAGE_SIZE && i < gifData.length; i++) {

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

function LoadPage() {
    return FetchSearch(searchTerm, PAGE_SIZE, searchOffset)
        .then(gifData => {
            PopulatePage(gifData);
            searchOffset += PAGE_SIZE >= gifData.length ? gifData.length : PAGE_SIZE;
        });
}

function ToggleResultsTV() {
    if (!isTVPlaying) {
        tvDataIdx = RandomInt(0, tvData.length);
        autoplayInterval = setInterval(() => RefreshTV(1), autoplayRate);

        tvPlayBtn.classList.remove('active');
        tvPauseBtn.classList.add('active');
    }
    else {
        clearInterval(autoplayInterval);

        tvPlayBtn.classList.add('active');
        tvPauseBtn.classList.remove('active');
    }

    isTVPlaying = !isTVPlaying;
}

function RefreshTV(val) {
    tvDataIdx = LoopIndex(tvDataIdx + val, tvData.length);
    current_tv_img = tvData[tvDataIdx];
    tvImg.src = current_tv_img.images.fixed_height.url;
}

async function Init() {
    ToggleLoading(true);

    searchItemHTML = await LoadComponent("components/item.html");

    if (searchTerm) {
        searchHeaderTitle.textContent = searchTerm;
        tvTitle.textContent = "#" + CapitalizeFirstLetter(searchTerm) + " TV";

        let data = await FetchSearch(searchTerm, 99999, searchOffset);

        if (data.length >= 1000) {
            searchHeaderResultCount.textContent = data.length + "+ GIFs";
        }
        else {
            searchHeaderResultCount.textContent = data.length + " GIFs";
        }

        if (data.length >= 4) {
            tv.classList.add('active');
        }

        // Initializing search offset and TV data
        searchOffset = PAGE_SIZE >= data.length ? data.length : PAGE_SIZE;
        tvData = data.slice(0, searchOffset);

        PopulatePage(data);
        ToggleLoading(false);
        ToggleResultsTV();
        loadingPromise = LoadPage;
    }
}

Init();