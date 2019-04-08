import React from 'react';
import '../styles/experiment_individual.css';
import axios from 'axios';

class IndividualExperimentPage extends React.Component {
	constructor(props) {
		super(props);

		/* Initialize state */
		this.state = {
			experiment: {},
			images: [],
			positions: []
		}
	}

	componentDidMount() {
		axios.get("http://localhost:5000/experiments/getById?experimentId=" + this.props.experimentId)
			.then(res => {
				this.setState({ experiment: res.data });
				console.log(res.data);

			});
		axios.get("http://localhost:5000/positions/getByExperiment?experimentId=" + this.props.experimentId)
			.then(res => {
				this.setState({ positions: res.data });
				console.log(res.data);
			});
		axios.get("http://localhost:5000/images/getByExperiment?experimentId=" + this.props.experimentId)
			.then(res => {
				this.setState({ images: res.data });
				console.log(res.data);
			});
	}

	render() {
		const experiment = this.state.experiment;
		const images = this.state.images;
		const positions = this.state.positions;

		return (
			<div className="experimentArea">
				<div className="textArea">
					<h2 className="experimentId black">Experiment {experiment.experimentId}</h2>
					<h3 className="experimentName black">{experiment.name}</h3>
					<p className="experimentDescription">{experiment.description}</p>
				</div>
				<div className="panes">
					<div className="positionsArea pane">
						<h4 className="black">Saved Positions For This Experiment</h4>
						<ul className="positionsList">
						{positions.map((pos) => (
								<li className="positionListItem" data-id="1">
									<span className="strong">Name:</span>
									<span className="name">{pos.name}</span>
									<span className="strong">X:</span>
									<span className="xPos">{pos.xPos}</span>
									<span className="strong">Y:</span>
									<span className="yPos">{pos.yPos}</span>
								</li>
							))}
						</ul>
					</div>
					<div className="imagesArea pane">
						<h4 className="black">Most Recent Images</h4><a className="allImagesLink" href="images"><i className="fa fa-images"></i><span style={{ color: "inherit" }}>View All Images</span></a>
						<ul className="imageList">
							{images.map((image) => (
								<li className="imageListItem">
									<img src={image.filepath} />
									<div className="textArea">
										<p>{image.name}</p>
										<p>{image.timestamp}</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default IndividualExperimentPage;