import React, { Component } from 'react';
import AppRouter from './components/AppRouter';

import './styles/style.css';

class App extends Component {
	render() {
		return (
			<div className="app">
				<AppRouter />
			</div>
    );
	}
}

export default App;
