const path = require('path')
const Dotenv = require('dotenv-webpack')
const TerserPlugin = require('terser-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StyleLintWebpackPlugin = require('stylelint-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: NODE_ENV,
  performance: { hints: isDev ? false : 'warning' },
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  entry: {
    'js/app': path.resolve(__dirname, 'src/scripts/app.js'),
    'css/app': path.resolve(__dirname, 'src/styles/app.css'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, `.env.${NODE_ENV}`),
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            {
              source: 'src/assets/',
              destination: 'dist/assets/',
            },
          ],
        },
      },
    }),
    isDev &&
      new StyleLintWebpackPlugin({
        configFile: path.resolve(__dirname, '.stylelintrc.js'),
        files: ['src/styles/**/*.css'],
        fix: true,
      }),
    new MiniCssExtractPlugin(),
  ].filter(Boolean),
  ...(!isDev && {
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: { drop_console: true },
          },
        }),
        new CssMinimizerPlugin(),
      ],
    },
  }),
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|wepb|svg)$/i,
        type: 'asset',
      },
      {
        test: /\.woff2$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  stats: {
    assets: false,
    children: false,
    chunks: false,
    hash: false,
    modules: false,
    publicPath: false,
    timings: false,
    version: false,
    warnings: true,
    colors: {
      green: '\u001b[32m',
    },
  },
}
