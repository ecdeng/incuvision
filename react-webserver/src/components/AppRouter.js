import React from "react";
import HomePage from './HomePage';
import ExperimentsPage from './ExperimentsPage';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Home() {
  return <HomePage />;
}

function Experiments() {
  return <ExperimentsPage />;
}

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/experiments/">Experiments</Link>
            </li>
          </ul>
        </nav>

        <Route exact path="/" component={Home} />
        <Route path="/experiments/" component={Experiments} />
      </div>
    </Router>
  );
}

export default AppRouter;