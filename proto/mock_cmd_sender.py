import socket

HOST = '127.0.0.1'
PORT = 42042

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print('connecting to server')
s.connect((HOST, PORT))

print('sending command')
s.sendall(b'xb1000')
status = s.recv(1024)

print('command sent with status: ', status)
s.close()