module.exports = function (sequelize, DataTypes) {
	const Position = sequelize.define('Position', {
		positionId: {
			type: DataTypes.INTEGER,
			unique: true,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		xPos: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		yPos: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});

	// Foreign Key associations
	// Position.belongsTo(Experiment, {
	// 	foreignKey: {
	// 		name: 'positionId',
	// 		allowNull: true
	// 	}
	// });

	Position.hasMany(Image, {
		foreignKey: {
			name: 'positionId',
			allowNull: false
		}
	});

	return Position;
};