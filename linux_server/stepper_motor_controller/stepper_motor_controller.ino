#include <Stepper.h>

const int stepsPerRevolution = 200;
int inputtime = 10;
String com;
String line1;
String line2;

// initialize the stepper library on appropriate pins
Stepper stepperX(200, 3, 4);
Stepper stepperY(200, 8, 9);

void setup() {
  // set the speed at x rpm:
  stepperX.setSpeed(1000);
  stepperY.setSpeed(1000);
  
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

    if(line1=="xf") {
      // rotate motor X clockwise by inputtime
      stepperX.step(inputtime);
      delay(500);
      Serial.println("ok");
    }
    else if(line1 == "xb") {
      // rotate motor X counterclockwise by inputtime
      stepperX.step(-inputtime);
      delay(500);
      Serial.println("ok");
    }
    else if(line1 == "yf") {
      // rotate motor Y clockwise by inputtime
      stepperY.step(inputtime);
      delay(500);
      Serial.println("ok");
    }
    else if(line1 == "yb") {
      // rotate motor Y counterclockwise by inputtime
      stepperY.step(-inputtime);
      delay(500);
      Serial.println("ok");
    }
    else {
      Serial.println("bad");
    }
    inputtime = 0;
  }
  
  delay(1);
}
