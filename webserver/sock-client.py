import socketio

sio = socketio.Client()

@sio.on('connect')
def on_connect():
    print('connection established')

@sio.on('message')
def on_message(data):
    print('message received: ', data)
    sio.emit('response', {'response': 'python received msg'})

@sio.on('motor1')
def on_motor1():
    run_the_motors()

@sio.on('disconnect')
def on_disconnect():
    print('disconnected from server')

sio.connect('http://localhost:3000')
sio.wait()