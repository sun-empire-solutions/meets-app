const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");
const { NetlifyPlugin } = require("netlify-webpack-plugin");

module.exports = (_, argv) => {
  let envKeys = {};
  if (argv.mode === "development") {
    // call dotenv and it will return an Object with a parsed key
    const env = dotenv.config().parsed;

    // reduce it to a nice object, the same as before
    envKeys = Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {});
  }

  return {
    entry: {
      main: "./src/index.tsx",
      styles: "./src/styles/index.scss",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        "@/app": path.resolve(__dirname, "src"),
        "@/components": path.resolve(__dirname, "src", "components"),
        "@/hooks": path.resolve(__dirname, "src", "hooks"),
        "@/context": path.resolve(__dirname, "src", "context"),
        "@/pages": path.resolve(__dirname, "src", "pages"),
        "@/types": path.resolve(__dirname, "src", "types"),
      },
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
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.png",
      }),
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
      new webpack.DefinePlugin(envKeys),
      new NetlifyPlugin({
        redirects: [
          {
            from: "/*",
            to: "/index.html",
            status: 200,
          },
        ],
      }),
    ],
    devServer: {
      port: 4200,
      open: true,
      historyApiFallback: true,
    },
  };
};
