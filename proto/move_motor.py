import serial
from time import sleep

class MotorController:

    def __init__(self, port, bps):
        self.port = port
        self.bps = bps
        self.poss_dirs = {'xf', 'xb', 'yf', 'yb', 'zf', 'zb'}
    
    def start(self):
        print('starting motor controller')
        self.ser = serial.Serial(self.port, self.bps)
        sleep(2)
        print('motor controller running')

    def verify_cmd(self, command):
        command = str(command)
        dir = command[:2]
        amt = int(command[2:])
        if dir not in self.poss_dirs:
            return False
        if amt < 0 or amt > 1e5:
            return False
        return True

    def exec_cmd(self, command):
        self.ser.write(command.encode())
        sleep(5)

    def stop(self):
        self.ser.close()

def main():
    motor_controller = MotorController('com3', 9600)
    motor_controller.start()
    motor_controller.exec_cmd('xf1000')
    motor_controller.exec_cmd('xb1000')
    motor_controller.exec_cmd('yf1000')
    motor_controller.stop()

    print('program terminated')

if __name__ == '__main__':
    main()