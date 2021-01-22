const path = require("path");

module.exports = {
  entry: "./src/app.tsx",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/public"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
  },
};
// Finish setup
