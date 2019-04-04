import React from "react";
import Header from './Header';
import HomePage from './HomePage';
import ExperimentsPage from './ExperimentsPage';
import IndividualExperimentPage from './IndividualExperimentPage';
import NewExperimentPage from './NewExperimentPage';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import auth from '../authentication';

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

function AppRouter() {
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
				<PrivateRoute redirect="/login" authMethod={auth.required} exact path="/" component={Home} />
				<PrivateRoute redirect="/login" authMethod={auth.required} exact path="/experiments/" component={Experiments} />
				<PrivateRoute redirect="/login" authMethod={auth.required} path="/new-experiment/" component={NewExperiment} />
				<PrivateRoute redirect="/login" authMethod={auth.required} path="/experiments/:experimentId" component={IndivudalExperiment} />
			</div>
		</Router>
	);
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