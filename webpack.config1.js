const path = require("path");
const resolve = require('resolve');
const webpack = require('webpack');
const antdPath = require.resolve('antd');
// Users/qinliang.ql/Desktop/expose-loader-hoc/node_modules/_antd@3.0.0@antd/lib/index.js
// antd下的dist目录全部是打包好的antd资源
const rules = [];
rules.push(
{
 test: require.resolve('antd'),
            //此时我们window.antd与window.ANTD都是存在的
    use: [{
        loader: require.resolve('expose-loader'),
        options: 'antd'
    },{
        loader: require.resolve('expose-loader'),
        options: 'ANTD'
    }]
},
// 暴露jquery
{
  test:require.resolve('jquery'),
  use: [
    {
      loader: require.resolve("expose-loader"),
      options: "jQuery"
    }
  ]
},
{
  test:require.resolve('react'),
  use: [
    {
      loader: require.resolve("expose-loader"),
      options: "React"
    }
  ]
},
{
  test:require.resolve('react-dom'),
  use: [
    {
      loader: require.resolve("expose-loader"),
      options: "ReactDOM"
    }
  ]
},
{
  test: path.join(__dirname, "./SearchForm.js"),
  use: [
    {
      loader: require.resolve("expose-loader"),
      options: "SearchForm"
    }
  ]
});

module.exports = {
  module: {
    rules
  },
  // resolve: {
  //     alias: {
  //       "antd" :"antd"
  //     },
  //   },
  plugins:[]
};

// new webpack.ProvidePlugin({
//       "window.react": "react"
//   })

// new webpack.optimize.MinChunkSizePlugin({
//         minChunkSize: 1000
//       })
// OK
