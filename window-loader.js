const loaderUtils = require("loader-utils");
module.exports = function GloabExposeLoader(content) {
  if (this.cacheable) {
    this.cacheable();
  }
  const query = loaderUtils.getOptions(this);
  //   {"Button":"window.antd.Button","Alert":"window.antd.Alert"}
  let istGlobal = ``;
  Object.keys(query).forEach(key => {
    const exposedV = query[`${key}`];
    istGlobal += `window.${key} = ${exposedV};`;
  });
  const result = `${content};${istGlobal}`;
  return result;
};
