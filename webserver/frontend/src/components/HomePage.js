import React from 'react';
import '../styles/home.css';
import socketIOClient from 'socket.io-client';
import axios from axios

class HomePage extends React.Component {
	constructor() {
		super();
		this.state = { 
			message_status: '', 
			x_move: '', 
			y_move: '', 
			endpoint: '/',
			current_position: '(0, 0)' };
	}

	componentDidMount() {
		const { endpoint } = this.state;
		this.socket = socketIOClient(endpoint);
		this.socket.on('error_status', (msg) => {
			console.log('error status has been updated: ' + msg);
			const statusArr = msg.split(':');
			const msgStatus = statusArr[0];
			if (msgStatus === 'ok') {
				this.setState({ current_position: statusArr[1] });
			}
			this.setState({ message_status: msgStatus });
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

	createVideoStream() {

		configureLogging();
		var streamName = "IncuvisionVideoStream";
		// Step 1: Configure SDK Clients
		var options = {
			accessKeyId: "access key please",
			secretAccessKey: "secret key please",
			sessionToken: undefined,
			region: "us-west-2",
			endpoint: undefined
		}
		var kinesisVideo = new AWS.KinesisVideo(options);
		var kinesisVideoArchivedContent = new AWS.KinesisVideoArchivedMedia(options);
		var kinesisVideoMedia = new AWS.KinesisVideoMedia(options);
		// Step 2: Get a data endpoint for the stream
		console.log('Fetching data endpoint');
		kinesisVideo.getDataEndpoint({
			StreamName: streamName,
			APIName: "GET_HLS_STREAMING_SESSION_URL"
		}, function(err, response) {
			if (err) { return console.error(err); }
			console.log('Data endpoint: ' + response.DataEndpoint);
			kinesisVideoArchivedContent.endpoint = new AWS.Endpoint(response.DataEndpoint);
			// Step 3: Get an HLS Streaming Session URL
			console.log('Fetching HLS Streaming Session URL');
			kinesisVideoArchivedContent.getHLSStreamingSessionURL({
				StreamName: streamName,
				PlaybackMode: "LIVE",
				HLSFragmentSelector: {
					FragmentSelectorType: "SERVER_TIMESTAMP",
					TimestampRange: undefined,
					ContainerFormat: "FRAGMENTED_MP4",
					DiscontinuityMode: "ALWAYS",
					DisplayFragmentTimestamp: "ALWAYS",
					MaxMediaPlaylistFragmentResults: undefined,
					Expires: undefined
				}, function(err, response) {
					if (err) { return console.error(err); }
					console.log('HLS Streaming Session URL: ' + response.HLSStreamingSessionURL);
					// Step 4: Give the URL to the video player.
					var playerElement = $('#videojs');
					playerElement.show();
					var player = videojs('videojs');
					console.log('Created VideoJS Player');
					player.src({
						src: response.HLSStreamingSessionURL,
						type: 'application/x-mpegURL'
					});
					console.log('Set player source');
					player.play();
					console.log('Starting playback');
				}});
			});
		$('.player').hide();
	}

	function captureImage(experimentId) {
		//capture a snapshot from the video js player: https://stackoverflow.com/questions/13760805/how-to-take-a-snapshot-of-html5-javascript-based-video-player
		var canvas = document.createElement('canvas');
		canvas.width = 640;
		canvas.height = 480;
		var ctx = canvas.getContext('2d');
		//draw image to canvas. scale to target dimensions
		var player = $('#videojs');
		context.drawImage(player.children_[0], 0, 0, canvas.width, canvas.height);
		//convert to desired file format
		var dataURI = canvas.toDataURL('image/jpeg'); 
		//upload to s3, taken from https://stackoverflow.com/questions/13979558/saving-an-image-stored-on-s3-using-node-js
		var AWS = require('aws-sdk');
		AWS.config.loadFromPath('./s3_config.json');
		var s3Bucket = new AWS.S3( { params: {Bucket: 'incuvision'} } );
		var d = new Date().getTime();
     	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        	var r = (d + Math.random()*16)%16 | 0;
        	d = Math.floor(d/16);
        	return (c=='x' ? r : (r&0x3|0x8)).toString(16);
     	});
		buf = new Buffer(dataURI.body.imageBinary.replace(/^data:image\/\w+;base64,/, ""),'base64')
 			var data = {
   			Key: uuid, 
   			Body: buf,
   			ContentEncoding: 'base64',
   			ContentType: 'image/jpeg'
		};
		s3Bucket.putObject(data, function(err, data){
      		if (err) { 
       			console.log(err);
        		console.log('Error uploading data: ', data); 
      		} else {
        		console.log('succesfully uploaded the image!');
      		}
  		});
  		var urlParams = {Bucket: 'incuvision', Key: uuid};
  		s3.getSignedUrl('getObject', urlParams, function(err, url)) {
  			axios.post("http://localhost:5000/images/create/", {
  				name: (experimentId) ? "Experiment" + experimentId + "_" + d + ".jpeg" : "ManualCapture_" + d + ".jpeg",
  				timestamp: d,
  				filepath: url
  			})
  		}
	}
	/**
	function retrieveAllImage() {
		//http://www.joshsgman.com/upload-to-and-get-images-from-amazon-s3-with-node-js/
		var params = {Bucket: 'incuvision'};
		s3.listObjects(params, function(err, data){
  			var bucketContents = data.Contents;
    		for (var i = 0; i < bucketContents.length; i++){
      			var urlParams = {Bucket: 'incuvision', Key: bucketContents[i].Key};
        		s3.getSignedUrl('getObject', urlParams, function(err, url){
          			
        		});
    		}
		});
	}
	**/

	render() {
		const { message_status } = this.state;
		const { current_position } = this.state;
		return (
			<div className="homePage">
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
							{/* <div className="grid"><img src="img/grid.png" alt="grid.png" /></div> */}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HomePage;