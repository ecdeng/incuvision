// defines pins numbers
//CHANGE 2000 IN THE DELAYMICROSECONDS IF THERES ISSUES SPINNING THE MOTORS
const int stepPinx = 3; 
const int dirPinx = 4; 
const int stepPiny = 9; 
const int dirPiny = 8; 
const int stepPinz = 11; 
const int dirPinz = 12; 
const int spin_delay = 2000;
int duration=8;
int inputtime=10;
String com;
String line1;
String line2;

void setup() {
  // Sets the 6 pins as Outputs
  pinMode(stepPinx,OUTPUT); 
  pinMode(dirPinx,OUTPUT);
  pinMode(stepPiny,OUTPUT); 
  pinMode(dirPiny,OUTPUT);
  pinMode(stepPinz,OUTPUT); 
  pinMode(dirPinz,OUTPUT);
  Serial.begin(9600);
}


void loop (){
  if (Serial.available() > 0) {
    // read the incoming byte:
    com = Serial.readString();
    
    line1 = com.substring(0, 2);
    line2 = com.substring(2, 7);  
//    Serial.println(line1);
//    Serial.println(line2);
    inputtime=line2.toInt();
    
    if (line1=="xf"){
      Serial.println("In xf and making pulses");
      digitalWrite(dirPinx,HIGH); // Enables the motor to move in a particular direction
      // Makes 200 pulses for making one full cycle rotation
      for(int x = 0; x < inputtime; x++) {
        digitalWrite(stepPinx,HIGH); 
        delayMicroseconds(spin_delay); 
        digitalWrite(stepPinx,LOW); 
        delayMicroseconds(spin_delay);
      } 
    }
    
    //Serial.println("done");
    if (line1=="xb"){
      digitalWrite(dirPinx,LOW); // Enables the motor to move in a particular direction
      // Makes 200 pulses for making one full cycle rotation
      for(int x = 0; x < inputtime; x++) {
        digitalWrite(stepPinx,HIGH); 
        delayMicroseconds(spin_delay); 
        digitalWrite(stepPinx,LOW); 
        delayMicroseconds(spin_delay); 
      }
    }
    
    if (line1=="yf"){
      digitalWrite(dirPiny,HIGH); // Enables the motor to move in a particular direction
      // Makes 200 pulses for making one full cycle rotation
      for(int x = 0; x < inputtime; x++) {
        digitalWrite(stepPiny,HIGH); 
        delayMicroseconds(spin_delay); 
        digitalWrite(stepPiny,LOW); 
        delayMicroseconds(spin_delay); 
      }
    }
    
    if (line1=="yb"){
      digitalWrite(dirPiny,LOW); // Enables the motor to move in a particular direction
      // Makes 200 pulses for making one full cycle rotation
      for(int x = 0; x < inputtime; x++) {
        digitalWrite(stepPiny,HIGH); 
        delayMicroseconds(spin_delay); 
        digitalWrite(stepPiny,LOW); 
        delayMicroseconds(spin_delay); 
      }
    }
    
    if (line1=="zfw"){
      digitalWrite(dirPinz,HIGH); // Enables the motor to move in a particular direction
      // Makes 200 pulses for making one full cycle rotation
      for(int x = 0; x < inputtime; x++) {
        digitalWrite(stepPinz,HIGH); 
        delayMicroseconds(spin_delay); 
        digitalWrite(stepPinz,LOW); 
        delayMicroseconds(spin_delay); 
      }
    }
    
    if (line1=="zbw"){
      digitalWrite(dirPinz,LOW); // Enables the motor to move in a particular direction
      // Makes 200 pulses for making one full cycle rotation
      for(int x = 0; x < inputtime; x++) {
        digitalWrite(stepPinz,HIGH); 
        delayMicroseconds(spin_delay); 
        digitalWrite(stepPinz,LOW); 
        delayMicroseconds(spin_delay); 
      }
    }
    
    inputtime=0;
  }
  //time///////////////////////////////////////////
  delay(1);
}
