const express = require('express');
const util = require('./middleware');
const app = express();
const custom_utils = require('./utils.js');
const consts = require('./consts.js');

const http = require('http');

// Allow web client to access API on same server (need to do this BEFORE mounting router)
app.use(util.allowCrossDomain);

// HTML Rendering Setup
// app.set('views', __dirname + '/../public');
app.set('views', 'public/views/');
app.set('view engine', 'pug');

// Express app setup
app.use(express.static(__dirname + '/../public'));
const routes = require('./routes/routes');
app.use('/', routes);

// 404 Route -- see middleware.js for explanation of why we .use() this here, not in routes.js
app.use(util.fourohfour);

// Server setup
let port = process.env.PORT || 3000;
const server = http.createServer(app);
app.locals.move_in_progress = false;
app.locals.move_str_in_progress = '';
app.locals.abs_pos = (0, 0);

// WebSocket server setup
const io = require('socket.io')(server);
app.set('io', io);

io.on('connection', function(socket){
  console.log(`new connection: ${socket.id}`);

  //web client events
  socket.on(consts.web_client_route, (msg) => {
    console.log(msg);
  });

  socket.on(consts.web_command_route, (msg) => {
    console.log('received web-command');
    if (!custom_utils.isValidPointStr(msg)) {
      io.emit(consts.error_status_route, consts.invalid_move_str_err);
      return;
    }
    if (app.locals.move_in_progress) {
      io.emit(consts.error_status_route, consts.move_collision_err);
      return;
    }
    console.log(`emitting move-command: ${msg}`);
    app.locals.move_in_progress = true;
    app.locals.move_str_in_progress = msg;
    io.emit(consts.move_command_route, msg);
  });

  socket.on(consts.server_response_route, (msg) => {
    if (msg != consts.server_good_response_status) {
      io.emit(consts.error_status_route, consts.server_err);
      console.log(`A SERVER ERROR HAS OCCURED: ${msg}`);
      return;
    }
    move = custom_utils.moveStrToTuple(app.locals.move_str_in_progress);
    app.locals.abs_pos[0] = app.locals.abs_pos[0] + move[0];
    app.locals.abs_pos[1] = app.locals.abs_pos[1] + move[1];
    app.locals.move_in_progress = false;
    io.emit(consts.error_status_route, consts.move_good_response_status);
  });

  //all socket events
  socket.on(consts.disconnect_route, () => {
    console.log(`disconnected: ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});