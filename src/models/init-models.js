var DataTypes = require("sequelize").DataTypes;
var _files = require("./files");

function initModels(sequelize) {
  var files = _files(sequelize, DataTypes);


  return {
    files,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
