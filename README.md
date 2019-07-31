# incuvision

## ENVIRONMENT SETUP

Python 3 Install
 - https://www.python.org/
 - add python3 dir and python3/Scripts dir to path

numpy import
 - pip install numpy

Serial import
 - pip install pyserial

CV2 import
 - pip install opencv-python
 - pip install opencv-contrib-python

Node JS install
 - Install Node version **10.15.0** (from https://nodejs.org/en/download/)
 - Install the server's dependencies by running `npm install`

MySql install
 - Install [XAMPP](https://www.apachefriends.org/download.html).
 - Launch Apache server
 - Launch MySQL server
 - Click on admin, then add new database named incuvision

Arduino Install
 - https://www.arduino.cc/en/Main/Software

Dev Launch:
 - Follow instructions in webserver/readme
 - Connect arduino to computer and upload the 
 stepper motor controller script in 
 incuvision\linux_server\stepper_motor_controller
 - Edit the incuvision\linux_server\com_handler_constants.py
 file so arduino is connected to the correct port and the 
 socket is connected to the same port the server is hosted 
 on (for dev this is local host)
 - Launch python linux_server/com_handler.py

Deployment:
 - Follow instructions in webserver for deployment
 - Connect arduino to computer and upload the 
 stepper motor controller script in 
 incuvision\linux_server\stepper_motor_controller
 - Edit the incuvision\linux_server\com_handler_constants.py
 file so arduino is connected to the correct port and the 
 socket is connected to the same port the server is hosted 
 on (for deployment this is the heroku url).
 - Launch python linux_server/com_handler.py

Known Issues
 - The smaller stepper motor is overheating: this may be 
 because the power supply is too large. We could possibly
 fix this by adding a resistor to the circut.
 - Difficult to ssh into the raspberry pi on usc wifi. You
 may need to connect it to a monitor and keyboard in order
 to find the ip address. (it might be 10.25.252.226) but this
 was not working for whatever reason last time I tried it.
 (If it does end up working, the password is incuvision).
 - We do not know how to get the microscope to atonomosly 
 change focus. We are not even 100% sure the microscope has
 that functionallity, in which case maybe we need to open up
 the camera and attach a third motor somehow to adjust the 
 focus. 
 - The wires unplug very easily from the breadboard so it 
 might be benifical to soder everything to a real 
 circutboard. 
 - The aws live stream is extreemly laggy, consider using
 some other method to get the live stream working. 
 - The live stream and photos sent to the client are not
 encrypted, which may be an issue for any sensitive data.