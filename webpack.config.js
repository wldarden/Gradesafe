/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const WebpackMd5Hash = require('webpack-md5-hash')

const APP_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const VERSION = process.env.VERSION ? process.env.VERSION : '1'

const API_BASE_URI = process.env.API_URI || ''

const filenameTemplate = APP_ENV === 'development' ? '[name]' : '[name].[chunkhash]'

const extractCSS = new ExtractTextPlugin(filenameTemplate + '.css')
const resolveUrlLoader = {loader: "resolve-url-loader", options: {absolute: true}}

const execSync = require('child_process').execSync

const exSync = command => String(execSync(command)).replace(/[\n\r]+/g, '')
const gitTime = exSync('git log -1 --format=%cd --date=iso')
const gitCommit = exSync('git rev-parse HEAD')
const gitBranch = exSync('git rev-parse --abbrev-ref HEAD')
const gitVersion = `${gitBranch} - ${gitCommit} - ${gitTime}`

var plugins = [
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.$": "jquery",
    "window.jQuery": "jquery",
    "L": "leaflet"
  }),
  extractCSS,
  new webpack.DefinePlugin({
    APP_ENV: JSON.stringify(APP_ENV),
    NODE_ENV: JSON.stringify(APP_ENV),
    VERSION: JSON.stringify(VERSION),
    'process.env.NODE_ENV': JSON.stringify(APP_ENV),
    'global.NODE_ENV': JSON.stringify(APP_ENV),
    'global.VERSION': JSON.stringify(VERSION),
    'global.API_URI': JSON.stringify(API_BASE_URI),
    'global.gitVersion': JSON.stringify(gitVersion),
    'global.buildTimestamp': JSON.stringify((new Date()).toISOString())
  }),
  new HtmlWebpackPlugin({
    title: `Gradesafe`,
    template: 'src/index.ejs'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module) {
      return module.context && module.context.indexOf('node_modules') !== -1
    }
  }),
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'manifest',
  //   minChunks: Infinity
  // }),
  // new webpack.optimize.ModuleConcatenationPlugin()
]

switch (APP_ENV) {
  case 'production':
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin());
    break
  case 'sandbox':
  case 'ci':
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
    // plugins.push(new webpack.optimize.UglifyJsPlugin());
    break
  case 'sandbox-live':
  case 'development':
  case 'staging':
    plugins.push(new webpack.NamedModulesPlugin())
    break
  default:
    break
}

var config = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8088',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: filenameTemplate + '.js'
  },
  devServer: {
    historyApiFallback: true,
    inline: false,
    port: 8088,
    hot: true
  },
  resolve: {
    modules: [
      path.resolve('./'),
      "node_modules"
    ],
    alias: {
      "ag-grid-root" : __dirname + "/node_modules/ag-grid",
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        include: [path.join(__dirname, 'src')],
      },
      {
        test: /\.css$/,
        loader: extractCSS.extract({fallback: 'style-loader', use: ['css-loader']})
      },
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader", resolveUrlLoader]},
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: ["file-loader"]},
      { test: /\.mp3$/, use: ["file-loader"]},
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: [{loader: "url-loader", options: {limit: 10000, mimetype: "application/font-woff"}}]},
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: [{loader: "url-loader", options: {limit: 10000, mimetype: "application/octet-stream"}}]},
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: [{loader: "url-loader", options: {limit: 10000, mimetype: "image/svg+xml"}}]},
      { test: /\.(png|jpg|gif)$/, use: [{loader: "url-loader", options: {limit: 8192}}]},
      {test: /\.csv?$/, use: ['dsv-loader']}
    ]
  },
  plugins: plugins,
  node: {
    fs: 'empty'
  },
  externals: [
    {'./cptable': 'var cptable'},
    {'./jszip': 'jszip'}
  ],
}

if (APP_ENV === 'production' || APP_ENV === 'staging' || APP_ENV === 'sandbox' || APP_ENV === 'ci') {
  config.entry = [
    'babel-polyfill',
    './src/index.js'
  ];
}

process.noDeprecation = true

module.exports = config
