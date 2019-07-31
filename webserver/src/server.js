const express = require('express');
const util = require('./middleware');
const path = require('path');
const custom_utils = require('./utils.js');
const consts = require('./consts.js');
const http = require('http');

const db = require('./DBManager.js');
const JobCommand = db.JobCommand;

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
app.use('/api', routes);

// Production mode
if (process.env.NODE_ENV === 'production') {
	console.log("NODE_ENV set to production -- serving React app from express.static");
	app.use(express.static(path.join(__dirname, '../frontend/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
	});
}

// Serve React app to all browser requests 
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// 404 Route -- Always mounted LAST!
// See middleware.js for explanation of why we .use() this here, not in routes.js
app.use(util.fourohfour);

// Server setup
let port = process.env.PORT || 5000; //React app runs on 3000
const server = http.createServer(app);
app.locals.move_in_progress = false;
app.locals.move_str_in_progress = '';
app.locals.move_is_relative = false;
app.locals.abs_pos = [0, 0];

// WebSocket server setup
const io = require('socket.io')(server);
app.set('io', io);

io.on(consts.main_socket_connection_route, function(socket){
  console.log(`new connection: ${socket.id}`);

  socket.on(consts.client_move_request_abs_sroute, (msg) => {
    console.log('in abs move:', msg);
    app.locals.move_is_relative = false;
    custom_utils.emit_move_command(io, app, msg);
    console.log('emitted move: move string is now: ', app.locals.move_str_in_progress);
  });

  socket.on(consts.client_move_request_relative_sroute, (msg) => {
    console.log('in relative move:', msg);
    app.locals.move_is_relative = true;
    custom_utils.emit_move_command(io, app, msg);
    console.log('emitted move: move string is now: ', app.locals.move_str_in_progress);
  });

  socket.on(consts.arduino_move_response_sroute, (msg) => {
    custom_utils.handle_client_move(io, app, msg);
  });

  //all socket events
  socket.on(consts.main_socket_disconnect_route, () => {
    console.log(`disconnected: ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});