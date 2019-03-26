module.exports = function (sequelize, DataTypes) {
	const Experiment = sequelize.define('Experiment', {
		experimentId: {
			type: DataTypes.INTEGER,
			unique: true,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	// Foreign Key associations
	Experiment.associate = function(models) {
		this.hasMany(models.Position, {
			foreignKey: {
				name: 'experimentId',
				allowNull: true
			}
		});
		this.hasMany(models.Image, {
			foreignKey: {
				name: 'experimentId',
				allowNull: true
			}
		});
	}
	
	//Experiment now has access to getPositions, setPositions and getImages, setImages

	return Experiment;
};