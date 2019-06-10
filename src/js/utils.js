function CapitalizeFirstLetter(term) {
    return term.charAt(0).toUpperCase() + term.slice(1);
}

function RandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
}

function LoopIndex(idx, max) {
    return idx >= 0 ? idx % max : max - 1;
}

function LoadComponent(component_url) {
    return fetch(component_url)
        .then((response) => response.text())
        .then((html) => {
            return html;
        })
        .catch((error) => {
            console.warn(error);
        });
}