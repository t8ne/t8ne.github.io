const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

//For building bundle: npx webpack --config webpack.config.js
//For working on bundle: prettier --write src/bundle.min.js

module.exports = {
  mode: "production",
  entry: {
    main: ["./src/bundle.min.js"],
  },
  output: {
    filename: "bundle.min.js",
    path: path.resolve(__dirname, "src"),
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
      chunks: ["main"],
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, "src/assets"), to: "assets" }],
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, "src/previous"), to: "previous" }],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,
          mangle: {
            toplevel: true,
          },
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  devtool: "source-map",
};