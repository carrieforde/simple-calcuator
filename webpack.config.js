/* eslint-disable */
const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  StyleLintPlugin = require('stylelint-webpack-plugin'),
  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argv) => ({
  context: __dirname,
  entry: ['./src/index.js', './src/style.css'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.css']
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: '/node_modules/',
        test: /\.js$/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              indent: 'postcss',
              plugins: [
                require('autoprefixer')({ browsers: 'last 2 versions' }),
                require('css-mqpacker')({ sort: true })
              ]
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join('./src', 'index.html'),
      filename: argv.mode === 'production' ? '../index.html' : 'index.html'
    }),
    new StyleLintPlugin({
      context: './src',
      files: '**/*.css'
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' })
  ],
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new UglifyJsPlugin()]
  }
});
