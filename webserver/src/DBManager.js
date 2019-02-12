const Sequelize  = require('sequelize');

var sequelize = new Sequelize('incuvision', 'root', '', {
    dialect: 'mysql',
    host: "localhost",
    port: "3306"
});

var models = [
    'User'
];

var modelObj = {};

models.forEach(function(model) {
  modelObj[model] = sequelize.import('models' + '/' + model);
});

Object.keys(modelObj).forEach((modelName) => {
  if (modelObj[modelName].associate) {
    modelObj[modelName].associate(modelObj);
  }
});

models.forEach(function(model) {
  module.exports[model] = modelObj[model];
});

sequelize.sync()

module.exports.sequelize = sequelize
