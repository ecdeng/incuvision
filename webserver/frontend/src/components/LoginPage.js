import React from 'react';
import '../styles/login.css';
import axios from 'axios';

class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: ""
		}
	}

	handleUsernameChange = (e) => {
		this.setState({username: e.target.value});
	}
	handlePasswordChange = (e) => {
		this.setState({password: e.target.value});
	}

	handleLogin = (e) => {
		e.preventDefault();
		axios.post("http://localhost:5000/login", {username: this.state.username, password: this.state.password})
			.then((res) => {
				console.log(res.data);
				if (res.data.authenticated === "true") {
					localStorage.setItem("authenticated","true");
				}
			})
			.catch( (err) => (console.log(err)));
	}

	render() {
		return (
			<div className="login">
				<div className="loginArea">
					<h2>Incuvision</h2>
					<h3>Remote Incubation Portal</h3>
					<form onSubmit={this.handleLogin} className="loginForm">
						<div className="row">
							<label>username: </label>
							<input type="text" name="username" onChange={this.handleUsernameChange} />
						</div>
						<div className="row">
							<label>password: </label>
							<input type="text" name="password" onChange={this.handlePasswordChange} />
						</div>
						<input type="submit" value="Log In" />
					</form>
				</div>
				<div className="background"></div>
			</div>
		);
	}
}

export default LoginPage;