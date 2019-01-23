import socket

HOST = '127.0.0.1'
PORT = 42042

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.bind((HOST, PORT))
s.listen()
conn, addr = s.accept()

print('connected to: ', addr)
while True:
    cmd = conn.recv(1024)
    if not cmd:
        break
    print('recieved command: ', cmd)

s.close()