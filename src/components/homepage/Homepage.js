import React, { useEffect } from "react";
import LoginPanel from "./LoginPanel";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";

const Homepage = (props) => {
  const history = useHistory();

  // useEffect(() => {
    if (props.authToken) {
    console.log(props.authToken);
    return <Redirect push to="/skatespots" />
    // history.push("/skatespots");
  }
  // }, [props.authToken, props]);
  // if (!props.needLogin) {
  //   console.log(props);
  //   // return <Redirect push to="/skatespots" />
  //   history.push("/skatespots");
  // }
  return (
    <div className="homepage">
      <div className="homepage__logo">
        <h1>already been done</h1>
        {/* <img src={logo} alt="abd-logo" /> */}
      </div>
      {/* <div className="homepage__login"> */}
      {/* <Box display="flex" alignItems="center" justifyContent="center"> */}
        <LoginPanel />
      {/* </Box> */}
      {/* </div> */}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authToken: state.authentication.authToken,
  };
};

export default connect(
  mapStateToProps
)(
  Homepage
);
