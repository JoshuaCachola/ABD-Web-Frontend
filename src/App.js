import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

// Components
import Homepage from "./components/homepage/Homepage";
import SkateSpots from "./components/SkateSpots";
import SkateSpot from "./components/skate-spot/SkateSpot";
import SkateSpotPost from "./components/skate-spot/SkateSpotPost";
import SkaterFeed from "./components/SkaterFeed";
import SignUp from "./components/SignUp";
import { PrivateRoute } from "./routesUtils";
import CreateSkateSpot from "./components/CreateSkateSpot";
import CreateSkatePost from "./components/skate-spot/CreateSkatePost";
import { useSelector } from "react-redux";
import Messaging from "./components/Messaging";

const App = () => {
  const authToken = useSelector(
    ({ authentication }) => authentication.authToken
  );
  const needLogin = !!localStorage.getItem("TOKEN_KEY") || !!authToken;
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <PrivateRoute
            exact={true}
            path="skater-feed"
            component={SkaterFeed}
            needLogin={needLogin}
          />
          <PrivateRoute
            exact={true}
            path="/skatespots"
            component={SkateSpots}
            needLogin={needLogin}
          />
          <PrivateRoute
            exact={true}
            path="/skatespots/create-spot"
            component={CreateSkateSpot}
            needLogin={needLogin}
          />
          <PrivateRoute
            exact={true}
            path="/skatespots/:id"
            component={SkateSpot}
            needLogin={needLogin}
          />
          <PrivateRoute
            exact={true}
            path="/skatespots/:id/post"
            component={CreateSkatePost}
            needLogin={needLogin}
          />
          <PrivateRoute
            exact={true}
            path="/skatespots/:id/posts/:id"
            component={SkateSpotPost}
            needLogin={needLogin}
          />
          <PrivateRoute
            exact={true}
            path="/messaging"
            component={Messaging}
            needLogin={needLogin}
          />
          <Route exact path="/" component={Homepage} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route render={() => <h1>404: Page not found</h1>} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
