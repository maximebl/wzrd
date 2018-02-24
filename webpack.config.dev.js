// import path from 'path';
// import webpack from 'webpack';
var path = require('path');
var webpack = require('webpack');

module.exports = {
    debug: true,
    devtool: 'inline-source-map',
    noInfo: false,
    entry: [
        'webpack-hot-middleware/client',
        path.resolve(__dirname, 'src/index')
    ],
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'src'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        // rules: [
        //     {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        // ],
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
            {test: /\.css$/, loaders: ['style', 'css']}
        ]
    }
}
