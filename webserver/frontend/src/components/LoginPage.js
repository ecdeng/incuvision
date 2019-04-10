import React from 'react';
import '../styles/login.css';
import axios from 'axios';

class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			isAuthenticated: false,
		}
	}

	handleUsernameChange = (e) => {
		this.setState({ username: e.target.value });
	}
	handlePasswordChange = (e) => {
		this.setState({ password: e.target.value });
	}

	handleLogin = (e) => {
		e.preventDefault();
		axios.post("http://localhost:5000/login", { username: this.state.username, password: this.state.password })
			.then((res) => {
				console.log(res.data);
				if (res.data.authenticated === "true") {
					localStorage.setItem("authenticated", "true");
					this.forceUpdate();
				}
			})
			.catch((err) => (console.log(err)));
	}

	render() {
		const isAuthenticated = localStorage.getItem("authenticated") === "true";

		return (
			<div className="loginPage">
				{!isAuthenticated &&
					<div className="login">
						<div className="loginArea">
							<h2>Incuvision</h2>
							<h3>Remote Incubation Portal</h3>
							<form onSubmit={this.handleLogin} className="loginForm">
								<div className="row">
									<label>username: </label>
									<input type="text" name="username" onChange={this.handleUsernameChange} tabIndex="1"/>
								</div>
								<div className="row">
									<label>password: </label>
									<input type="text" name="password" onChange={this.handlePasswordChange} tabIndex="2"/>
								</div>
								<input type="submit" value="Log In" />
							</form>
						</div>
						<div className="background"></div>
					</div>
				}
				{isAuthenticated &&
					<div className="loggedIn">
						<h4>You are logged in! Click <a href="/">here</a> to go to the Incuvision home page!</h4>
					</div>
				}
			</div>

		);
	}
}

export default LoginPage;