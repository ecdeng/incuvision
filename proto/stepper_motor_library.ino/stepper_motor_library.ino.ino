#include <Stepper.h>

// change this to fit the number of steps per revolution for your motor
const int stepsPerRevolution = 200;
int inputtime = 10;
String com;
String line1;
String line2;

// initialize the stepper library on pins 8 through 11:
Stepper stepperX(stepsPerRevolution, 3, 4);
Stepper stepperY(stepsPerRevolution, 8, 9);

void setup() {
  // set the speed at x rpm:
  stepperX.setSpeed(100);
  stepperY.setSpeed(100);
  
  // initialize the serial port:
  Serial.begin(9600);
}

void loop() {
  if(Serial.available() > 0) {
    // reading the incoming byte:
    com = Serial.readString();

    line1 = com.substring(0, 2);
    line2 = com.substring(2, 7);

    inputtime = line2.toInt();

    if(line1=='xf') {
      Serial.println("In xf and making pulses");
      stepperX.step(inputtime);
      delay(500);
    }

    if(line1 == 'xb') {
      Serial.println("In xb and making pulses");
      stepperX.step(-inputtime);
      delay(500);
    }

    if(line1 == 'yf') {
      Serial.println("In yf and making pulses");
      stepperY.step(inputtime);
      delay(500);
    }

    if(line1 == 'yb') {
      Serial.println("In yb and making pulses");
      stepperY.step(-inputtime);
      delay(500);
    }

    inputtime = 0;
    
  }
  
  delay(1);
//  // step one revolution in one direction:
//  Serial.println("clockwise");
//  myStepper.step(stepsPerRevolution);
//  delay(500);
//
//  // step one revolution in the other direction:
//  Serial.println("counterclockwise");
//  myStepper.step(-stepsPerRevolution);
//  delay(500);
}
