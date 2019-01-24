import socket
from move_motor import MotorController

HOST = '127.0.0.1'
PORT = 42042

class ComServer:
    # Create the communications server object with port and hostname
    # builds the socket with default settings
    def __init__(self, host, port):
        self.s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.host = host
        self.port = port

    # Start the server, which builds the motor controller first
    def start(self):
        self.motor_control = MotorController('com3', 9600)
        self.motor_control.start()
        print('binding server to %s:%d' % (self.host, self.port))
        self.s.bind((self.host, self.port))
        self.s.listen()
        print('listening...')

        while True:
            conn, addr = self.s.accept()
            print('connected to: ', addr)
            cmd = str(conn.recv(1024))
            if not cmd:
                break
            print('recieved command:', cmd)
            cmd = cmd[2:-1]
            if self.motor_control.verify_cmd(cmd):
                self.motor_control.exec_cmd(cmd)
                conn.sendall(b'Executed Command')
            else:
                conn.sendall(b'Invalid command')
            print('broke connection with: ', addr)
            conn.close()

    def stop(self):
        self.s.close()

server = ComServer(HOST, PORT)
server.start()
