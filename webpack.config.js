const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");
const { NetlifyPlugin } = require("netlify-webpack-plugin");
var WebpackPwaManifest = require("webpack-pwa-manifest");

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
      new WebpackPwaManifest({
        name: "MeetsApp",
        short_name: "MeetsApp",
        description: "Video call app designed for meetups",
        background_color: "#1f2028",
        icons: [
          {
            src: path.resolve("src/assets/icons/icon.png"),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          },
          // {
          //   src: path.resolve("src/assets/large-icon.png"),
          //   size: "1024x1024", // you can also use the specifications pattern
          // },
          // {
          //   src: path.resolve("src/assets/maskable-icon.png"),
          //   size: "1024x1024",
          //   purpose: "maskable",
          // },
        ],
        start_url: "/",
        background_color: "#1f2028",
        display: "standalone",
        scope: "/",
        theme_color: "#00bad6",
      }),
    ],
    devServer: {
      port: 4200,
      open: true,
      historyApiFallback: true,
    },
  };
};
