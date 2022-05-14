const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");

module.exports = () => {
  // call dotenv and it will return an Object with a parsed key
  const env = dotenv.config().parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: {
      main: "./src/index.tsx",
      styles: "./src/styles/index.css",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "build"),
      clean: true,
    },
    module: {
      rules: [
        { test: /\.tsx?$/i, loader: "babel-loader" },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(jpe?g|png|gif|svg|icon)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "./public/index.html" }),
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
      new webpack.DefinePlugin(envKeys),
    ],
    devServer: {
      port: 3000,
      open: true,
    },
  };
};
