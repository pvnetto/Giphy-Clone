const path = require('path');

module.exports = {
    mode: "development",
    entry: {
        index: './src/js/index.js',
        search: './src/js/search.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '/src/js/dist')
    }
};