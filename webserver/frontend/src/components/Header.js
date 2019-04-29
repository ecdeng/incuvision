import React from 'react';
import '../styles/header.css';

class Header extends React.Component {
	render() {
		return (
			<div className="header">
				<a href="/">
					<h3>Incuvision</h3>
				</a>
				<div className="userArea" href="/saved">
					<span className="username"></span>
					{/* <button className="user-btn" name="user-btn"><i className="fa fa-user fa-3x"></i></button> */}
					<a className="logout" href="/logout">Log Out</a>
				</div>
			</div>
		);
	}
}

export default Header;