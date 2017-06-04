const path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: ["babel-polyfill","./frontEnd/app/js/entry"],
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-latest']
                    }
                }],
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                            {
                                loader: 'css-loader',
                                //options: { minimize: true}
                            },
                        'sass-loader',
                    ]
                })
            },
            {
                test: /\.ttf$/,
                use:[{
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                        publicPath:"./"
                    }
                }]
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin({
            filename:"styles.css",
            allChunks:true
        }),
        new UglifyJsPlugin({
            sourceMap: true
        })
    ],
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, './frontEnd/app/js_depl/'),
        publicPath: './frontEnd/app/js_depl/',
        filename: "bundle.js",
    }
};
