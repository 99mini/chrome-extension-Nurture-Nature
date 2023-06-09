const path = require("path");

module.exports = {
  entry: "./src/popup/popup.js",
  output: {
    filename: "content.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  // mode: "development",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
