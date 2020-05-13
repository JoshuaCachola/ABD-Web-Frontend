import React, { useState } from 'react';
import {
  Router,
  Route,
  Switch
} from "react-router-dom";

// Components
// import LoginPanel from "./components/homepage/LoginPanel";
import Homepage from "./components/homepage/Homepage";
import SkateSpots from "./components/SkateSpots";
import { PrivateRoute } from "./routesUtils";
import CreateSkateSpot from "./components/CreateSkateSpot";
import SkateSpotPost from "./components/skate-spot/SkateSpotPost";
import createBrowserHistory from './components/utils/history';

const App = () => {
  const [needLogin, _] = useState(!localStorage.getItem("TOKEN_KEY"));
  const history = createBrowserHistory();
  // console.log(needLogin);
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute
          // exact
          path="/skatespots/post"
          component={SkateSpotPost}
          needLogin={needLogin}
        />
        <PrivateRoute
          // exact
          path="/skatespots"
          component={SkateSpots}
          needLogin={needLogin}
        />
        <PrivateRoute
          // exact
          path="/skatespots/create-spot"
          component={CreateSkateSpot}
          needLogin={needLogin}
        />
        <Route
          exact
          path="/"
          render={() => <Homepage needLogin={needLogin} />}
        />
      </Switch>
    </Router>
  );
};

export default App;
