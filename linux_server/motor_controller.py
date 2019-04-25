import serial
import com_handler_constants as const
from time import sleep

class MotorController:

    def __init__(self, port, bps):
        self.port = port
        self.bps = bps
        self.poss_dirs = {'xf', 'xb', 'yf', 'yb', 'zf', 'zb'}

    # Initiate communication with the arduino
    def start(self):
        print('starting motor controller')
        self.ser = serial.Serial(self.port, self.bps)
        sleep(2)
        print('motor controller running')

    # Tests to see if a command can be executed by exec_cmd
    def valid_cmd(self, command):
        if (type(command) is not str):
            return False
        dir = command[:2]
        ammnt = command[2:]
        if dir not in self.poss_dirs:
            return False
        if not ammnt.isdigit():
            return False
        return int(ammnt) < 1e6

    # Send command to arduino and return the response
    def exec_cmd(self, command):
        self.ser.write(command.encode())
        sleep(5)
        return self.ser.readline()

    def stop(self):
        self.ser.close()

def main():
    motor_controller = MotorController(const.COM_PORT, 9600)
    motor_controller.start()
    while True:
        motor_controller.exec_cmd('xf20000')
        motor_controller.exec_cmd('xb20000')
        motor_controller.exec_cmd('yf20000')
        motor_controller.exec_cmd('yb20000')
    motor_controller.stop()

    print('program terminated')

if __name__ == '__main__':
    main()