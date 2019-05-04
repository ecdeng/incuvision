import com_handler_constants as const
from motor_controller import MotorController
from VideoCapture import Device
import matplotlib.pyplot as plt

def str_to_tuple(s):
    point_str = s.strip()[1:-1].split(',')
    point = (int(point_str[0].strip()), int(point_str[1].strip()))
    return point

def point_is_valid(s):
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
    
    point = str_to_tuple('(' + s + ')')
    # check that the point is an x, y pair
    if len(point) != 2:
        return False
    # check that none of the values have too large of a magnatude
    if abs(point[0]) > const.MOTOR_MAX_MOVE or abs(point[1]) > const.MOTOR_MAX_MOVE:
        return False
    return True

def getPoint():
    validPoint = False
    pointStr = input("Enter point to move to of the form: (x, y)")
    validPoint = point_is_valid(pointStr)
    while not validPoint:
        pointStr = input("Error that was invalid, please enter a valid point of the form (x, y):")
        validPoint = point_is_valid(pointStr)
    return str_to_tuple(pointStr)

def main():
    motor_controller = MotorController(const.COM_PORT, const.ARDUINO_BPS)
    motor_controller.start()
    while True:
        cmd = input("enter m for move or p to take picture (m/p)")
        if cmd == 'm':
            point = getPoint()
            xcmd = 'xf' + point[0] if point[0] >= 0 else 'xb' + abs(point[0])
            ycmd = 'yf' + point[1] if point[1] >= 0 else 'yb' + abs(point[1])
            motor_controller.exec_cmd(xcmd)
            motor_controller.exec_cmd(ycmd)
        elif cmd == 'p':
            cam = Device()
            if not video_capture.isOpened():
                print("Error could not open video capture")
            else:
                cam.saveSnapshot("cell_img.jpg")
                
if __name__ == '__main__':
    main()
