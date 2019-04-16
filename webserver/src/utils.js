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

moveIsOutOfBounds = function(move) {
    return move[0] < 0 || move[0] > consts.max_x_pos || move[1] < 0 || move[1] > consts.max_y_pos;
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
    if (app.locals.move_is_relative) {
        console.log('relative move');
        move = moveStrToTuple(msg);
        move[0] = move[0] + app.locals.abs_pos[0];
        move[1] = move[1] + app.locals.abs_pos[1];
        io.emit(consts.server_move_request_sroute, msg);
    } else {
        console.log('abs move');
        relative_move = [];
        move = moveStrToTuple(msg);
        if (moveIsOutOfBounds(move)) {
            io.emit(consts.client_error_status_sroute, consts.move_oob_err);
            console.log(`Move was out of bounds: ${msg}`);
            app.locals.move_in_progress = false;
            return;
        }
        relative_move[0] = move[0] - app.locals.abs_pos[0];
        relative_move[1] = move[1] - app.locals.abs_pos[1];
        app.locals.move_str_in_progress = `(${relative_move[0]}, ${relative_move[1]})`;
        io.emit(consts.server_move_request_sroute, app.locals.move_str_in_progress);
    }
}

handle_client_move = function(io, app, msg) {
    console.log('recieved server response');
    if (msg != consts.arduino_good_response_status) {
      io.emit(consts.client_error_status_sroute, consts.server_err);
      console.log(`A SERVER ERROR HAS OCCURED: ${msg}`);
      app.locals.move_in_progress = false;
      return;
    }
    move = moveStrToTuple(app.locals.move_str_in_progress);
    let new_x = app.locals.abs_pos[0] + move[0];
    let new_y = app.locals.abs_pos[1] + move[1];
    app.locals.abs_pos = [new_x, new_y];
    app.locals.move_in_progress = false;
    new_pos_string = `(${new_x}, ${new_y})`;
    io.emit(consts.client_error_status_sroute, `${consts.move_good_response_status}:${new_pos_string}`);
}

module.exports.isValidPointStr = isValidPointStr;
module.exports.moveStrToTuple = moveStrToTuple;
module.exports.emit_move_command = emit_move_command;
module.exports.handle_client_move = handle_client_move;