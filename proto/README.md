# Getting the motor to work
(TODO: find a command line way of doing this)

## Step by step instructions
* Download and install the arduino IDE
* Plug the arduino into the usb port on your machine, and take note of which com port it is connected to.
* Launch the arduino IDE and set the com port.
* Open the hardware-interface.ino file in the arduino IDE and upload this to the arduino.
* You can now manually give the motors commands (ie: xf1000) via Tools>Serial Monitor. 
* You can launch the python script to move the motor x, as long as you change the com port in the python script, (NOTE: THIS PART WILL NOT WORK ON WINDOWS). 