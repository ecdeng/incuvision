import React from 'react';
import '../styles/home.css';
import socketIOClient from 'socket.io-client';

class HomePage extends React.Component {
	constructor() {
		super();
		this.state = {message_status : '', x_move : '', y_move : '', endpoint: 'http://127.0.0.1:5000', current_position : '(0, 0)'};
	}

	componentDidMount() {
		const { endpoint } = this.state;
		this.socket = socketIOClient(endpoint);
		this.socket.on('error_status', (msg) => {
			console.log('error status has been updated: ' + msg);
			const statusArr = msg.split(':');
			const msgStatus = statusArr[0];
			if (msgStatus === 'ok') {
				this.setState({current_position : statusArr[1]});
			}
			this.setState({message_status : msgStatus});
		});
	}

	handleSendMoveCommand(e, isRelative) {
		e.preventDefault();
		const x = e.target.x_move.value;
		const y = e.target.y_move.value;
		const moveStr = '(' + x + ',' + y + ')';
		console.log('in form submit for move, movestr=' + moveStr);
		this.socket.emit(isRelative ? 'client_move_request_relative' : 'client_move_request_abs', moveStr);
	}

	handleSendMoveCommandRel = (e) => {
		this.handleSendMoveCommand(e, true);
	}

	handleSendMoveCommandAbs = (e) => {
		this.handleSendMoveCommand(e, false);
	}

	render() {
		const {message_status} = this.state;
		const {current_position} = this.state;
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
						<h3>Your current position: {current_position}</h3>
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
								<form className="absoluteChange changeForm" onSubmit={this.handleSendMoveCommandAbs}> 
									<span>Absolute Position</span>
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
								<form className="relativeChange changeForm" onSubmit={this.handleSendMoveCommandRel}> 
									<span>Relative Position</span>
									<div className="formgroup">
										<label>+ x:</label>
										<input name="x_move" type="text" />
									</div>
									<div className="formgroup">
										<label>+ y:</label>
										<input name="y_move" type="text" />
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