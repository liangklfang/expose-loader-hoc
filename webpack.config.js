const path = require("path");
const webpack = require("webpack");
const ExposeWindowPlugin = require("./ExposeWindowPlugin.js");
const RequirePlusLoader = require('./RequirePlusLoader.js');
module.exports = {
  //   entry: path.join(__dirname, "./test.js"),
  plugins: [
    new ExposeWindowPlugin({
      Button: "window.antd.Button",
      Alert: "window.antd.Alert"
    })
  ],
  module: {
    noParse: [/jquery/],
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
        // 最后使用的是babel-loader
          {
            loader: require.resolve("babel-loader"),
            options: {}
          },
          {
            loader:require.resolve('./RequirePlusLoader.js'),
            options:{
               antd:'antd',
               jquery:'jQuery'
            }
          }
        ]
      },
        {
          test: require.resolve(
            "/Users/qinliang.ql/Desktop/expose-loader-hoc/node_modules/_antd@3.3.1@antd/es/index.js"
          ),
          //此时我们window.antd与window.ANTD都是存在的
          use: [
            {
              loader: require.resolve("expose-loader"),
              options: "antd"
            },
            {
              loader: require.resolve("expose-loader"),
              options: "ANTD"
            }
          ]
        },
        {
          test: require.resolve("antd"),
          //此时我们window.antd与window.ANTD都是存在的
          use: [
            {
              loader: require.resolve("expose-loader"),
              options: "antd"
            },
            {
              loader: require.resolve("expose-loader"),
              options: "atd"
            }
          ]
        },
        {
          test: require.resolve("lodash"),
          //此时我们window.antd与window.ANTD都是存在的
          use: [
            {
              loader: require.resolve("expose-loader"),
              options: "_"
            },
            {
              loader: require.resolve("expose-loader"),
              options: "LODASH"
            }
          ]
        },
        {
          test: require.resolve("jquery"),
          //此时我们window.antd与window.ANTD都是存在的
          use: [
            {
              loader: require.resolve("expose-loader"),
              options: "jQuery"
            },
            {
              loader: require.resolve("expose-loader"),
              options: "$"
            }
          ]
        },
        {
          test: require.resolve("react"),
          //此时我们window.antd与window.ANTD都是存在的
          use: [
            {
              loader: require.resolve("expose-loader"),
              options: "React"
            },
            {
              loader: require.resolve("expose-loader"),
              options: "react"
            }
          ]
        },
        {
          test: require.resolve("react-dom"),
          //此时我们window.antd与window.ANTD都是存在的
          use: [
            {
              loader: require.resolve("expose-loader"),
              options: "ReactDOM"
            },
            {
              loader: require.resolve("expose-loader"),
              options: "reactDom"
            }
          ]
        }
    ]
  },
  //此时我们通过require("antd");就会将antd的所有的组件都暴露到window对象上
  resolve: {
    alias: {
      utils: path.resolve(__dirname, "./utils")
    }
  },
  devServer: {
    publicPath: "/",
    open: true,
    port: 8090,
    contentBase: false,
    hot: false
  }
};
