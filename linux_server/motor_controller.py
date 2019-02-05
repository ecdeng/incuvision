import serial
from time import sleep

class MotorController:

    def __init__(self, port, bps):
        self.port = port
        self.bps = bps
        self.poss_dirs = {'xf', 'xb', 'yf', 'yb', 'zf', 'zb'}

    # initiate communication with the arduino
    def start(self):
        print('starting motor controller')
        self.ser = serial.Serial(self.port, self.bps)
        sleep(2)
        print('motor controller running')

    # send command to arduino and return the response
    def exec_cmd(self, command):
        self.ser.write(command.encode())
        sleep(5)
        return self.ser.readline()

    def stop(self):
        self.ser.close()

def main():
    motor_controller = MotorController('com3', 9600)
    motor_controller.start()
    while True:
        motor_controller.exec_cmd('xf1000000')
        motor_controller.exec_cmd('xb1000000')
        motor_controller.exec_cmd('yf1000000')
        motor_controller.exec_cmd('yb1000000')
    motor_controller.stop()

    print('program terminated')

if __name__ == '__main__':
    main()