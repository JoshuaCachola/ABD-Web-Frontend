import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Card, CardContent, makeStyles } from "@material-ui/core";

import Navbar from "../utils/Navbar";
import { apiBaseUrl } from "../../config";

const CreateSkatePost = ({ match: { url } }) => {
  const skateSpotId = url.split("/")[2];
  const history = useHistory();
  const [caption, setCaption] = useState("");
  const [file, setFileInput] = useState("");

  const handleSetCaption = e => setCaption(e.target.value);
  const handleFileInput = e => {
    console.log(e.target.files);
    setFileInput(e.target.files[0]);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { type } = file;
      const body = new FormData();
      let res;
      if (type === "video/mp4") {
        body.append("video", file);
        res = await fetch(`${apiBaseUrl}/skatespots/upload-video`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`
          },
          body
        });
      } else if (type.split("/")[0] === "image") {
        body.append("image", file);
        res = await fetch(`${apiBaseUrl}/skatespots/upload-image`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`
          },
          body
        });
      }

      if (!res.ok) throw res;

      const { postUrl } = await res.json();

      res = await fetch(`${apiBaseUrl}/skatespots/${skateSpotId}/posts`, {
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

  return (
    <div className="skate-spot__create-post">
      <nav>
        <Navbar />
      </nav>
      <Box display="flex" justifyContent="center">
        <Card>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name={caption}
              onChange={handleSetCaption}
              placeholder="Caption"
            />
            <input
              type="file"
              name={file}
              onChange={handleFileInput}
            />
            <button>Post</button>
          </form>
        </Card>
      </Box>
    </div>
  );
};

export default CreateSkatePost;
