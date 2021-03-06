import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Box, TextField, Button, Card, makeStyles } from "@material-ui/core";

import api from "../config";
import abdLogo from "../images/abd-splash-logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "925px",
    [theme.breakpoints.down("xs")]: {
      minWidth: "100%",
    },
    boxShadow: "0px 0px 7px 7px rgb(0, 0, 0, 0.15)",
  },
  logo: {
    margin: 20,
  },
  loginForm: {
    margin: 20,
  },
  container: {
    padding: 20,
  },
  label: {
    margin: 10,
    minWidth: "120px",
    fontFamily: "Raleway",
    fontWeight: "bold",
  },
}));

const SignUp = ({ history }) => {
  const [firstName, setFirstName] = useState(""),
    [lastName, setLastName] = useState(""),
    [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [phoneNumber, setPhoneNumber] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${api.url}/api/v1/skaters/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          phoneNumber,
          password,
        }),
      });

      if (!res.ok) throw res;

      const { token } = await res.json();

      localStorage.setItem("TOKEN_KEY", token);

      history.push("/skatespots");
    } catch (err) {
      console.error(err);
    }
  };

  const classes = useStyles();
  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.logo}>
          <img src={abdLogo} alt="abd-logo" />
        </Box>
        <Box display="flex" justifyContent="center" alignContent="center">
          <Card className={classes.root}>
            <Box mt={2} mb={2}>
              <form onSubmit={handleSignUp}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Box flexBasis="15%" className={classes.label}>
                    <label>Username</label>
                  </Box>
                  <Box width="220px">
                    <TextField
                      fullWidth
                      margin="dense"
                      variant="outlined"
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      required={true}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Box flexBasis="15%" className={classes.label}>
                    <label>First Name</label>
                  </Box>
                  <Box width="220px">
                    <TextField
                      fullWidth
                      margin="dense"
                      variant="outlined"
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                      required={true}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Box flexBasis="15%" className={classes.label}>
                    <label>Last Name</label>
                  </Box>
                  <Box width="220px">
                    <TextField
                      fullWidth
                      margin="dense"
                      variant="outlined"
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                      required={true}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Box flexBasis="15%" className={classes.label}>
                    <label>Email</label>
                  </Box>
                  <Box width="220px">
                    <TextField
                      fullWidth
                      type="email"
                      margin="dense"
                      variant="outlined"
                      onChange={(e) => setEmail(e.target.value)}
                      required={true}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Box flexBasis="15%" className={classes.label}>
                    <label>Phone Number</label>
                  </Box>
                  <Box width="220px">
                    <TextField
                      fullWidth
                      margin="dense"
                      variant="outlined"
                      type="text"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required={true}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Box flexBasis="15%" className={classes.label}>
                    <label>Password</label>
                  </Box>
                  <Box width="220px">
                    <TextField
                      fullWidth
                      type="password"
                      margin="dense"
                      variant="outlined"
                      onChange={(e) => setPassword(e.target.value)}
                      required={true}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Box flexBasis="15%" className={classes.label}>
                    <label>Confirm Password</label>
                  </Box>
                  <Box width="220px">
                    <TextField
                      fullWidth
                      type="password"
                      margin="dense"
                      variant="outlined"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required={true}
                    />
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  className={classes.label}
                >
                  <Button variant="contained" color="secondary" type="submit">
                    Sign Up
                  </Button>
                </Box>
              </form>
            </Box>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default withRouter(SignUp);
