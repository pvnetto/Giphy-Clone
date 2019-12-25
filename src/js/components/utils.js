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

exports.GetQueryVariable = function (variable) {
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