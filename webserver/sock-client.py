import socketio

sio = socketio.Client()

@sio.on('connect')
def on_connect():
    print('connected')

@sio.on('move')
def on_move(data):
    print('move: ', data)

@sio.on('disconnect')
def on_disconnect():
    print('disconnected')

sio.connect('http://localhost:3000')
sio.wait()