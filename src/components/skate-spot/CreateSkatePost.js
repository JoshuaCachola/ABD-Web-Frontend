import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Box, Card, makeStyles, Button, TextField } from "@material-ui/core";
import { useDropzone } from "react-dropzone"; 
import styled from "styled-components";

import Navbar from "../utils/Navbar";
import api from "../../utils";

const useStyles = makeStyles({
  root: {
    minWidth: 925,
    padding: 20
  },
  childLabel: {
    marginTop: 10
  }
});

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#326C73";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
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
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const CreateSkatePost = ({ match: { url } }) => {
  const skateSpotId = url.split("/")[2];
  const history = useHistory();
  const [caption, setCaption] = useState("");
  const [file, setFileInput] = useState("");

  const handleSetCaption = e => setCaption(e.target.value);
  
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { type } = file[0];
      console.log(type, file[0])
      const body = new FormData();
      let res;
      if (type === "video/mp4") {
        body.append("video", file[0]);
        res = await fetch(`${api.url}/skatespots/upload-video`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`
          },
          body
        });
      } else {
        body.append("image", file[0]);
        res = await fetch(`${api.url}/skatespots/upload-image`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`
          },
          body
        });
      }

      console.log(res);
      if (!res.ok) throw res;

      const { postUrl } = await res.json();

      res = await fetch(`${api.url}/skatespots/${skateSpotId}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`
        },
        body: JSON.stringify({
          post: [postUrl],
          caption
        })
      });

      if (!res.ok) throw res;

      history.push(`/skatespots`);
    } catch (err) {
      console.error(err);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFileInput(acceptedFiles);
      // console.log(acceptedFiles);
    },
    [setFileInput]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone( { onDrop });
  
  const classes = useStyles();

  return (
    <div className="skate-spot__create-post">
      <nav>
        <Navbar />
      </nav>
      <Box display="flex" justifyContent="center">
        <Card className={classes.root}>
          <form onSubmit={handleSubmit}>
            <Box flexDirection="column" className={classes.child}>
              <Box>
                <label>Caption</label>
              </Box>
              <Box className={classes.child}>
                <TextField
                  type="text"
                  name={caption}
                  onChange={handleSetCaption}
                  placeholder="Caption"
                />
              </Box>
              <Box className={classes.childLabel}>
                <label>File</label>
              </Box>
              <div className="container">
                <Container
                  className={classes.dropContainer}
                  // onDragEnter={handleDragEnter}
                  // onDragLeave={handleDragLeave}
                  {...getRootProps({
                    isDragActive,
                    isDragAccept,
                    isDragReject,
                  })}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>
                      Drag 'n' drop an file here, or click to select a
                      file
                    </p>
                  ) : (
                    <>
                      <p>
                        Drag 'n' drop a different file here, or click to
                        select a different file
                      </p>
                      <div>
                        {file[0] ? <p>{file[0].name}</p> : <p></p>}
                      </div>
                    </>
                  )}
                  {/* </Box>
                </Box> */}
                </Container>
              </div>
              <Box className={classes.childLabel}display="flex" justifyContent="center">
                <Button type="submit">Post</Button>
              </Box>
            </Box>
          </form>
        </Card>
      </Box>
    </div>
  );
};

export default CreateSkatePost;
