import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Box,
  Card,
  CardContent,
  makeStyles
} from "@material-ui/core";
import { useDropzone } from "react-dropzone"; 

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
  container: {
    padding: 10
  },
  header: {
    minWidth: 925,
    margin: 10
  },
  // dropContainer: {
  //   border: "1px solid black"
  // }
});

const CreateSkateSpot = () => {
  const history = useHistory();
  const [name, setSpotName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCityName] = useState("");
  const [state, setStateName] = useState("");
  const [imgPath, setImgPath] = useState("");
  const dropContainer = document.getElementById("dropContainer");

  const handleSpotName = e => setSpotName(e.target.value);
  const handleCityName = e => setCityName(e.target.value);
  const handleStateName = e => setStateName(e.target.value);
  const handleAddress = e => setAddress(e.target.value);
  // const handleImgFileInput = e => {
  //   setImgPath(e.target.file[0]);
  // }

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

  const onDrop = useCallback((acceptedFiles) => {
    setImgPath(acceptedFiles);
    console.log(acceptedFiles);
    console.log(imgPath);
    
  }, [imgPath]);

  // const handleDragEnter = e => {
  //   dropContainer.classList.add("skate-spots__drag--active")
  // };

  // const handleDragLeave = e => {
  //   dropContainer.classList.remove("skate-spots__drag--active");
  // };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const classes = useStyles();
  return (
    <div className="skate-spots__create-form">
      <nav>
        <Navbar />
      </nav>
      <Box display="flex" justifyContent="center" className={classes.container}>
        <Box display="flex" className={classes.header}>
          <h2>Create a skate spot</h2>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        className={classes.formContainer}
      >
        <Card className={classes.root}>
          {/* <CardContent>
            <label>Image of Spot</label>
            <input type="file" name={imgPath} onChange={handleImgFileInput} />
          </CardContent> */}
          <CardContent>
            <Box display="flex" className={classes.root}>
              <form onSubmit={createSpot}>
                <Box flexDirection="column" flexBasis="50%">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box flexBasis="25%">
                      <label>Name</label>
                    </Box>
                    <Box flexBasis="75%" justifyContent="flex-end">
                      <TextField
                        margin="dense"
                        variant="outlined"
                        type="text"
                        name={name}
                        onChange={handleSpotName}
                      />
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box flexBasis="25%">
                      <label>City</label>
                    </Box>
                    <Box flexBasis="75%">
                      <TextField
                        margin="dense"
                        variant="outlined"
                        type="text"
                        name={city}
                        onChange={handleCityName}
                      />
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box flexBasis="25%">
                      <label>State</label>
                    </Box>
                    <Box flexBasis="75%">
                      <TextField
                        margin="dense"
                        variant="outlined"
                        type="text"
                        name={state}
                        onChange={handleStateName}
                      />
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box flexBasis="25%">
                      <label>Address</label>
                    </Box>
                    <Box flexBasis="75%">
                      <TextField
                        margin="dense"
                        variant="outlined"
                        type="text"
                        name={address}
                        onChange={handleAddress}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                  <button type="submit">Share Spot</button>
                </Box>
              </form>
              {/* <Box display="flex" justifyContent="flex-end">
                <Box flexBasis="75%"> */}
                  <div 
                    id="dropContainer" 
                    // onDragEnter={handleDragEnter} 
                    // onDragLeave={handleDragLeave}
                    {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <Box alignContent="center">
                        <p>Drop the files here...</p>
                      </Box>
                    ) : (
                      <Box>
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      </Box>
                    )}
                  {/* </Box>
                </Box> */}
              </div>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default CreateSkateSpot;
