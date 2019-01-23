import serial
from time import sleep

# This port is only for windows, it will be something else with 
# any other enviornment
ser = serial.Serial('/dev/ttyACM0', 9600)

# Move the x motor by 1000
ser.write(b'xf1000')
ser.flush()

while True:
    print(ser.readline())

sleep(5)

print('program terminated')