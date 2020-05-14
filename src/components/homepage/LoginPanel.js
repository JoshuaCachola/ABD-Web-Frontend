import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/authentication";
import { TextField, Button, makeStyles, Box } from "@material-ui/core";
// import logo from "../../images/abd-logo.png";

const useStyles = makeStyles({
  
});

const LoginPanel = (props) => {
  // const history = useHistory();
  const classes = useStyles();
  const [username, setUsername] = useState("crookiemonster");
  const [password, setPassword] = useState("verygoodpassword");

  // if (!props.needLogin) {
  //   return <Redirect push to="/skatespots" />
  //   // history.push("/skatespots");
  // }

  const handleSetUsername = (e) => setUsername(e.target.value);
  const handleSetPassword = (e) => setPassword(e.target.value);
  const handleLogin = (e) => {
    console.log("in handle login");
    e.preventDefault();
    props.login(username, password);
    // history.push("/skatespots");
    // return <Redirect push to="/skatespots" />
  };

  // if (props.token) {
  //   return <Redirect to="/skatespots" />;
  // }
  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center">
      <form>
        <Box>
          <TextField
            type="text"
            value={username}
            onChange={handleSetUsername}
            label="Username"
          />
        </Box>
        <Box>
          <TextField
            type="password"
            value={password}
            onChange={handleSetPassword}
            label="Password"
          />
        </Box>
        <Box>
          <Button onClick={handleLogin}>Log In</Button>
        </Box>
      </form>
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    authToken: state.authentication.authToken
  };
};

const mapDispathToProps = dispatch => {
  return {
    login: (username, password) => dispatch(login(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(
  LoginPanel
);
