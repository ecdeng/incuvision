module.exports = function (sequelize, DataTypes) {
	const JobCommand = sequelize.define('JobCommand', {
		time: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		positionId: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});
	
	return JobCommand;
};