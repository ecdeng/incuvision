import React, { Component } from 'react';
import AppRouter from './components/AppRouter';
import Header from './components/Header';

import './styles/style.css';

class App extends Component {
	render() {
		return (
			<div className="app">
				<Header />
				<AppRouter />
			</div>
    );
	}
}

export default App;
