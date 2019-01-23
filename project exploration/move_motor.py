import serial
from time import sleep

# This port is only for windows, it will be something else with 
# any other enviornment
ser = serial.Serial('COM3', 9600)

# Move the x motor by 1000
ser.write('xf1000'.encode())
ser.flush()

print('program terminated')