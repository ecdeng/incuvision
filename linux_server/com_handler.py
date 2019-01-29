import socketio
import com_handler_constants as const
from motor_controller import MotorController

# (TODO @rdiersing1): Create a wrapper object for the server so you dont
# create the global variable curr_point

# Checks if the point string is valid
def point_is_valid(s):
    if len(s) <= 2 or s[0] != '(' or s[-1] != ')':
        return False
    for substr in s.split(','):
        substr = substr.trim()
        if len(substr) == 0:
            return False
        if substr[0] == '-':
            if not substr[1:].isdigit():
                return False
        else:
            if not substr.isdigit():
                return False
    
    point = str_to_tuple(s)
    # check that the point is an x, y pair
    if len(point) != 2:
        return False
    # check that none of the values have too large of a magnatude
    if abs(point[0]) > const.MOTOR_MAX_MOVE or abs(point[1]) > const.MOTOR_MAX_MOVE:
        return False
    return True

# Converts a point represented as a string to a tuple
def str_to_tuple(s):
    point_str = s[1:-1].split(',')
    point = (int(point_str[0].trim()), int(point_str[0].trim()))
    return point

# Converts a move command to an Arduino Command
def convertMoveCmd(move):
    x_move_str = ('xf' if move[0] > 0 else 'xb') + (str(abs(move[0])))
    y_move_str = ('yf' if move[1] > 0 else 'yb') + (str(abs(move[1])))
    return x_move_str, y_move_str

# initilize everything
curr_point = None
controller = MotorController(const.COM_PORT, const.ARDUINO_BPS)
controller.start()
sio = socketio.Client()

@sio.on(const.CON_ROUTE)
def on_connect():
    print('connected')

# move handeler (TODO @rdiersing1: respond to the server)
@sio.on(const.MOVE_ROUTE)
def on_move(data):
    global curr_point

    # parse the move data recieved from the web-server
    print('on_move triggered, data: ', data)
    old_point_str = data[const.NEW_POINT_PARAM]
    if not point_is_valid(old_point_str):
        sio.send(const.INVALID_POINT_ERROR)
        return
    old_point = str_to_tuple(old_point_str)

    # assert the old points are in sync
    if curr_point is not None and curr_point != old_point:
        sio.send(const.OUT_OF_SYNC_ERROR)
    new_point_str = data[const.NEW_POINT_PARAM]
    if not point_is_valid(new_point_str):
        sio.send(const.INVALID_POINT_ERROR)
        return
    new_point = str_to_tuple(new_point_str)

    # create the move
    delta = (new_point[0] - old_point[0], new_point[1] - old_point[1])
    if delta[0] > const.MOTOR_MAX_MOVE or delta[1] > const.MOTOR_MAX_MOVE:
        sio.send(const.INVALID_MOVE_ERROR)
        return
    moves = convertMoveCmd(delta)

    # send the move to the arduino
    if controller.exec_cmd(moves[0]) == const.ARDUINO_BAD_RESP:
        sio.send(const.BAD_ARDUINO_RESP_ERROR)
    if controller.exec_cmd(moves[1]) == const.ARDUINO_BAD_RESP:
        sio.send(const.BAD_ARDUINO_RESP_ERROR)
    curr_point = new_point
    sio.send(const.FINISHED_WITH_NO_ERRORS_RESP)
    print('on_move finished with no errors')

@sio.on(const.DISCONNECT_ROUTE)
def on_disconnect():
    print('disconnected')

sio.connect(const.SERVER_ADDRESS)
sio.wait()
controller.stop()