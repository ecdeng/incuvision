import React from 'react';
import '../styles/experiments.css';

class ExperimentsPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="main">
				<h2>Experiments</h2>
				<ul className="experimentList"><a className="experimentLink" href="experiments/new">
					<li className="experiment new">
						<h3>Add New Experiment</h3><span className="fa-stack fa-2x"><i className="far fa-circle fa-stack-2x"></i><i className="fa fa-plus fa-stack-1x"></i></span>
					</li>
				</a><a className="experimentLink" href="experiments/1">
						<li className="experiment">
							<div className="textArea">
								<h3 className="experimentId">Experiment 01</h3>
								<h4 className="experimentName">Experiment Name: RatExperiment</h4>
								<p className="experimentDescription">This experiment was designed to test the efficacy of protocol IE-3234-1 on rat cells.</p>
							</div>
						</li>
					</a><a className="experimentLink" href="experiments/2">
						<li className="experiment">
							<div className="textArea">
								<h3 className="experimentId">Experiment 02</h3>
								<h4 className="experimentName">Experiment Name: HumanTrials</h4>
								<p className="experimentDescription">After the success of experiment 01, this experiment tests the efficacy of protocol IE-3234-1 on human cells.</p>
							</div>
						</li>
					</a></ul>
			</div>
		);
	}
}

export default ExperimentsPage;