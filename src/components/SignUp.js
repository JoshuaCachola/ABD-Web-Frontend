import React, { useState } from "react";
import { 
  Box, 
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,

} from "@material-ui/core";

import api from "../config";

const SignUp = () => {
  const [ firstName, setFirstName ] = useState(""),
        [ lastName, setLastName ] = useState(""),
        [ username, setUsername ] = useState(""),
        [ email, setEmail ] = useState(""),
        [ phoneNumber, setPhoneNumber ] = useState(""),
        [ password, setPassword ] = useState(""),
        [ confirmPassword, setConfirmPassword ] = useState("");
  
  const handleSignUp = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    try {
      const res = await fetch(`${api.url}/skaters/signup`, {
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
          password
        })
      });

      if (!res.ok) throw res;


    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <form onSubmit={handleSignUp}>
        <Box>
          <label>Username</label>
        </Box>
        <Box>
          <TextField
            margin="dense"
            variant="outlined"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box>
          <label>First Name</label>
        </Box>
        <Box>
          <TextField
            margin="dense"
            variant="outlined"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Box>
        <Box>
          <label>Last Name</label>
        </Box>
        <Box>
          <TextField
            margin="dense"
            variant="outlined"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>
        <Box>
          <label>Email</label>
        </Box>
        <Box>
          <TextField
            margin="dense"
            variant="outlined"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <label>Phone Number</label>
        </Box>
        <Box>
          <TextField
            margin="dense"
            variant="outlined"
            type="text"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Box>
        <Box>
          <label>Password</label>
        </Box>
        <Box>
          <TextField
            margin="dense"
            variant="outlined"
            type="text"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box>
          <label>Confirm Password</label>
        </Box>
        <Box>
          <TextField
            margin="dense"
            variant="outlined"
            type="text"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Box>
        <Box>
          <Button>Sign Up</Button>
        </Box>
      </form>
    </>
  );
};

export default SignUp;
