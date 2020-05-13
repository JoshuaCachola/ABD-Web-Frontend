import React from "react";
import LoginPanel from "./LoginPanel";
import { Redirect, useHistory } from "react-router-dom";

const Homepage = (props) => {
  const history = useHistory();
  if (!props.needLogin) {
    console.log(props);
    // return <Redirect push to="/skatespots" />
    history.push("/skatespots");
  }
  return (
    <div className="homepage">
      <LoginPanel />
    </div>
  );
};

export default Homepage;
