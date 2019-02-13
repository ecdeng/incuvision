module.exports = function (sequelize, DataTypes) {
	const Experiment = sequelize.define('Experiment', {
		experimentId: {
			type: DataTypes.INTEGER,
			unique: true,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	// Foreign Key associations
	Experiment.hasMany(Position, {
		foreignKey: {
			name: 'experimentId',
			allowNull: false
		}
	});
	Experiment.hasMany(Image, {
		foreignKey: {
			name: 'experimentId',
			allowNull: false
		}
	});
	//Experiment now has access to getPositions and getImages

	return Experiment;
};