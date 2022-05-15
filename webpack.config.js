const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");
const webpack = require("webpack");

module.exports = (_, argv) => {
  const currentPath = path.join(__dirname);
  const basePath = currentPath + "/.env";
  const envPath = basePath + "." + argv.mode;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    entry: {
      main: "./src/index.tsx",
      styles: "./src/styles/index.scss",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
      clean: true,
    },
    module: {
      rules: [
        { test: /\.tsx?$/i, loader: "babel-loader" },
        {
          test: /\.s?css$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
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
      port: 4200,
      open: true,
      historyApiFallback: true,
    },
  };
};
