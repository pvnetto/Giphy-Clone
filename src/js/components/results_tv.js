const utils = require('./utils.js');
const giphy = require('./giphy_api.js');

// Results TV parameters
const tv = document.querySelector('.search-results-tv');
const tvImg = tv.querySelector('.img-fluid');
let tvLink = tv.querySelector('a');
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

tvPlayBtn.addEventListener('click', ToggleTVAutoplay);
tvPauseBtn.addEventListener('click', ToggleTVAutoplay);

tvPrevBtn.addEventListener('click', () => RefreshTV(-1));
tvNextBtn.addEventListener('click', () => RefreshTV(1));

exports.EnableTV = function (title, data, isLoadingStickers = false) {
    tv.classList.add('active');
    tvTitle.textContent = "#" + utils.CapitalizeFirstLetter(title) + " TV";
    tvData = data;

    if (isLoadingStickers) {
        tvImg.classList.add('sticker');
    }

    ToggleTVAutoplay();
}

// TODO: Call autoplay only when the current image finishes loading
function ToggleTVAutoplay() {
    if (!isTVPlaying) {
        tvDataIdx = utils.RandomInt(0, tvData.length);
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
    tvDataIdx = utils.LoopIndex(tvDataIdx + val, tvData.length);
    tvLink = giphy.PopulateItemWithData(tvLink, tvData[tvDataIdx]);
}