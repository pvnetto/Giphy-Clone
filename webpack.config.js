const path = require('path');

module.exports = {
    mode: "development",
    entry: {
        index: './src/js/index.js',
        search: './src/js/search.js',
        reactions: './src/js/reactions.js',
        entertainment: './src/js/entertainment.js',
        sports: './src/js/sports.js',
        artists: './src/js/artists.js',
        stickers: './src/js/stickers.js',
        item: './src/js/item.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '/src/js/dist')
    }
};