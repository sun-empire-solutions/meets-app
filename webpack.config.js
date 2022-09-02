const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");
const { NetlifyPlugin } = require("netlify-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = (_, argv) => {
  let envKeys = {};
  const isDevelopment = argv.mode === "development";
  if (isDevelopment) {
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
        title: "MeetsApp",
        template: "./public/index.html",
        favicon: "./public/favicon.png",
      }),
      new WorkboxPlugin.GenerateSW({
        // these options encourage the ServiceWorkers to get in there fast
        // and not allow any straggling "old" SWs to hang around
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
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
      ...getPWAPlugins(isDevelopment),
    ],
    devServer: {
      port: 4200,
      open: true,
      historyApiFallback: true,
    },
  };
};

const getPWAPlugins = (isDevelopment) =>
  [
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
    }),
    new WebpackPwaManifest({
      name: "MeetsApp",
      short_name: "MeetsApp",
      description: "Video call app designed for meetups",
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
      theme_color: "#383843",
    }),
  ].filter(() => !isDevelopment);
