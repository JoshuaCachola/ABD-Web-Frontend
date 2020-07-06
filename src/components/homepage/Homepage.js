import React from "react";
import LoginPanel from "./LoginPanel";
import { withRouter } from "react-router-dom";

import abdLogo from "../../images/abd-splash-logo.png";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="homepage__logo">
        <img src={abdLogo} alt="abd-logo" />
      </div>
      <LoginPanel />
    </div>
  );
};

export default withRouter(Homepage);
