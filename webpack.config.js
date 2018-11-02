const path = require('path')
const fs = require('fs')
const del = require('del')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const WebpackOnBuildPlugin = require('on-build-webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const dateFns = require('date-fns')

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

const package = require('./package.json')

const project = {
  name: package.name,
  description: `The responsive theme for ${package.name}`,
  website: package.homepage,
}

const saveVersioningToDisk = (dist) => {
  if (!fs.existsSync(dist)) return
  let timestamp = Math.floor(Date.now() / 1000)
  fs.writeFileSync(dist + '/.version', timestamp)
}


//===============================================================/
//  =config
//===============================================================/

const config = {}

config.entry = {
  main: [
    path.resolve(__dirname, 'src/app.js'),
    path.resolve(__dirname, 'src/scss/styles.scss')
  ],
  editor: [path.resolve(__dirname, 'src/scss/editor.scss')],
},

config.output = {
  filename: '[name]-bundle.js',
  chunkFilename: '[name]-[chunkhash].js',
  path: path.resolve(__dirname, 'dist'),
  publicPath: './dist/'
}

config.resolve = {
  alias: {
    block: path.resolve(__dirname, 'src/js/block/'),
    img: path.resolve(__dirname, 'src/img/'),
    layout: path.resolve(__dirname, 'src/js/layout/'),
    module: path.resolve(__dirname, 'src/js/module/'),
    page: path.resolve(__dirname, 'src/js/page/'),
    polyfill: path.resolve(__dirname, 'src/js/polyfill/'),
    scss: path.resolve(__dirname, 'src/scss/'),
    util: path.resolve(__dirname, 'src/js/util/'),
  },
}

config.module = {
  rules: [
    {
      test: /\.(sass|scss)$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [ 'css-loader', 'postcss-loader', 'sass-loader' ],
      }),
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2|ico|png|jpg|gif)$/,
      exclude: /node_modules/,
      loader: 'file-loader',
      options: {
        name: '[path][name]-[hash].[ext]'
      }
    },
    {
      exclude: [/node_modules\/(?!(swiper|dom7)\/).*/, /\.test\.jsx?$/],
      test: /\.jsx?$/,
      use: [{ loader: 'babel-loader' }],
    },
    {
      test: /\.js/,
      use: [ 'babel-loader?cacheDirectory' ],
      exclude: /node_modules/,
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        // eslint options (if necessary)
      }
    },
  ],
}

config.watch = isDev

config.devtool = isDev ? 'eval-source-map' : 'source-map'

config.plugins = [
  new CleanWebpackPlugin(config.output.path),

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),

  // move files
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, 'src/static'),
      to: path.resolve(__dirname, 'dist/static')
    }
  ]),

  // generate .version file
  new WebpackOnBuildPlugin((stats) => {
      saveVersioningToDisk(config.output.path)
  }),

  // add header
  new webpack.BannerPlugin(`
      Name: ${project.name}
      Description: ${project.description}
      website: ${project.website}
      lastUpdate: ${dateFns.format(new Date(), 'DD/MM/YY @ mm:ss')}
    `),

  new ExtractTextPlugin('[name]-bundle.css')
]

if (isProd) {
  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      minChunks: 2
    }),
    new UglifyJsPlugin(),
  )
}

module.exports = config
