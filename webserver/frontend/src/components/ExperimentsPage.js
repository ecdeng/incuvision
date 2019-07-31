import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/experiments.css';

class ExperimentsPage extends React.Component {
	render() {
		return (
			<div className="experimentsArea">
				<h2>Experiments</h2>
				<ExperimentList />
			</div>
		);
	}
}

class ExperimentList extends React.Component {
	constructor(props) {
		super(props);

		/* Initialize state */
		this.state = {
			experiments: [],
		}
	}

	componentDidMount() {
		axios.get("/api/experiments/getAll")
			.then(res => {
				this.setState({ experiments: res.data });
			});
	}

	render() {
		return (
			<ul className="experimentList">
				<Link to="/new-experiment/">
					<li className="experiment new">
						<h3>Add New Experiment</h3><span className="fa-stack fa-2x"><i className="far fa-circle fa-stack-2x"></i><i className="fa fa-plus fa-stack-1x"></i></span>
					</li>
				</Link>
				{this.state.experiments.map(experiment => {
					return (
						<Link key={experiment.experimentId} className="experimentLink" to={"/experiments/" + experiment.experimentId}>
							<li className="experiment">
								<div className="textArea">
									<h3 className="experimentId">{"Experiment " + experiment.experimentId}</h3>
									<h4 className="experimentName">{"Experiment Name: " + experiment.name}</h4>
									<p className="experimentDescription">{experiment.description}</p>
								</div>
							</li>
						</Link>
					);
				})}

			</ul>
		);
	}
}

export default ExperimentsPage;