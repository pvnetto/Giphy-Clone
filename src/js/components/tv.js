import { populateItemWithGIFData } from '../api/giphy';
import { capitalizeFirstLetter, randomInt, loopIndex } from '../helpers';


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

tvPlayBtn.addEventListener('click', toggleTVAutoplay);
tvPauseBtn.addEventListener('click', toggleTVAutoplay);

tvPrevBtn.addEventListener('click', () => refreshTV(-1));
tvNextBtn.addEventListener('click', () => refreshTV(1));

const startTV = (title, data, isLoadingStickers = false) => {
    tv.classList.add('active');
    tvTitle.textContent = "#" + capitalizeFirstLetter(title) + " TV";
    tvData = data;

    if (isLoadingStickers) {
        tvImg.classList.add('sticker');
    }

    toggleTVAutoplay();
}

// TODO: Call autoplay only when the current image finishes loading
const toggleTVAutoplay = () => {
    if (!isTVPlaying) {
        tvDataIdx = randomInt(0, tvData.length);
        autoplayInterval = setInterval(() => refreshTV(1), autoplayRate);

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

const refreshTV = (scrollVal) => {
    tvDataIdx = loopIndex(tvDataIdx + scrollVal, tvData.length);
    tvLink = populateItemWithGIFData(tvLink, tvData[tvDataIdx]);
}

export { startTV };