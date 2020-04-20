const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: "umd",
    library: ["JSONSchema"],
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015", "stage-0", "react"],
            plugins: [
              "transform-class-properties",
              ["import", { libraryName: "antd", style: false }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] }
    ]
  },
  plugins: [new ExtractTextPlugin("index.css")],
  externals: [
    {
      react: {
        commonjs: "react",
        commonjs2: "react",
        amd: "react",
        root: ["React"]
      }
    },
    {
      "react-redux": {
        commonjs: "react-redux",
        commonjs2: "react-redux",
        amd: "react-redux"
      }
    },
    {
      underscore: {
        commonjs: "underscore",
        commonjs2: "underscore",
        amd: "underscore",
        root: ["_"]
      }
    },
    {
      brace: {
        commonjs: "brace",
        commonjs2: "brace",
        amd: "brace",
        root: ["ace"]
      }
    },
    { moox: { commonjs: "moox", commonjs2: "moox", amd: "moox" } },
    {
      "react-dom": {
        commonjs: "react-dom",
        commonjs2: "react-dom",
        amd: "react-dom",
        root: ["ReactDom"]
      }
    },
    { redux: { commonjs: "redux", commonjs2: "redux", amd: "redux" } },
    {
      "prop-types": {
        commonjs: "prop-types",
        commonjs2: "prop-types",
        amd: "prop-types"
      }
    },
    { antd: { commonjs: "antd", commonjs2: "antd", amd: "antd" } }
  ]
};
