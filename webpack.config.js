var webpack = require('webpack')

module.exports = {
    devtool: 'cheap-eval-source-map',
    entry: {
        index: ['./index.js'],
    },
    output: {
        path: './lib',
        publicPath: '/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel'
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
    ]
}
