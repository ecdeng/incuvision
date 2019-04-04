const express = require('express');
const util = require('./middleware');
const path = require('path');
const custom_utils = require('./utils.js');
const consts = require('./consts.js');
const http = require('http');

const app = express();

// Allow web client to access API on same server (need to do this BEFORE mounting router)
app.use(util.allowCrossDomain);

// HTML Rendering Setup
// app.set('views', __dirname + '/../public');
app.set('views', 'public/views/');
app.set('view engine', 'pug');

// Express app setup
app.use(express.static(path.join(__dirname, '../frontend/build')));
const routes = require('./routes/routes');
app.use('/', routes);

// Production mode
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../frontend/build')));
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
	})
}

//Dev mode
app.get('/app', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
})

// 404 Route -- Always mounted LAST!
// See middleware.js for explanation of why we .use() this here, not in routes.js
app.use(util.fourohfour);

// Server setup
let port = process.env.PORT || 5000; //React app runs on 3000
const server = http.createServer(app);
app.locals.move_in_progress = false;
app.locals.move_str_in_progress = '';
app.locals.abs_pos = (0, 0);

// WebSocket server setup
const io = require('socket.io')(server);
app.set('io', io);

io.on(consts.main_socket_connection_route, function(socket){
  console.log(`new connection: ${socket.id}`);

  socket.on(consts.client_move_request_sroute, (msg) => {
    console.log('received web-command');
    if (!custom_utils.isValidPointStr(msg)) {
      io.emit(consts.client_error_status_sroute, consts.invalid_move_str_err);
      return;
    }
    if (app.locals.move_in_progress) {
      io.emit(consts.client_error_status_sroute, consts.move_collision_err);
      return;
    }
    console.log(`emitting move-command: ${msg}`);
    app.locals.move_in_progress = true;
    app.locals.move_str_in_progress = msg;
    io.emit(consts.server_move_request_sroute, msg);
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

  var soonestMove = JobCommand.min('time').then(min => {});
  var timeTillMove = soonestMove - Date.now();
  setTimeout(JobCommand.callMove(), timeTillMove);

});