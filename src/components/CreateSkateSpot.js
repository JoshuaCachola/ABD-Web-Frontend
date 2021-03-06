import React, { useState, useCallback } from "react";
import { withRouter } from "react-router-dom";
import {
  TextField,
  Box,
  Card,
  CardContent,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

import api from "../utils";
import Navbar from "./utils/Navbar";
import { TOKEN_KEY } from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "925px",
    boxShadow: "0px 0px 7px 7px rgba(0, 0, 0, .15)",
    [theme.breakpoints.down("xs")]: {
      minWidth: "100%",
    },
  },
  img: {
    maxWidth: 100,
    maxHeight: 100,
  },
  container: {
    padding: 10,
  },
  header: {
    minWidth: "925px",
    margin: 10,
    fontFamily: "Raleway",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      minWidth: "100%",
    },
  },
  dropContainer: {
    marginTop: 10,
  },
  button: {
    marginTop: 10,
  },
}));

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#F08080";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#F08080";
  }
  return "#eeeeee";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #f08080;
  outline: none;
  transition: border 0.24s ease-in-out;
  height: 300px;
`;

const CreateSkateSpot = ({ history }) => {
  const [name, setSpotName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCityName] = useState("");
  const [state, setStateName] = useState("");
  const [imgPath, setImgPath] = useState("");

  const handleSpotName = (e) => setSpotName(e.target.value);
  const handleCityName = (e) => setCityName(e.target.value);
  const handleStateName = (e) => setStateName(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);

  const createSpot = async (e) => {
    e.preventDefault();
    try {
      const body = new FormData();
      body.append("image", imgPath[0]);
      let res = await fetch(`${api.url}/api/v1/skatespots/upload-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
        body,
      });

      if (!res.ok) {
        throw res;
      }

      const { postUrl } = await res.json();

      res = await fetch(`${api.url}/api/v1/skatespots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
        body: JSON.stringify({
          name,
          city,
          state,
          address,
          imgs: [postUrl],
        }),
      });

      if (!res.ok) {
        throw res;
      }

      history.push("/skatespots");
    } catch (err) {
      console.error(err);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      setImgPath(acceptedFiles);
    },
    [setImgPath]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: "image/*", onDrop });

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
          <CardContent>
            <Box display="flex" justifyContent="center">
              <Box display="flex" justifyContent="center">
                <form onSubmit={createSpot}>
                  <Box flexDirection="column">
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box flexBasis="25%">
                        <label>Name</label>
                      </Box>
                      <Box justifyContent="flex-end">
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
                      <Box>
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
                      <Box>
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
                      <Box>
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
                  <div className="container">
                    <Container
                      className={classes.dropContainer}
                      {...getRootProps({
                        isDragActive,
                        isDragAccept,
                        isDragReject,
                      })}
                    >
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>
                          Drag 'n' drop a different image file here, or click to
                          select a file
                        </p>
                      ) : (
                        <>
                          <p>
                            Drag 'n' drop an image file here, or click to select
                            a file
                          </p>
                          <div>
                            {imgPath[0] ? <p>{imgPath[0].name}</p> : <p></p>}
                          </div>
                        </>
                      )}
                    </Container>
                  </div>
                  <Box display="flex" justifyContent="center">
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                    >
                      Share spot
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default withRouter(CreateSkateSpot);
