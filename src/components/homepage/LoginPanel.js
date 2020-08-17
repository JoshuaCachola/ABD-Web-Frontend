import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { setToken } from "../../store/authentication";
import {
  TextField,
  Button,
  makeStyles,
  Box,
  Card,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import api from "../../utils";

const useStyles = makeStyles({
  input: {
    color: "white",
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
    color: "#326C73",
  },
  loginForm: {
    fontFamily: "Rock Salt",
    color: "white",
    fontSize: 20,
  },
});

const LoginPanel = ({ history }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [username, setUsername] = useState("crookiemonster");
  const [password, setPassword] = useState("verygoodpassword");

  const handleSetUsername = (e) => setUsername(e.target.value);
  const handleSetPassword = (e) => setPassword(e.target.value);

  const handleLogin = async () => {
    try {
      const res = await fetch(`${api.url}/skaters/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw res;
      }

      const { token, id } = await res.json();

      localStorage.setItem("TOKEN_KEY", token);
      localStorage.setItem("ID", id);
      dispatch(setToken(token));
      history.push("/skater-feed");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignUp = () => history.push("/sign-up");

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
          }}
        >
          <CardHeader
            className={classes.loginForm}
            style={{ color: "white" }}
            disableTypography={true}
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
              <Button
                style={{ color: "white", fontFamily: "Rock Salt" }}
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
              <Button
                style={{ color: "white", fontFamily: "Rock Salt" }}
                onClick={handleLogin}
              >
                Log In
              </Button>
            </Box>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
};

// const mapStateToProps = state => {
//   return {
//     authToken: state.authentication.authToken
//   };
// };

// const mapDispathToProps = dispatch => {
//   return {
//     login: (username, password) => dispatch(login(username, password))
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispathToProps
// )(
//   LoginPanel
// );

export default withRouter(LoginPanel);
