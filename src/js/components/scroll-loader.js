// Scroll loading parameters
const loadingAnimation = document.querySelector('.loading-animation');
const pageBottomOffset = 30;
let isLoading = false;
let loadingPromise;

window.addEventListener('scroll', loadOnScroll);

async function loadOnScroll() {
    if (!isLoading && hasReachedBottomOfPage()) {
        toggleIsLoading(true);

        if (loadingPromise != undefined) {
            await loadingPromise();
        }

        toggleIsLoading(false);
    }
}

const hasReachedBottomOfPage = () => {
    return window.innerHeight + window.pageYOffset >= document.body.offsetHeight - pageBottomOffset;
}

const toggleIsLoading = (val) => {
    toggleLoadingAnimation(val);
    isLoading = val;
}

const toggleLoadingAnimation = (val) => {
    if (!loadingAnimation) return;

    if (val) {
        loadingAnimation.classList.add('active');
    }
    else {
        loadingAnimation.classList.remove('active');
    }
}

const setScrollLoadingCallback = (newPromise) => {
    loadingPromise = newPromise;
}

export { setScrollLoadingCallback };
