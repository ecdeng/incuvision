import socketio
import com_handler_constants as const
from motor_controller import MotorController

class ComHandler:
    # The constructor also starts the server
    def __init__(self, con_arduino, con_server):

        # initilize 
        if con_arduino:
            self.controller = MotorController(const.COM_PORT, const.ARDUINO_BPS)
            self.controller.start()
        if not con_server:
            return
        self.curr_point = None
        self.sio = socketio.Client()

        @self.sio.on(const.CON_ROUTE)
        def on_connect():
            print('connected')

        # move handeler defines all routes for server communicaiton
        @self.sio.on(const.MOVE_ROUTE)
        def on_move(data):

            # parse the move data recieved from the web-server
            print('on_move triggered, data: ', data)
            data_arr = data.split('#')
            point_data = data_arr[1]
            if (len(data_arr) != 2):
                self.sio.send(const.INVALID_MESSAGE_ERROR)
            old_point_str = point_data[const.CURR_POINT_PARAM]
            if not self.point_is_valid(old_point_str):
                self.sio.send(const.INVALID_POINT_ERROR)
                return
            old_point = self.str_to_tuple(old_point_str)

            # assert the old points are in sync
            if self.curr_point is not None and self.curr_point != old_point:
                self.sio.send(const.OUT_OF_SYNC_ERROR)
                return
            new_point_str = point_data[const.NEW_POINT_PARAM]
            if not self.point_is_valid(new_point_str):
                self.sio.send(const.INVALID_POINT_ERROR)
                return
            new_point = self.str_to_tuple(new_point_str)

            # create the move
            delta = (new_point[0] - old_point[0], new_point[1] - old_point[1])
            if delta[0] > const.MOTOR_MAX_MOVE or delta[1] > const.MOTOR_MAX_MOVE:
                self.sio.send(const.INVALID_MOVE_ERROR)
                return
            moves = self.convert_move_cmd(delta)

            # send the move to the arduino
            if not con_arduino:
                print('con_arduino move simulated: ' + moves)
                self.curr_point = new_point
                self.sio.send(const.FINISHED_WITH_NO_ERRORS_RESP)
                return
            if self.controller.exec_cmd(moves[0]) == const.ARDUINO_BAD_RESP:
                self.sio.send(const.BAD_ARDUINO_RESP_ERROR)
            if self.controller.exec_cmd(moves[1]) == const.ARDUINO_BAD_RESP:
                self.sio.send(const.BAD_ARDUINO_RESP_ERROR)
            self.curr_point = new_point
            self.sio.send(const.FINISHED_WITH_NO_ERRORS_RESP)

        @self.sio.on(const.DISCONNECT_ROUTE)
        def on_disconnect():
            print('disconnected')

        # connect to the socket
        if con_server:
            self.sio.connect(const.SERVER_ADDRESS)
            self.sio.wait()
        if con_arduino:
            self.controller.stop()

    # Checks if the point string is valid
    def point_is_valid(self, s):
        assert(type(s) is str)
        if len(s) <= 2 or s[0] != '(' or s[-1] != ')':
            return False
        s = s[1:-1]
        for substr in s.split(','):
            substr = substr.strip()
            if len(substr) == 0 or len(substr) > 7:
                return False
            if substr[0] == '-':
                if not substr[1:].isdigit():
                    return False
            else:
                if not substr.isdigit():
                    return False
        
        point = self.str_to_tuple(s)
        # check that the point is an x, y pair
        if len(point) != 2:
            return False
        # check that none of the values have too large of a magnatude
        if abs(point[0]) > const.MOTOR_MAX_MOVE or abs(point[1]) > const.MOTOR_MAX_MOVE:
            return False
        return True

    # Converts a point represented as a string to a tuple
    def str_to_tuple(self, s):
        point_str = s[1:-1].split(',')
        point = (int(point_str[0].strip()), int(point_str[1].strip()))
        return point

    # Converts a move command to an Arduino Command
    def convert_move_cmd(self, move):
        x_move_str = ('xf' if move[0] > 0 else 'xb') + (str(abs(move[0])))
        y_move_str = ('yf' if move[1] > 0 else 'yb') + (str(abs(move[1])))
        return x_move_str, y_move_str

def main():
    ComHandler(False, True)

if __name__ == '__main__':
    main()