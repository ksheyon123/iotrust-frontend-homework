const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  // Determine environment file based on ENV parameter or mode
  let envFile = ".env.local"; // default

  if (env && env.ENV) {
    // Use specific environment file when ENV is provided
    envFile = `.env.${env.ENV}`;
  } else if (isProduction) {
    envFile = ".env.prod";
  }

  // Load environment variables
  const envVars =
    dotenv.config({ path: path.resolve(__dirname, envFile) }).parsed || {};

  return {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "[name].[contenthash].js" : "[name].js",
      clean: true,
      publicPath: "/",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@/components": path.resolve(__dirname, "src/components"),
        "@/pages": path.resolve(__dirname, "src/pages"),
        "@/utils": path.resolve(__dirname, "src/utils"),
        "@/hooks": path.resolve(__dirname, "src/hooks"),
        "@/types": path.resolve(__dirname, "src/types"),
        "@/assets": path.resolve(__dirname, "src/assets"),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "index.html",
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(envVars),
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public",
            to: ".",
            globOptions: {
              ignore: ["**/index.html"], // index.html은 HtmlWebpackPlugin에서 처리하므로 제외
            },
          },
        ],
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      compress: true,
      port: 3000,
      hot: true,
      open: true,
      historyApiFallback: true,
    },
    devtool: isProduction ? "source-map" : "eval-source-map",
  };
};
