"use strict";

var loaderUtils = require("loader-utils");
module.exports = function GloabExposeLoader(content) {
  if (this.cacheable) {
    this.cacheable();
  }
  var query = loaderUtils.getOptions(this);
  //   {"Button":"window.antd.Button","Alert":"window.antd.Alert"}
  var istGlobal = "";
  Object.keys(query).forEach(function (key) {
    var exposedV = query["" + key];
    istGlobal += "window." + key + " = " + exposedV + ";";
  });
  var result = content + ";" + istGlobal;
  return result;
};
