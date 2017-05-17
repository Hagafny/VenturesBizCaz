const path = require('path');
const webpack = require('webpack');
module.exports = {
    context: path.resolve(__dirname, 'public'),
    entry: {
        app: './main.js',
    },
    output: {
        path: path.resolve(__dirname, './public/dist'),
        filename: 'bizcaz.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] },
                }],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.js$/, // include .js files
                exclude: [/node_modules/, /vendor/], // exclude any and all files in the node_modules folder
                use: [
                    {
                        loader: "jshint-loader",
                        options: { camelcase: true, emitErrors: false, failOnHint: false, esversion: 6 }
                    }
                ]
            }
        ]
    }
};