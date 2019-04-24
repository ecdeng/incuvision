import React from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/experiment_new.css';

/* Take a JS Date and return it as *just* the date, at 00:00:00 in the same timezone. */
const truncateDate = (date) => {
	let truncated = date;
	truncated.setHours(0);
	truncated.setMinutes(0);
	truncated.setSeconds(0);
	truncated.setMilliseconds(0);
	return truncated;
}

class NewExperimentPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			description: "",
			startDate: new Date(),
			endDate: new Date(),
			frequency: 0,
			frequencyUnit: "day",
			positions: [
				{ name: "", xPos: 0, yPos: 0 },
				{ name: "", xPos: 0, yPos: 0 },
				{ name: "", xPos: 0, yPos: 0 }
			],
			isValid: true,
			isComplete: false
		}
	}

	handleNameChange = (e) => {
		this.setState({ name: e.target.value });
	}

	handleDescriptionChange = (e) => {
		this.setState({ description: e.target.value });
	}

	handleStartDateChange = (date) => {
		this.setState({ startDate: truncateDate(date) });
	}

	handleEndDateChange = (date) => {
		this.setState({ endDate: truncateDate(date) });
	}

	handleFrequencyChange = (e) => {
		this.setState({ frequency: e.target.value });
	}

	handleFrequencyUnitChange = (e) => {
		this.setState({ frequencyUnit: e.target.value });
	}

	/* Unforunately requires some nested async calls -- I think this is the best way to do it, but not sure */
	createNewExperiment = (e) => {
		//validate the form
		const { name, description, frequency } = this.state;
		if (name.length < 1 || description.length < 1 || frequency < 1) {
			this.setState({ isValid: false });
		}
		//form valid, submit!
		else {
			this.setState({ isValid: true });
			axios.post("/api/experiments/create",
				{
					name: this.state.name,
					description: this.state.description
				})
				.then((res) => {
					this.setState({ isComplete: true });
					let experiment = res.data;
					console.log(experiment);

					axios.post("/api/jobs/create",
						{
							name: experiment.name + "_Job",
							frequency: this.state.frequency,
							startDate: this.state.startDate,
							endDate: this.state.endDate,
							experimentId: experiment.experimentId
						})
						.then((res) => {
							let job = res.data;
							this.state.positions.forEach((pos) => {
								axios.post("/api/positions/create",
									{
										name: pos.name,
										xPos: pos.xPos,
										yPos: pos.yPos,
										zPos: 1,
										experimentId: experiment.experimentId,
										jobId: job.jobId
									})
									.then((newPos) => {
										console.log("Successfully created position " + newPos);
									})
									.catch((err) => {
										console.log("Could not create position: " + err);
									});
							});
						})
						.catch((err) => {
							console.log("Could not create job: " + err);
						});
				})
				.catch((err) => {
					console.log("Could not create experiment: " + err);
				});
		}
	}

	render() {
		return (
			<div className="newExperimentArea">
				<h2>New Experiment</h2>
				<form className="newExperimentForm" method="post">
					<div className="formGroup">
						<label>Experiment ID </label><span className="experimentId"><em>(autogenerated)</em></span>
					</div>
					<div className="formGroup">
						<label>Experiment Name</label>
						<input type="text" name="experimentName" tabIndex="1" onChange={this.handleNameChange} />
					</div>
					<div className="formGroup">
						<label>Experiment Description</label>
						<textarea name="experimentDescription" tabIndex="2" cols={50} onChange={this.handleDescriptionChange} />
					</div>
				</form>

				<h3>Positions to Monitor</h3>
				<ul className="positions">
					<li className="positionListItem" data-id="1">
						<span className="strong">Name:</span>
						<input className="name" placeholder="Position Name" />
						<span className="strong">X:</span>
						<input className="xPos" placeholder="X (e.g. 20)" />
						<span className="strong">Y:</span>
						<input className="yPos" placeholder="Y (e.g. 40)" />
					</li>
					<li className="positionListItem" data-id="1">
						<span className="strong">Name:</span>
						<input className="name" placeholder="Position Name" />
						<span className="strong">X:</span>
						<input className="xPos" placeholder="X (e.g. 20)" />
						<span className="strong">Y:</span>
						<input className="yPos" placeholder="Y (e.g. 40)" />
					</li>
					<li className="positionListItem" data-id="1">
						<span className="strong">Name:</span>
						<input className="name" placeholder="Position Name" />
						<span className="strong">X:</span>
						<input className="xPos" placeholder="X (e.g. 20)" />
						<span className="strong">Y:</span>
						<input className="yPos" placeholder="Y (e.g. 40)" />
					</li>
				</ul>

				<h3> Duration to Monitor </h3>
				<div className="durationArea">
					<div className="durationRow">
						<span className="durationLabel">From</span>
						<DatePicker selected={this.state.startDate} onChange={this.handleStartDateChange} />
						<span className="durationLabel">To</span>
						<DatePicker selected={this.state.endDate} onChange={this.handleEndDateChange} />
					</div>
					<div className="durationRow">
						<span className="durationLabel">At Frequency</span>
						<input placeholder="1-10" name="frequency" onChange={this.handleFrequencyChange} />
						<span className="durationLabel">Per</span>
						<select className="frequencyUnit" onChange={this.handleFrequencyUnitChange} >
							<option value="day">day</option>
							<option value="hour">hour</option>
						</select>
					</div>
				</div>
				{!this.state.isValid &&
					<div className="invalid-response"> Could not submit form! Make sure you've filled out every field. </div>
				}
				{this.state.isComplete &&
					<div className="complete-response"> Experiment "{this.state.name}" created! </div>
				}
				<button className="createExperimentBtn" onClick={this.createNewExperiment} >Create Experiment</button>

			</div>
		);
	}
}

export default NewExperimentPage;