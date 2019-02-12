const fs = require('fs');
const jwt = require('jsonwebtoken');

// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKey = fs.readFileSync(__dirname + '/private.key', 'utf8');
var publicKey  = fs.readFileSync(__dirname + '/public.key', 'utf8');  

const jwtservice = {
 sign: (payload, options) => {
    // Token signing options
    var signOptions = {
      issuer:  options.issuer,
      subject:  options.subject,
      audience:  options.audience,
      expiresIn:  "30d",    // 30 days validity
      algorithm:  "RS256"
    };
    return jwt.sign(payload, privateKey, signOptions);
  },
  verify: (token, options) => {
    console.log('verifying with options ' + JSON.stringify(options));
    
    var verifyOptions = {
      issuer:  options.issuer,
      subject:  options.subject,
      audience:  options.audience,
      expiresIn:  "30d",
      algorithm:  ["RS256"]
    };
    try{
      return jwt.verify(token, publicKey, verifyOptions);
    } catch (err){
      console.log(err);
      return false;
    }
  },
  decode: (token) => {
    return jwt.decode(token, {complete: true});
    //returns null if token is invalid
  }
}

module.exports = jwtservice;