const custom_utils = require('../utils.js');
var app = require('express')();

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

	const Op = sequelize.Op;
	const io = app.get('io');

	JobCommand.callMove = function() {
		// call move here on moveToMake (adjust for whatever args move requires)
		let moveToMake = JobCommand.min('time');
		var position = Position.getById(moveToMake.positionId);
		var position_string = `(${position.xPos},${position.yPos})`;
		custom_utils.emit_move_command(io, app, position_string);

		// remove completed move from DB
		JobCommand.destroy({
			where: {
			time: {
				[Op.lt]: Date.now()
			}
			}
		});

		// set timer to next move
		var soonestMove = JobCommand.min('time').then(min => {});
		var timeTillMove = soonestMove - Date.now();
		setTimeout(function() { JobCommand.callMove(); }, timeTillMove);
	}
	
	return JobCommand;
};