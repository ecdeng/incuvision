const express = require('express')
const app = express();

const http = require('http');

//Express app setup
const routes = require('./routes');
app.use('/', routes);
app.use(express.static(__dirname + '/public'));

//Server setup
let port = process.env.PORT || 3000;

const server = http.createServer(app);

//WebSocket server setup
const io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log(`new connection: ${socket.id}`);
  
  socket.on('message', (msg) => {
    let date = new Date();
    let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    let message = `${date.toLocaleTimeString()} $: ${msg}`;
    io.emit('message', message);
    console.log(message);
  });

  //python client events
  socket.on('python-client-connected', (msg) => {
    console.log(msg);
    io.emit('move', msg);
  });

  //web client events
  socket.on('web-client-connected', (msg) => {
    console.log(msg);
  });

  socket.on('web-command', (msg) =>{
    console.log('received web-command');
    console.log(`emitting move-command: ${msg}`);
    io.emit('move-command', msg);
  });

  //all socket events
  socket.on('disconnect', () => {
    console.log(`disconnected: ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});