// !IMPORTANT: Não dá actually debundle, apenas copia o bundle.min.js para outra pasta

const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {},
  output: {
    path: path.resolve(__dirname, "src"),
    clean: true,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/bundle.min.js"),
          to: path.resolve(__dirname, "debundle/index.js"),
        },
      ],
    }),
  ],
};
