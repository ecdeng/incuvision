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
		},
		zPos: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	});

	// Foreign Key associations
	Position.associate = function(models) {
		this.hasMany(models.Image, {
			foreignKey: {
				name: 'positionId',
				allowNull: false
			}
		});
	}
	
	// Position now has access to getters and setters for associated Images

	return Position;
};