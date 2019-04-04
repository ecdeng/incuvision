import React from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import App from './App';
import Login from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';
const history = require('history').createBrowserHistory();

const authenticate = () => {
	return true;
}

export const mainRoutes = () => {
	const AppWithRouter = withRouter(App)
	return (
		<Router history={history} >
			<div>
				{/* <PrivateRoute component={AppWithRouter} authMethod={authenticate} redirect="/login" exact path="/" /> */}
				<Route exact path="/" component={App} />
				<Route path="/login" component={Login} />
			</div>
		</Router>
	);
}