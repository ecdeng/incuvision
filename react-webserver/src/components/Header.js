import React from 'react';
import '../styles/header.css';

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="header">
				<a href="/home">
					<h3>Incuvision</h3>
				</a>
				<a className="userArea" href="/saved">
					<span className="username"></span>
					<button className="user-btn" name="user-btn"><i className="fa fa-user fa-3x"></i></button>
				</a>
			</div>
		);
	}
}

export default Header;