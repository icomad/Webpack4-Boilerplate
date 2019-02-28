const path = require('path');

module.exports = {
  entry: [path.join(__dirname + '/src/js/index.js'), path.join(__dirname + '/src/sass/main.scss')],
  output: {
    path: path.join(__dirname, 'build/assets/'),
    filename: 'js/bundle.js',
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
              name: 'css/[name].css',
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
      }
    ]
  }
};