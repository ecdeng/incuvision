module.exports = function (sequelize, DataTypes) {
	const Image = sequelize.define('Image', {
		imageId: {
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
		timestamp: {
			type: DataTypes.DATE,
			allowNull: false
		},
		filepath: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	return Image;
};