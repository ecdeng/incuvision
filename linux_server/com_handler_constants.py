
# routing constants
COM_PORT = "com3"
CON_ROUTE = "connect"
MOVE_ROUTE = "server_move_request"
DISCONNECT_ROUTE = "disconnect"
ARDUINO_MOVE_RESPONSE_ROUTE = "arduino_move_response"

# socket communication paramaters (dictionary keys)
CURR_POINT_PARAM = "curr"
NEW_POINT_PARAM = "new"
SERVER_ADDRESS = "http://127.0.0.1:5000"
INVALID_POINT_ERROR = "Error: Invalid point"
INVALID_MESSAGE_ERROR = "Error: Invalid Message"
OUT_OF_SYNC_ERROR = "Error: Current point is out of sync with the linux server"
INVALID_MOVE_ERROR = "Error: Invalid move"
BAD_ARDUINO_RESP_ERROR = "Error: Arduino responded with failure"
FINISHED_WITH_NO_ERRORS_RESP = "Finished with no errors"

# arduino interface constants
ARDUINO_BPS = 9600
MOTOR_MAX_MOVE = 1e6
ARDUINO_GOOD_RESP = "ok"
ARDUINO_BAD_RESP = "bad"