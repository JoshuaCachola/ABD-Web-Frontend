import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/authentication";
import { TextField, Button, makeStyles, Box, Card, CardContent, CardHeader, Typography } from "@material-ui/core";
// import logo from "../../images/abd-logo.png";

const useStyles = makeStyles({
  input: {
    color: "white"
  },
  login: {
    paddingRight: 20,
    paddingTop: 40,
  },
  loginButton: {
    marginRight: 10,
    marginTop: 30,
  },
  focused: {
    color: "#326C73"
  }
});

const LoginPanel = (props) => {
  const history = useHistory();
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
  const handleSignUp = () => history.push("/sign-up");

  // if (props.token) {
  //   return <Redirect to="/skatespots" />;
  // }

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignContent="center"
      className={classes.login}
    >
      <form>
        <Card
          style={{
            backgroundColor: "rgba(0, 0, 0, .25)",
            fontFamily: "Rock Salt",
          }}
        >
          <CardHeader
            className="hompage__login-form"
            style={{ color: "white" }}
            title="already been done"
          />
          <CardContent>
            <Box>
              <TextField
                type="text"
                value={username}
                onChange={handleSetUsername}
                label="Username"
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  className: classes.input,
                }}
              />
            </Box>
            <Box>
              <TextField
                type="password"
                value={password}
                onChange={handleSetPassword}
                label="Password"
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  className: classes.input,
                }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="flex-end"
              className={classes.loginButton}
            >
              <Button style={{ color: "white" }} onClick={handleSignUp}>
                Sign Up
              </Button>
              <Button style={{ color: "white" }} onClick={handleLogin}>
                Log In
              </Button>
            </Box>
          </CardContent>
        </Card>
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
