import React from 'react';
import '../styles/home.css';
import socketIOClient from "socket.io-client";

class HomePage extends React.Component {
	constructor() {
		super();
		this.setState = {'message status' : ''};
	}

	render() {
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
						<div className="positionArea">
							<div className="positionInputArea">
								<form className="absoluteChange changeForm" action=""> <span>Absolute Position</span>
									<div className="formgroup">
										<label>x:</label>
										<input type="text" />
									</div>
									<div className="formgroup">
										<label>y:</label>
										<input type="text" />
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