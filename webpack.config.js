/* eslint no-undef: 1 */

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const debug = process.env.BABEL_ENV !== 'production';

const entryPoints = {
    vendor: [
        'babel-polyfill',
        'lodash._root',
        'lodash.debounce',
        'lodash.throttle',
        'prop-types',
        'react',
        'react-dom',
        'ramda'
    ],
    app: ['./src/app/index.jsx']
};

const rules = [
    {
        test: /\.jsx$|\.js$/,
        exclude: /(node_modules)/,
        include: path.join(__dirname, './src'),
        use: ['babel-loader']
    },
    {
        test: /\.(jpe?g|png|gif)$/i,
        use: 'url-loader?limit=8192&name=images/[name]-[hash].[ext]'
    },
    {
        test: /\.jsx$|\.js$/,
        enforce: 'pre',
        include: path.join(__dirname, './src'),
        use: [
            {
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            }
        ]
    },
    {
        test: /\.svg$/,
        loader: 'file-loader',
        query: {
            name: 'static/media/[name].[hash:8].[ext]'
        }
    },
    {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        })
    }
];

const eslint = {
    failOnWarning: false,
    failOnError: true
};

const output = {
    filename: 'js/app.js?[hash]'
};

const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'js/vendor.js?[hash]'
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.BABEL_ENV)
        }
    }),
    new webpack.LoaderOptionsPlugin({
        debug,
        noInfo: !debug,
        options: {
            context: __dirname,
            output: {path: './'},
            resolveLoader: {
                alias: {
                    images: `${__dirname}./src/images`
                }
            },
            eslint
        }
    }),
    new ExtractTextPlugin({
        filename: 'css/bundle.min.css?[hash]'
    })
];

if (debug) {
    entryPoints.vendor.push('webpack-hot-middleware/client?reload=true');
    output.path = '/';
    output.publicPath = '/';
    plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
    output.path = path.join(__dirname, './build');
    output.publicPath = '/';
    plugins.push(
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            output: {comments: false},
            sourceMap: true
        }),
        new HtmlWebpackPlugin({
            hash: !debug,
            filename: 'index.html',
            template: path.join(__dirname, './src/index.html'),
            path: path.join(__dirname, '../build'),
            publicPath: '/build/'
        })
    );
}

const resolve = {
    alias: {
        components: path.join(__dirname, './src/app/components'),
        containers: path.join(__dirname, './src/app/containers'),
        images: path.join(__dirname, './src/images'),
        tools: path.join(__dirname, './tools')
    },
    extensions: ['.js', '.jsx']
};


module.exports = {
    devtool: debug ? 'cheap-module-eval-source-map' : 'source-map',
    entry: entryPoints,
    target: 'web',
    output,
    module: {
        rules
    },
    plugins,
    resolve
};
