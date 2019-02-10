import socketio
from move_motor import MotorController

sio = socketio.Client()

@sio.on('connect')
def on_connect():
  print('connected to server')
  sio.emit('python-client-connected', 'python client connected')

@sio.on('message')
def on_message(data):
  print('message: ', data)

@sio.on('move-command')
def on_move(data):
  print('received move-command: ', data)
  sio.emit('python-client-status', {'status':'success'})

@sio.on('disconnect')
def on_disconnect():
  print('disconnected')

sio.connect('http://localhost:3000')
sio.wait()
