
# routing constants
COM_PORT = "/dev/ttyACM0"
CON_ROUTE = "connect"
MOVE_ROUTE = "server_move_request"
DISCONNECT_ROUTE = "disconnect"
ARDUINO_MOVE_RESPONSE_ROUTE = "arduino_move_response"

# socket communication paramaters (dictionary keys)
CURR_POINT_PARAM = "curr"
NEW_POINT_PARAM = "new"
SERVER_ADDRESS = "http://incuvision-webserver.herokuapp.com"
INVALID_POINT_ERROR = "Error: Invalid point"
INVALID_MESSAGE_ERROR = "Error: Invalid Message"
OUT_OF_SYNC_ERROR = "Error: Current point is out of sync with the linux server"
INVALID_MOVE_ERROR = "Error: Invalid move"
BAD_ARDUINO_RESP_ERROR = "Error: Arduino responded with failure"
FINISHED_WITH_NO_ERRORS_RESP = "Finished with no errors"

# arduino interface constants
ARDUINO_BPS = 9600
MOTOR_MAX_MOVE = 6000
MAX_X_POS = 6000
MAX_Y_POS = 4700
ARDUINO_GOOD_RESP = "ok"
ARDUINO_BAD_RESP = "bad"