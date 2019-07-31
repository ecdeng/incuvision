import socketio
import time
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
        self.curr_point = (0, 0)
        self.sio = socketio.Client()

        @self.sio.on(const.CON_ROUTE)
        def on_connect():
            print('connected')

        # move handeler defines all routes for server communicaiton
        @self.sio.on(const.MOVE_ROUTE)
        def on_move(data):

            # parse the move data recieved from the web-server
            print('on_move triggered, data: ', data)
            if not self.point_is_valid(data):
                self.sio.emit(const.ARDUINO_MOVE_RESPONSE_ROUTE, const.INVALID_POINT_ERROR)
                return
            new_point = self.str_to_tuple(data)
            moves = self.convert_move_cmd(new_point)

            # send the move to the arduino
            if not con_arduino:
                print('arduino move received: ', moves)
                time.sleep(2)
                print('con_arduino move simulated: ', moves)
                self.curr_point = new_point
                self.sio.emit(const.ARDUINO_MOVE_RESPONSE_ROUTE, const.ARDUINO_GOOD_RESP)
                return
            if self.controller.exec_cmd(moves[0]) == const.ARDUINO_BAD_RESP:
                self.sio.emit(const.ARDUINO_MOVE_RESPONSE_ROUTE, const.BAD_ARDUINO_RESP_ERROR)
            if self.controller.exec_cmd(moves[1]) == const.ARDUINO_BAD_RESP:
                self.sio.emit(const.ARDUINO_MOVE_RESPONSE_ROUTE, const.BAD_ARDUINO_RESP_ERROR)
            self.curr_point = new_point
            self.sio.emit(const.ARDUINO_MOVE_RESPONSE_ROUTE, const.ARDUINO_GOOD_RESP)

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
        s = s.strip()
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
        
        point = self.str_to_tuple('(' + s + ')')
        # check that the point is an x, y pair
        if len(point) != 2:
            return False
        # check that none of the values have too large of a magnatude
        if abs(point[0]) > const.MOTOR_MAX_MOVE or abs(point[1]) > const.MOTOR_MAX_MOVE:
            return False
        return True

    # Converts a point represented as a string to a tuple
    def str_to_tuple(self, s):
        point_str = s.strip()[1:-1].split(',')
        point = (int(point_str[0].strip()), int(point_str[1].strip()))
        return point

    # Converts a move command to an Arduino Command
    def convert_move_cmd(self, move):
        x_move_str = ('xf' if move[0] > 0 else 'xb') + (str(abs(move[0])))
        y_move_str = ('yf' if move[1] > 0 else 'yb') + (str(abs(move[1])))
        return x_move_str, y_move_str

def main():
    ComHandler(True, True) # real_arduino, real_server

if __name__ == '__main__':
    main()