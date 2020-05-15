import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Box,
  Card,
  CardContent,
  makeStyles
} from "@material-ui/core";
import api from "../utils";

import Navbar from "./utils/Navbar";

const useStyles = makeStyles({
  root: {
    minWidth: 925,
  },
  img: {
    maxWidth: 100,
    maxHeight: 100,
  },
});

const CreateSkateSpot = () => {
  const history = useHistory();
  const [name, setSpotName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCityName] = useState("");
  const [state, setStateName] = useState("");
  const [imgPath, setImgPath] = useState("");

  const handleSpotName = e => setSpotName(e.target.value);
  const handleCityName = e => setCityName(e.target.value);
  const handleStateName = e => setStateName(e.target.value);
  const handleAddress = e => setAddress(e.target.value);
  const handleImgFileInput = e => {
    setImgPath(e.target.files[0]);
  }

  const createSpot = async e => {
    e.preventDefault();
    try {
      const body = new FormData();
      body.append("image", imgPath);
      let res = await fetch(`${api.url}/skatespots/upload-picture`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`
        },
        body
      });

      if (!res.ok) throw res;

      const { postUrl } = await res.json();

      res = await fetch(`${api.url}/skatespots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`,
        },
        body: JSON.stringify({
          name,
          city,
          state,
          address,
          imgs: [postUrl]
        }),
      });

      if (!res.ok) throw res;

      history.push("/skatespots")
    } catch (err) {
      console.error(err);
    }
  }

  const classes = useStyles();
  return (
    <div className="skate-spots__create-form">
      <nav>
        <Navbar />
      </nav>
      <Box display="flex" justifyContent="center">
        <Card className={classes.root}>
          {/* <CardContent>
            <label>Image of Spot</label>
            <input type="file" name={imgPath} onChange={handleImgFileInput} />
          </CardContent> */}
          <CardContent>
            <form onSubmit={createSpot}>
              <Box display="flex" flexDirection="column">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <label>Name</label>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    type="text"
                    name={name}
                    onChange={handleSpotName}
                  />
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <label>City</label>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    type="text"
                    name={city}
                    onChange={handleCityName}
                  />
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <label>State</label>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    type="text"
                    name={state}
                    onChange={handleStateName}
                  />
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <label>Address</label>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    type="text"
                    name={address}
                    onChange={handleAddress}
                  />
                </Box>
                {/* Change to a drag and drop */}
                <Box display="flex" justifyContent="center" alignItems="center">
                  <label>Image of Spot</label>
                  <input
                    type="file"
                    name={imgPath}
                    onChange={handleImgFileInput}
                  />
                </Box>
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <button type="submit">Share Spot</button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default CreateSkateSpot;
