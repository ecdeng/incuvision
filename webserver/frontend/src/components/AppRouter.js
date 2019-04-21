import React from "react";
import Header from './Header';
import HomePage from './HomePage';
import ExperimentsPage from './ExperimentsPage';
import IndividualExperimentPage from './IndividualExperimentPage';
import NewExperimentPage from './NewExperimentPage';
import { BrowserRouter as Router, Redirect, Route, NavLink, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import LoginPage from "./LoginPage";

const authenticate = () => {
	return (localStorage.getItem("authenticated") === "true");
}

function Home() {
	return <HomePage />;
}

function Experiments() {
	return <ExperimentsPage />;
}

function IndivudalExperiment({ match }) {
	return <IndividualExperimentPage experimentId={match.params.experimentId} />;
}

function NewExperiment() {
	return <NewExperimentPage />;
}

class AppRouter extends React.Component {
	render() {
		// const { history } = props;
		// console.log("You are now at " + history.location.pathname);

		return (
			<Router>
				<div className="main">
					<Header />
					<nav className="navbar">
						<ul>
							<NavLink exact
								activeClassName="active"
								to="/"><li> Home </li></NavLink>
							<NavLink exact
								activeClassName="active"
								to="/experiments/"><li> Experiments </li></NavLink>
							<NavLink exact
								activeClassName="active"
								to="/new-experiment/"><li> New Experiment </li></NavLink>
						</ul>
					</nav>
					<Switch>
						<Route exact path="/login" component={LoginPage} />

						<PrivateRoute redirect="/login" authMethod={authenticate} exact path="/" component={Home} />
						<PrivateRoute redirect="/login" authMethod={authenticate} exact path="/experiments/" component={Experiments} />
						<PrivateRoute redirect="/login" authMethod={authenticate} exact path="/new-experiment/" component={NewExperiment} />
						<PrivateRoute redirect="/login" authMethod={authenticate} exact path="/experiments/:experimentId" component={IndivudalExperiment} />
						<PrivateRoute redirect="/login" authMethod={authenticate} exact path="/logout" component={Logout} />

						<Route path="/" render={(props) => <h2 className="fourohfour">Uh oh! This page could not be found!</h2>} />
					</Switch>
				</div>
			</Router>
		);
	}
}

class Logout extends React.Component {
	render() {
		localStorage.removeItem("authenticated");
		return (
			<Redirect to="/login" />
		);
	}
}

// function PrivateRoute({ component: Component, ...rest }) {
// 	return (
// 		<Route
// 			{...rest}
// 			render={props =>
// 				isAuthenticated ? (
// 					<Component {...props} />
// 				) : (
// 						<Redirect
// 							to={{
// 								pathname: "/login",
// 								state: { from: props.location }
// 							}}
// 						/>
// 					)
// 			}
// 		/>
// 	);
// }

export default AppRouter;