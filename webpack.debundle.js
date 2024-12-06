// !IMPORTANT: ESTE FICHEIRO TÁ BUGADO E ELIMINA TUDO O QUE ESTÁ DENTRO DA PASTA SRC

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
          to: path.resolve(__dirname, "src/.js"),
        },
      ],
    }),
  ],
};
