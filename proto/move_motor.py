import serial
from time import sleep

# This port is only for windows, it will be something else with 
# any other enviornment
ser = serial.Serial('com3', 9600)
sleep(2)

print('writing motor control')
# Move the x motor by 1000
ser.write(b'xf1000')
sleep(5)

print('program terminated')