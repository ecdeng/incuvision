module.exports = function (sequelize, DataTypes) {
	const JobCommand = sequelize.define('JobCommand', {
		time: {
			type: DataTypes.STRING,
			allowNull: false
		},
		positionId: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});

    // TODO: Decide if formal association between JobCommands and Positions is desirable / necessary
	// Foreign Key associations
	// JobCommand.associate = function(models) {
	// 	this.hasMany(models.Position, {
	// 		foreignKey: {
	// 			name: 'jobCommandId',
	// 			allowNull: true
	// 		}
	// 	});
	// }
	
	// JobCommand now has access to getters and setters for associated Positions

	return JobCommand;
};