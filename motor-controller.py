#code to send data to run motors to arduino
import serial
from time import sleep
import numpy as np
from cv2 import *


ComPORT = input("Which COM port is the arduino connected to: ")
ser=serial.Serial(ComPORT,9600)
x = [0]
y = [0]
z = [0]
current_x=0
current_y=0
current_z=0
motordir = ""
dist = 0


NumCycles = input("How many times would you like to run the imaging cycle? ")
CycleDelay = input("How long would you like the delay to be between each run of the imaging cycle (seconds)? ")
NumCycles = int(NumCycles)
CycleDelay = int(CycleDelay)


OpenSoft = input("Open the native software for the camera so that you can see the video stream of the camera. Type DONE when done. ")


#define coordinates at which to image by stepping the motor around
while True:
   inputstr = input("Jog the motor to each point to image and type 'SAVE' to store it. Type 'DONE' when all points have been defined (ex. xf100): ")
   if inputstr == "DONE":
      break
      print("The following coordinates have been saved (x, y, z): ")
      print("(" + str(x[i]) + "," + str(y[i]) + "," + str(z[i]) + ")")

   elif inputstr == "SAVE":
      x.append(current_x)
      y.append(current_y)
      z.append(current_z)


   else:
      motordir = inputstr[0:2]
      dist = int(inputstr[2:])
      if motordir == "xf":
         current_x=current_x+dist
      elif motordir == "yf":
         current_y=current_y+dist
      elif motordir == "xb":
         current_x=current_x-dist
      elif motordir == "yb":
         current_y=current_y-dist
      elif motordir == "zf":
         current_z=current_z+dist
      elif motordir == "zb":
         current_z=current_z-dist
      else:
      	 print("Incorrent input, try again")
      ser.write(inputstr.encode())



#return to origin
xdistance = -current_x
print(xdistance)
ydistance = -current_y
print(ydistance)
zdistance = -current_z
print(zdistance)
#see if you need to go forwards or backwards
if xdistance < 0:
   xdir = "xb"
else:
   xdir = "xf"

if ydistance < 0:
   ydir = "yb"
else:
   ydir = "yf"

if zdistance < 0:
   zdir = "zb"
else:
   zdir = "zf"

#take abs val of distance so it can be passed to arduino
xfindist = abs(xdistance)
yfindist = abs(ydistance)
zfindist = abs(zdistance)


#format output for the arduino

xstring = (xdir + str(xfindist))
ystring = (ydir + str(yfindist))
zstring = (zdir + str(zfindist))

if xfindist < 1000:
   sleepx = 4
else:
   sleepx = xfindist * 4 / 1000
print(str(sleepx) + "sleepx")

if yfindist < 1000:
   sleepy = 4
else:
   sleepy = xfindist * 4 / 1000
print(str(sleepy) + "sleepy")

if zfindist < 1000:
   sleepz = 4
else:
   sleepz = xfindist * 4 / 1000
print(str(sleepz) + "sleepz")

print(xstring + "returning")
print(ystring + "returning")
print(zstring + "returning")
ser.write(xstring.encode())
sleep(sleepx)
ser.write(ystring.encode())
sleep(sleepy)
ser.write(zstring.encode())
sleep(sleepz)

CloseSoft = input("Close the native software for the camera so that python can access it. Type DONE when done. ")

#Initialize Camera in Python
cam = VideoCapture(0)
#sleep for a second to let camera initialize
sleep(1)

CurrCycles = 0
while(CurrCycles < NumCycles):
   #for each of the coordinate lists
   for i in range(1, len(x)):
      #calculate the distance you need to movefrom prev point
      xdistance = x[i] - x[i-1]
      ydistance = y[i] - y[i-1]
      zdistance = z[i] - z[i-1]

   
      #see if you need to go forwards or backwards
      if xdistance < 0:
         xdir = "xb"
      else:
         xdir = "xf"

      if ydistance < 0:
         ydir = "yb"
      else:
         ydir = "yf"

      if zdistance < 0:
         zdir = "zb"
      else:
         zdir = "zf"

      #take abs val of distance so it can be passed to arduino
      xdist = abs(xdistance)
      ydist = abs(ydistance)
      zdist = abs(zdistance)

      #format output for the arduino
      xstring = (xdir + str(xdist))
      ystring = (ydir + str(ydist))
      zstring = (zdir + str(zdist))

      print(xstring)
      print(ystring)
      print(zstring)


      #send output to arduino

      if xdist < 1000:
         sleepx = 4
      else:
         sleepx = xdist * 4 / 1000
      print(str(sleepx) + "sleepx")

      if ydist < 1000:
         sleepy = 4
      else:
         sleepy = xdist * 4 / 1000
      print(str(sleepy) + "sleepy")

      if zdist < 1000:
         sleepz = 4
      else:
         sleepz = xdist * 4 / 1000
      print(str(sleepz) + "sleepz")

      ser.write(xstring.encode())
      sleep(sleepx)
      ser.write(ystring.encode())
      sleep(sleepy)
      ser.write(zstring.encode())
      sleep(sleepz)

       
      s, img = cam.read()
      print (s)
      PrintCycle = CurrCycles + 1
      if s:
         #print (s)
         #namedWindow("test",cv2.WINDOW_NORMAL)
         #imshow("cam-test",img)
         #waitKey(0)
         #destroyWindow("test")
         imwrite("Cycle" + str(PrintCycle) + "Position" + str(i) + ".jpg",img)
         
      

      sleep(1.5)



   #return to origin
   xdistance = 0 - x[-1]
   print(xdistance)
   ydistance = 0 - y[-1]
   print(ydistance)
   zdistance = 0 - z[-1]
   print(zdistance)
   #see if you need to go forwards or backwards
   if xdistance < 0:
      xdir = "xb"
   else:
      xdir = "xf"

   if ydistance < 0:
      ydir = "yb"
   else:
      ydir = "yf"

   if zdistance < 0:
      zdir = "zb"
   else:
      zdir = "zf"

   #take abs val of distance so it can be passed to arduino
   xfindist = abs(xdistance)
   yfindist = abs(ydistance)
   zfindist = abs(zdistance)

   #format output for the arduino
   xstring = (xdir + str(xfindist))
   ystring = (ydir + str(yfindist))
   zstring = (zdir + str(zfindist))

   if xfindist < 1000:
      sleepx = 4
   else:
      sleepx = xfindist * 4 / 1000
   print(str(sleepx) + "sleepx")

   if yfindist < 1000:
      sleepy = 4
   else:
      sleepy = xfindist * 4 / 1000
   print(str(sleepy) + "sleepy")

   if zfindist < 1000:
      sleepz = 4
   else:
      sleepz = xfindist * 4 / 1000
   print(str(sleepz) + "sleepz") 
   
   print(xstring + "returning")
   print(ystring + "returning")
   print(zstring + "returning")

   #send output to arduino

   ser.write(xstring.encode())
   sleep(sleepx)
   ser.write(ystring.encode())
   sleep(sleepy)
   ser.write(zstring.encode())
   sleep(sleepz)
   CurrCycles = CurrCycles + 1
   print("Cycles complete: " + str(CurrCycles))
   sleep(CycleDelay)


ser.close()     
cam.release()
cv2.destroyAllWindows()
print("The program has ended")
