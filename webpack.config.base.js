const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const dotenv = require('dotenv');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

dotenv.config();

const getEntries = function (context, extension) {
    if (context[context.length - 1] !== '/') {
        context += '/';
    }

    extension = `.${extension}`;

    const files = glob.sync(`${context}**/*${extension}`);
    const entries = {};

    files.forEach((file) => {
        entries[file.replace(context, '').replace(extension, '')] = file;
    });

    return entries;
};

const htmlConfigs = [];
const pages = getEntries('./src/pages', 'html');
for (const pathname in pages) {
    // Configured to generate the html file, define paths, etc.
    const conf = {
        filename: path.resolve(__dirname, 'dist', `${pathname}.html`), // html output pathname
        template: path.resolve(__dirname, `${pages[pathname]}`), // Template path
        inject: true,
        // favicon: path.resolve(__dirname, '../src/assets/favicon.ico'),
        chunks: [pathname, 'base'],
    };

    htmlConfigs.push(new HtmlWebpackPlugin(conf));
}


module.exports = {
    mode: "development",
    entry: {
        base: './src/js/base.js',
        index: './src/js/index.js',
        search: './src/js/search.js',
        reactions: './src/js/reactions.js',
        entertainment: './src/js/entertainment.js',
        sports: './src/js/sports.js',
        artists: './src/js/artists.js',
        stickers: './src/js/stickers.js',
        item: './src/js/item.js',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                        },
                    },
                ],
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'url-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|obj)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                        },
                    },
                ],
            },
            {
                test: /\.txt$/i,
                use: 'raw-loader',
            },
        ]
    },
    plugins: [
        ...htmlConfigs,
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                GIPHY_API_KEY: JSON.stringify(process.env.GIPHY_API_KEY)
            }
        }),
    ]
};