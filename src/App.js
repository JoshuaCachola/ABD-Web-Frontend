import React, { useState } from 'react';
import {
  Router,
  Route,
  Switch
} from "react-router-dom";

import { CssBaseline } from "@material-ui/core";
import Theme from "./Theme";
// Components
// import LoginPanel from "./components/homepage/LoginPanel";
import Homepage from "./components/homepage/Homepage";
import SkateSpots from "./components/SkateSpots";
import SkateSpot from "./components/skate-spot/SkateSpot";
import SkateSpotPost from "./components/skate-spot/SkateSpotPost";
import SignUp from "./components/SignUp";
import { PrivateRoute } from "./routesUtils";
import CreateSkateSpot from "./components/CreateSkateSpot";
import CreateSkatePost from "./components/skate-spot/CreateSkatePost";
// import SkateSpotPost from "./components/skate-spot/SkateSpotPost";
import createBrowserHistory from './components/utils/history';

const App = () => {
  const [needLogin, _] = useState(!localStorage.getItem("TOKEN_KEY"));
  const history = createBrowserHistory();
  // debugger
  // console.log(needLogin);
  return (
    <>
      <CssBaseline />
      <Theme>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Homepage} />
            {/* <PrivateRoute
            // exact
            path="/skatespots/post"
            component={SkateSpotPost}
            needLogin={needLogin}
          /> */}
            <Route exact path="/sign-up" component={SignUp} />
            <PrivateRoute
              exact
              path="/skatespots"
              component={SkateSpots}
              // needLogin={needLogin}
            />
            <PrivateRoute
              exact
              path="/skatespots/create-spot"
              component={CreateSkateSpot}
              // needLogin={needLogin}
            />
            <PrivateRoute
              exact
              path="/skatespots/:id"
              component={SkateSpot}
              // needLogin={needLogin}
            />
            <PrivateRoute
              exact
              path="/skatespots/:id/post"
              component={CreateSkatePost}
            />
            <PrivateRoute
              exact
              path="/skatespots/:id/posts/:id"
              component={SkateSpotPost}
            />
            <Route render={() => <h1>404: Page not found</h1>} />
          </Switch>
        </Router>
      </Theme>
    </>
  );
};

export default App;
