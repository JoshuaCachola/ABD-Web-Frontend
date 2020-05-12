import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { connect } from "react-redux";

// Components
import LoginPanel from "./components/LoginPanel";
import SkateSpots from "./components/SkateSpots";
import { PrivateRoute } from "./routesUtils";
import CreateSkateSpot from './components/CreateSkateSpot';

const App = (props) => {
  const [ needLogin, _ ] = useState(!localStorage.getItem("TOKEN_KEY"));
  return (
    <Router>
      <Switch>
        <PrivateRoute
          exact
          path="/skatespots"
          component={SkateSpots}
          needLogin={needLogin}
        />
        <PrivateRoute
          exact
          path="/skatespots/create-spot"
          component={CreateSkateSpot}
          needLogin={needLogin}
        />
        <Route
          exact
          path="/"
          render={() => <LoginPanel needLogin={needLogin} />}
        />
      </Switch>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    authToken: state.authentication.authToken
  };
};

export default connect(
  mapStateToProps,
)(
  App
);
