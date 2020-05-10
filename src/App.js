import React from 'react';
import {
  BrowserRouter as Router
} from "react-router-dom";

// Components
import LoginPanel from "./components/LoginPanel";

const App = () => {
  return (
    <Router>
      <LoginPanel />
    </Router>
  );
};

export default App;
