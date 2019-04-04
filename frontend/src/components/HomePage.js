import React from 'react';
import '../styles/home.css';
import socketIOClient from 'socket.io-client';

class HomePage extends React.Component {
	constructor() {
		super();
		this.state = {message_status : '', x_move : '', y_move : '', endpoint: 'http://127.0.0.1:4001'};
	}

	componentDidMount() {
		const { endpoint } = this.state;
		const socket = socketIOClient(endpoint);
		socket.on('error_status', (msg) => {
			this.setState({message_status : msg});
		});
	}

	handleSendMoveCommand = (e) => {
		e.preventDefault();
		alert('working');
		const x = e.target.x_move.value;
		const y = e.target.y_move.value;
		const moveStr = '(' + x + ',' + y + ')';
		console.log('in form submit for move, movestr=' + moveStr);
		const { endpoint } = this.state;
		const socket = socketIOClient(endpoint);
		socket.emit('client_move_request', moveStr);
	}

	render() {
		const {message_status} = this.state;
		return (
			<div className="home">
				<div className="leftPane">
					<div className="currentPos">Current position: <span className="posName">#3</span></div>
					<div className="camera">
						<video className="player video-js vjs-default-skin" id="videojs" controls="" autoPlay=""></video>
						<script src="https://vjs.zencdn.net/6.6.3/video.js"></script>
						<script src="https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-hls/5.14.1/videojs-contrib-hls.js"></script>
					</div>
				</div>
				<div className="rightPane">
					<div className="savedPositions">
						<h3>Your Saved Positions</h3>
						<ul className="positionList">
							<li className="positionListItem">
								<h4 className="posName">Pos #1</h4>
								<div className="row"><span>x: </span><span className="xVal">50</span><span>y: </span><span className="yVal">120</span></div>
							</li>
							<li className="positionListItem">
								<h4 className="posName">Pos #1</h4>
								<div className="row"><span>x: </span><span className="xVal">50</span><span>y: </span><span className="yVal">120</span></div>
							</li>
							<li className="positionListItem">
								<h4 className="posName">Pos #1</h4>
								<div className="row"><span>x: </span><span className="xVal">50</span><span>y: </span><span className="yVal">120</span></div>
							</li>
							<li className="positionListItem">
								<h4 className="posName">Pos #1</h4>
								<div className="row"><span>x: </span><span className="xVal">50</span><span>y: </span><span className="yVal">120</span></div>
							</li>
						</ul>
					</div>
					<div className="manualChanges">
						<h3>Manually Change Position</h3>
						<p>{message_status}</p>
						<div className="positionArea">
							<div className="positionInputArea">
								<form className="absoluteChange changeForm" onSubmit={this.handleSendMoveCommand}> <span>Absolute Position</span>
									<div className="formgroup">
										<label>x:</label>
										<input name="x_move" type="text" />
									</div>
									<div className="formgroup">
										<label>y:</label>
										<input name="y_move" type="text" />
									</div>
									<input type="submit" value="Move" />
								</form>
								<form className="relativeChange changeForm" action=""> <span>Relative Position</span>
									<div className="formgroup">
										<label>+ x:</label>
										<input type="text" />
									</div>
									<div className="formgroup">
										<label>+ y:</label>
										<input type="text" />
									</div>
									<input type="submit" value="Move" />
								</form>
							</div>
							<div className="grid"><img src="img/grid.png" alt="grid.png" /></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HomePage;