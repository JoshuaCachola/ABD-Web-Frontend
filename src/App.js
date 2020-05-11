import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

// Components
import LoginPanel from "./components/LoginPanel";
import SkateSpots from "./components/SkateSpots";

const App = () => {
  return (
    <Router>
      <LoginPanel />
      <Route to="/skatespots" component={SkateSpots} />
    </Router>
  );
};

export default App;
