const consts = require('./consts.js');
const MAX_MOTOR_VAL = 50000;

isValidPointStr = function(pointStr) {
    pointStr = pointStr.trim();
    if (pointStr.length < 5 || 
        pointStr[0] != '(' || 
        pointStr[pointStr.length - 1] != ')') {
        return false;
    }
    pointStr = pointStr.substring(1, pointStr.length - 1);
    pointArr = pointStr.split(',');
    if (pointArr.length != 2) {
        console.log('Error: The point to move to is not a tuple');
        return false;
    }
    xStr = pointArr[0].trim();
    yStr = pointArr[1].trim();

    if (isNaN(xStr) || isNaN(yStr)) {
        console.log('Error: The point to move to is not an integer');
        return false;
    }

    x = parseInt(xStr);
    y = parseInt(yStr);
    if (Math.abs(x) > MAX_MOTOR_VAL || Math.abs(y) > MAX_MOTOR_VAL) {
        console.log('Error: The point to move to is out of range');
        return false;
    }
    return true;
}

moveStrToTuple = function(pointStr) {
    pointStr = pointStr.trim();
    pointStr = pointStr.substring(1, pointStr.length - 1);
    pointArr = pointStr.split(',');
    return [parseInt(pointArr[0]), parseInt(pointArr[1])];
}

emit_move_command = function(io, app, msg) {
    console.log('received web-command');
    if (!isValidPointStr(msg)) {
      io.emit(consts.client_error_status_sroute, consts.invalid_move_str_err);
      return;
    }
    if (app.locals.move_in_progress) {
      io.emit(consts.client_error_status_sroute, consts.move_collision_err);
      return;
    }
    console.log(`emitting move-command: ${msg}`);
    app.locals.move_in_progress = true;
    app.locals.move_str_in_progress = msg;
    io.emit(consts.server_move_request_sroute, msg);
}

module.exports.isValidPointStr = isValidPointStr;
module.exports.moveStrToTuple = moveStrToTuple;
module.exports.emit_move_command = emit_move_command;