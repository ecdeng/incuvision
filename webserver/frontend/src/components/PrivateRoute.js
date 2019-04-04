import { Route, Redirect } from "react-router-dom";
import React from 'react';

/* Higher-order component that composes a React-Router Route component with parameters for route authentication 
 * 
 * component: the component to be rendered by the route
 * auth: the authentication object which provides needed methods -- see Auth.js
 * redirect: the path to redirect to on a failed authentication
 */
const PrivateRoute = ({ component: Component, authMethod: isAuthenticated, redirect: redirect, ...rest }) => (
	<Route {...rest} render={(props) => (
		isAuthenticated() === true
			? <Component authMethod={isAuthenticated} {...props} />
			: <Redirect to={redirect} />
	)} />
)

export default PrivateRoute;