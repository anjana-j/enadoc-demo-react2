const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist')
};

const config = {
  devtool: 'hidden-source-map',

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: 'localhost',
    port: 3000
  },

  entry: {
    vendor: ['./src/assets/js/vendor.js'],
    app: ['babel-polyfill','./src/assets/js/app.js']
  },

  output: {
    path: PATHS.dist,
    filename: './assets/js/[name].min.js'
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css'],
    alias: {
      images: path.resolve(__dirname, 'src/assets/images')
    }
  },

  module: {
    rules: [
      /* styles loader */
      {
        test: /\.(scss|sass|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  require('autoprefixer', {
                    browsers: ['last 2 versions', 'ie >= 9']
                  })
                ];
              },
              sourceMap: true
            }
          },
          {
            loader: 'fast-sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },

      /* img loader */
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        exclude: [path.resolve(__dirname, './src/assets/fonts')],
        use: 'file-loader?name=./assets/images/[name].[ext]'
      },

      /* js loader */
      {
        test: /\.(js|jsx)$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env','react','stage-2']
            }
          }
        ]
      },
    ]
  },

  plugins: [
    // HTML TEMPLATES
    new HtmlWebpackPlugin({
      title: 'Enadoc - Blockchain Project',
      chunks: ['vendor', 'app'],
      template: './src/index.html'
    }),

    // new HtmlWebpackPlugin({
    //     filename: 'about.html',
    //     title: 'Pilot Project - About',
    //     chunks: ['vendor', 'about'],
    //     template: './src/about.html'
    // }),

    new MiniCssExtractPlugin({
      filename: './assets/css/[name].min.css'
    })
  ]
};

module.exports = config;





// new BrowserSyncPlugin(
//   {
//     host: 'localhost',
//     port: 3000,
//     proxy: 'http://localhost:8080/'
//   },
//   { reload: false }
// )