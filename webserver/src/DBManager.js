const Sequelize  = require('sequelize');

var sequelize = null;
if (process.env.DATABASE_URL) {
	// the application is executed on Heroku ... use the postgres database
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		ssl: true,
		logging:  true //false
	});
} else {
	// the application is executed on the local machine ... use mysql
	sequelize  = new Sequelize('incuvision', 'root', '', {
    dialect: 'mysql',
    host: "localhost",
    port: "3306"
	});
}

var models = [
		'User',
		'Experiment',
		'Image',
		'Position',
		'Job'
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
