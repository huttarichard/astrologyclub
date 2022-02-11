const path = require("path")
const glob = require("glob")
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

module.exports = {
  entry: {
    "bundle.js": glob.sync("build/static/?(js|css)/main.*.?(js|css)").map(f => path.resolve(__dirname, f)),
  },
  output: {
    filename: "bundle.min.js",
    path: path.resolve(__dirname, 'build/static/js'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // plugins: [new UglifyJsPlugin()],
}