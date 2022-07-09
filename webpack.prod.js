const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerWebpackPlugin(), new TerserPlugin()],
  },
  output: {
    filename: "main.[contenthash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /.js$/i,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /.(css|sass|scss)$/i,
        exclude: /styles.css$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /styles.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /.html$/i,
        loader: "html-loader",
        options: {
          minimize: false,
          sources: false,
        },
      },
      {
        test: /.(png|jpg|svg|gif)$/i,
        loader: "file-loader",
        loader: "url-loader",
        options: { esModule: false },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      //* Aqui aplicamos el nombre que va a contener el archivo css
      filename: "[name].[contenthash].css",

      //* Esto es para que no nos tire unos warning
      ignoreOrder: true,
    }),
    new CopyPlugin({
      patterns: [{ from: "src/assets/", to: "assets/" }],
    }),
  ],
};
