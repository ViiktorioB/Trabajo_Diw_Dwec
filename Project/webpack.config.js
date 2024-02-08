"use strict";

const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/js/main.js",
    profile: "./src/js/profile.js",
    apiMaps: "./src/js/apiMaps.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 8083,
    hot: true,
  },
  plugins: 
  [new HtmlWebpackPlugin({
    template: "./src/manu.html",
    filename: 'index.html',
    chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: "./src/perfil.html",
      filename: 'perfil.html',
      }),
      new HtmlWebpackPlugin({
        template: "./src/reservas.html",
        filename: 'reservas.html',
        }),
        new HtmlWebpackPlugin({
          template: "./src/crud.html",
          filename: 'crud.html',
          })
],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".scss"],
  },
};
