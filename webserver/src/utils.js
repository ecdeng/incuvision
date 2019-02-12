const MAX_MOTOR_VAL = 50000;

const isValidPointStr = function(pointStr) {
    console.log('in validate point function');
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
    console.log('xStr: ' + xStr + ', yStr: ' + yStr);

    if (isNaN(xStr) || isNaN(yStr)) {
        console.log('Error: The point to move to is not an integer');
        return false;
    }

    x = parseInt(xStr);
    y = parseInt(yStr);
    console.log('x: ', x, ', y: ', y);
    if (Math.abs(x) > MAX_MOTOR_VAL || Math.abs(y) > MAX_MOTOR_VAL) {
        console.log('Error: The point to move to is out of range');
        return false;
    }
    return true;
}

module.exports = isValidPointStr;