import React from 'react';
import '../styles/experiment_individual.css';

class IndividualExperimentPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div class="main">
				<div class="textArea">
					<h2 class="experimentId black">Experiment </h2>
					<h3 class="experimentName black">Experiment Name</h3>
					<p class="experimentDescription">Experiment Description</p>
				</div>
				<div class="panes">
					<div class="positionsArea pane">
						<h4 class="black">Saved Positions For This Experiment</h4>
						<ul class="positionsList">
							<li class="positionListItem" data-id="1"><span class="strong">Name:</span><span class="name">Pos #1</span><span class="strong">X:</span><span class="xPos">45</span><span class="strong">Y:</span><span class="yPos">90</span></li>
							<li class="positionListItem"><span class="strong">Name:</span><span class="name">Pos #1</span><span class="strong">X:</span><span class="xPos">45</span><span class="strong">Y:</span><span class="yPos">90</span></li>
						</ul>
					</div>
					<div class="imagesArea pane">
						<h4 class="black">Most Recent Images</h4><a class="allImagesLink" href="images"><i class="fa fa-images"></i><span style="color:inherit;">View All Images</span></a>
						<ul class="imageList"></ul>
					</div>
				</div>
			</div>
		);
	}
}

export default IndividualExperimentPage;