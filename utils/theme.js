const header = require("../utils/defaultHeader");
const footer = require("../utils/defaultFooter");

exports.createDefaultThemeObject = themeOptions => {
  const themeObj = Object.assign({}, themeOptions);
  themeObj.header = {
    is_active: false,
    template: header
  };
  themeObj.footer = {
    is_active: false,
    template: footer
  };
  return themeObj;
};
