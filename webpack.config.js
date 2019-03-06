const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function pugPage(name) {
  return new HtmlWebpackPlugin({
    filename: name + '.html',
    template: path.join(__dirname + `/src/${name}.pug`),
    inject: false
  })
}

module.exports = {
  entry: [path.join(__dirname + '/src/js/index.js'), path.join(__dirname + '/src/sass/main.scss')],
  output: {
    path: path.join(__dirname, '/build/'),
    filename: 'assets/js/bundle.js',
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
    pugPage('index'),
    pugPage('about')
  ],
};