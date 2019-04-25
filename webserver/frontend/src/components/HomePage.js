import React from 'react';
import '../styles/home.css';
import socketIOClient from 'socket.io-client';
import shaka from 'shaka-player'
import videojs from 'video.js'
<<<<<<< HEAD
import Hls from 'hls.js';
import axios from 'axios'

class HomePage extends React.Component {
	constructor() {
		super();
		this.state = {
			message_status: 'Ready',
			x_move: '',
			y_move: '',
			endpoint: '/',
			current_position: '(0, 0)'
		};
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
		this.createVideoStream();
	}

	// destroy player on unmount
	componentWillUnmount() {
		if (this.player) {
			this.player.dispose()
		}
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

		var AWS = require('aws-sdk');
		var streamName = "Incuvision";
		// Step 1: Configure SDK Clients
		var options = {
			accessKeyId: "access key",
			secretAccessKey: "secret key",
			region: "us-west-2"
		}
		var kinesisVideo = new AWS.KinesisVideo(options);
		var kinesisVideoArchivedContent = new AWS.KinesisVideoArchivedMedia(options);
		// var kinesisVideoMedia = new AWS.KinesisVideoMedia(options);
		// Step 2: Get a data endpoint for the stream
		console.log('Fetching data endpoint');
		kinesisVideo.getDataEndpoint({
			StreamName: streamName,
			APIName: "GET_HLS_STREAMING_SESSION_URL"
		}, function (err, response) {
			if (err) { return console.error(err); }
			console.log('Data endpoint: ' + response.DataEndpoint);
			kinesisVideoArchivedContent.endpoint = new AWS.Endpoint(response.DataEndpoint);
			// Step 3: Get an HLS Streaming Session URL
			console.log('Fetching HLS Streaming Session URL');
			kinesisVideoArchivedContent.getHLSStreamingSessionURL({
				StreamName: streamName,
				PlaybackMode: 'LIVE',
				//PlaybackMode: 'ON_DEMAND'
				HLSFragmentSelector: {
					FragmentSelectorType: 'SERVER_TIMESTAMP',
					TimestampRange: undefined
					//TimestampRange: {
					//	StartTimestamp: new Date('April 25, 2019 11:30:00'),
                    //    EndTimestamp: new Date('April 25, 2019 11:35:00')
                    //}
					//ContainerFormat: "FRAGMENTED_MP4",
					//DiscontinuityMode: "ALWAYS",
					//DisplayFragmentTimestamp: "ALWAYS",
					//MaxMediaPlaylistFragmentResults: undefined,
					//Expires: undefined
					},
					Expires: 43200
			}, function(err, response) {
					if (err) { 
						console.log("error retrieving HLSStreamingSessionURL");
						console.log(err, err.stack); // an error occurred
						var playerElement = document.getElementById("videojs");
						const videoJsOptions = {
  							autoplay: true,
  							controls: true,
  							sources: [{
    							src: "//vjs.zencdn.net/v/oceans.mp4",
    							type: "video/mp4"
    							//src: response.HLSStreamingSessionURL,
    							//type: 'application/x-mpegURL'
  							}]
						}
    					this.player = videojs(playerElement, videoJsOptions, function onPlayerReady() {
      						console.log('onPlayerReady', this)
    					});
						console.log('Set player source');
						this.player.play();
						console.log('Starting playback of oceans');
						return console.error(err); 
					}
					console.log('HLS Streaming Session URL: ' + response.HLSStreamingSessionURL);
					// Step 4: Give the URL to the video player.
					//var video = document.getElementById("video");
					//var video = this.player;
					
					var playerElement = document.getElementById("shaka");
                    var player = new shaka.Player(playerElement);
					console.log('Created Shaka Player');
                    player.load(response.HLSStreamingSessionURL).then(function() {
                        console.log('Starting playback');
                    });
					console.log('Set player source');
					playerElement.play();
					
                    
					/**
					var player = new Hls();
					if(Hls.isSupported()) {
						console.log('HLS is supported!');	
						player.loadSource(response.HLSStreamingSessionURL);
                    	player.attachMedia(video);
						console.log('Set player source');
						player.on(Hls.Events.MANIFEST_PARSED, function() {
							video.play();
                        	console.log('Starting playback');
                    	});
    				}

    				player.on(Hls.Events.ERROR, function (event, data) {
   						var errorType = data.type;
    					var errorDetails = data.details;
    					var errorFatal = data.fatal;
    					console.log('Error');	
    					console.log('error type is: ' + errorType);
    					console.log('error details are: ' + errorDetails);
    					console.log('error fatal: ' + errorFatal);
    					//console.log('stack trace: ' + data.err.stack);

  					});
					**/
  					
                    
					/**
				},
				Expires: 300
			}, function (err, response) {
				if (err) {
					console.log("error retrieving HLSStreamingSessionURL");
					console.log(err, err.stack); // an error occurred
					let playerElement = document.getElementById("videojs");
					const videoJsOptions = {
						autoplay: true,
						controls: true,
						sources: [{
							src: "//vjs.zencdn.net/v/oceans.mp4",
							type: "video/mp4"
							//src: response.HLSStreamingSessionURL,
							//type: 'application/x-mpegURL'
						}]
					}
    				this.player = videojs(playerElement, videoJsOptions, function onPlayerReady() {

    				});
    				**/
					//console.log('Set player source');
					//this.player.play();
					//console.log('Starting playback');
					this.player = videojs(playerElement, videoJsOptions, function onPlayerReady() {
						console.log('onPlayerReady', this)
					});
					console.log('Set player source');
					this.player.play();
					console.log('Starting playback of oceans');
					return console.error(err);
				}
				console.log('HLS Streaming Session URL: ' + response.HLSStreamingSessionURL);
				// Step 4: Give the URL to the video player.
				let playerElement = document.getElementById("videojs");
				const videoJsOptions = {
					autoplay: true,
					controls: true,
					sources: [{
						//src: "//vjs.zencdn.net/v/oceans.mp4",
						//type: "video/mp4"
						src: response.HLSStreamingSessionURL,
						type: 'application/x-mpegURL'
					}]
				}
				this.player = videojs(playerElement, videoJsOptions, function onPlayerReady() {
					console.log('onPlayerReady', this)
				});
				console.log('Set player source');
				this.player.play();
				console.log('Starting playback');
			});
			console.log("finished fetching streaming session");
		});
		//document.getElementById('.player').hide();
	}

	takePhoto = (e) => {
		console.log("Trying to take a photo");
		this.captureImage(1);
		console.log("Took photo!");
	}

	captureImage(experimentId) {
		//capture a snapshot from the video js player: https://stackoverflow.com/questions/13760805/how-to-take-a-snapshot-of-html5-javascript-based-video-player
		var video=document.querySelector('#shaka');
		var video = document.querySelector('#videojs video');
		console.log("creating canvas");
		var canvas = document.createElement('canvas');
		canvas.width = 640;
		canvas.height = 480;
		//draw image to canvas. scale to target dimensions
		console.log("draw image");
		var ctx = canvas.getContext('2d')
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
		//convert to desired file format
		var dataURL = canvas.toDataURL('image/jpeg');
		var image = dataURL.replace(/^data:image\/\w+;base64,/, "");
		console.log("DataURI: " + dataURL);
		//upload to s3, taken from https://stackoverflow.com/questions/13979558/saving-an-image-stored-on-s3-using-node-js
		console.log("Start uploading to s3");
		var AWS = require('aws-sdk');
		var config = new AWS.Config({
			accessKeyId: "access key",
			secretAccessKey: "secret key",
			region: "us-west-2"
		});
		AWS.config = config;
		var s3Bucket = new AWS.S3({ params: { Bucket: 'incuvision' } });
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
		var buf = new Buffer(image, 'base64')
		var data = {
			Key: uuid,
			Body: buf,
			ContentEncoding: 'base64',
			ContentType: 'image/jpeg'
		};
		console.log("Store into s3");
		s3Bucket.putObject(data, function(err, data){
      		if (err) { 
       			console.log(err);
        		console.log('Error uploading photo to s3'); 
      		} else {
        		console.log('succesfully uploaded the image!');
      		}
  		});
  		var urlParams = {Bucket: 'incuvision', Key: uuid};
  		var s3 = new AWS.S3();
  		console.log("Get presigned URL");
  		s3.getSignedUrl('getObject', urlParams, function(err, url) {
  			console.log("Signed url is: " + url);
  			axios.post("http://localhost:5000/images/create/", {
  				name: (experimentId) ? "Experiment" + experimentId + "_" + d + ".jpeg" : "ManualCapture_" + d + ".jpeg",
  				timestamp: d,
  				filepath: url
  			})
  		});
		s3Bucket.putObject(data, function (err, data) {
			if (err) {
				console.log(err);
				console.log('Error uploading photo to s3');
			} else {
				console.log('succesfully uploaded the image!');
			}
		});
		var urlParams = { Bucket: 'incuvision', Key: uuid };
		var s3 = new AWS.S3();
		console.log("Get presigned URL");
		s3.getSignedUrl('getObject', urlParams, function (err, url) {
			console.log("Signed url is: " + url);
			/**
			axios.post("http://localhost:5000/images/create/", {
				name: (experimentId) ? "Experiment" + experimentId + "_" + d + ".jpeg" : "ManualCapture_" + d + ".jpeg",
				timestamp: d,
				filepath: url
			})
			**/
		});
	}

	render() {
		const { message_status, current_position } = this.state;
		return (
			<div className="homePage">
				<div className="leftPane">
					<div className="currentPos">Current position: <span className="posName">#3</span></div>
					<div className="camera">
						
                        <video id="shaka" class="player" controls autoplay></video>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/shaka-player/2.4.1/shaka-player.compiled.js"></script>
						

						/**
						<video className="player video-js vjs-default-skin" id="videojs"></video>
						<script src="https://vjs.zencdn.net/6.6.3/video.js"></script>
						<script src="https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-hls/5.14.1/videojs-contrib-hls.js"></script>
						<link rel="stylesheet" href="//vjs.zencdn.net/5.12/video-js.css" />
						**/
						{this.createVideoStream()}
					</div>
					<button className="photoCapture" onClick={this.takePhoto} >Take Photo</button>
				</div>
				<div className="rightPane">
					<div className="savedPositions">
						<h3>Current Camera Position: <br/>{current_position}</h3>
						{/* <h3>Your Saved Positions</h3>
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
						</ul> */}
					</div>
					<div className="manualChanges">
						<h3>Manually Change Position</h3>
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
						<p className="positionChangeStatus">Camera Rig Status: <br/><strong>{message_status}</strong></p>
					</div>
				</div>
			</div>
		);
	}
}

export default HomePage;