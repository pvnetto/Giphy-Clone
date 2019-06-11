exports.CapitalizeFirstLetter = function (term) {
    return term.charAt(0).toUpperCase() + term.slice(1);
}

exports.RandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
}

exports.LoopIndex = function (idx, max) {
    return idx >= 0 ? idx % max : max - 1;
}

exports.LoadComponent = function (component_url) {
    return fetch(component_url)
        .then((response) => response.text())
        .then((html) => {
            return html;
        })
        .catch((error) => {
            console.warn(error);
        });
}