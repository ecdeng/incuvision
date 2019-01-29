const express = require('express')
const app = express();
const http = require('http');


//Express app setup
const routes = require('./routes');
app.use('/', routes);
// app.use(express.static(__dirname + '/public'));

//Server setup
let port = process.env.PORT;
if (port == null  || port == "") {
  port = 3000;
}
const server = http.createServer(app);

//Websocket server setup
const io = require('socket.io')(server);
io.path('/socket');

io.on('connection', function(socket){
  console.log(`new connection`);

  socket.on('message', function(msg){
    let usr = socket.client.id;
    console.log(msg);
    io.emit('message', `${usr}: ${msg}`);
  });

  socket.on('response', (msg) => {
    console.log(`python client: ${msg.response}`);
  });
  
  io.emit('runMotor1')
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});