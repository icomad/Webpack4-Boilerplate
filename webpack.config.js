const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function pugPage(name, devMode) {
  return new HtmlWebpackPlugin({
    filename: name + '.html',
    template: path.join(__dirname + `/src/${name}.pug`),
    inject: true,
    minify: {
      removeComments: !devMode,
      collapseWhitespace: !devMode
    }
  })
}

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';
  return {
    entry: path.join(__dirname + '/src/js/index.js'),
    output: {
      path: path.join(__dirname, '/build/'),
      filename: 'assets/js/bundle.js',
    },
    devtool: 'inline-source-map',
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: devMode
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            compact: true
          }
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/css/[name].css',
              }
            },
            {
              loader: 'extract-loader'
            },
            {
              loader: 'css-loader?-url'
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.pug$/,
          use: ['pug-loader']
        },
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      pugPage('index', devMode),
      pugPage('about', devMode),
      new CompressionPlugin()
    ],
  }
};