import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { mainRoutes } from './AuthRoutes';

const routes = mainRoutes();

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
