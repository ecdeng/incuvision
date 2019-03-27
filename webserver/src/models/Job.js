module.exports = function (sequelize, DataTypes) {
	const Job = sequelize.define('Job', {
		jobId: {
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
		frequency: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		startDate: {
			type: DataTypes.DATE,
			allowNull: false
		},
		endDate: {
			type: DataTypes.DATE,
			allowNull: false
		}
	});

	// Foreign Key associations
	Job.associate = function(models) {
		this.hasMany(models.Position, {
			foreignKey: {
				name: 'jobId',
				allowNull: true
			}
		});
	}
	
	// Job now has access to getters and setters for associated Positions

	return Job;
};