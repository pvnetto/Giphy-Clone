// Scroll loading parameters
const loading_animation = document.querySelector('.loading-animation');
const page_bottom_offset = 30;
let isLoading = false;
let loadingPromise;

window.addEventListener('scroll', LoadOnScroll);

async function LoadOnScroll() {
    if (!isLoading && window.innerHeight + window.pageYOffset >= document.body.offsetHeight - page_bottom_offset) {
        ToggleLoading(true);

        if (loadingPromise != undefined) {
            await loadingPromise();
            ToggleLoading(false);
        }
    }
}

exports.ToggleLoading = function (val) {
    ToggleLoading(val);
}

function ToggleLoading(val) {
    ToggleLoadingAnimation(val);
    isLoading = val;
}

function ToggleLoadingAnimation(val) {
    if (val) {
        if (loading_animation) {
            loading_animation.classList.add('active');
        }
        else {
            console.log("> No loading animation found...");
        }
    }
    else {
        if (loading_animation) {
            loading_animation.classList.remove('active');
        }
        else {
            console.log("> No loading animation found...");
        }
    }
}

exports.GetLoadingPromise = function () {
    return loadingPromise;
}

exports.SetLoadingPromise = function (newPromise) {
    loadingPromise = newPromise;
}