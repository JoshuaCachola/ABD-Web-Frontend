import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { AddAPhoto } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import Navbar from "../utils/Navbar";
import SkateSpotFeed from "./SkateSpotFeed";
import SkateSpotDetails from "./SkateSpotDetails";


const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  child: {
    maxWidth: "80%",
    marginLeft: "10px"
  },
});

const SkateSpot = ({ location, match }) => {
  const { skateSpot } = location.state;
  const id = match.url.split("/")[2];
  const history = useHistory();

  const handleAddPost = (e) => {
    history.push(`/skatespots/${id}/post`)
  };

  const classes = useStyles();
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <Box className={classes.root}>
        <Box className={classes.child}>
          <Box display="flex" justifyContent="center">
            <SkateSpotDetails skateSpot={skateSpot} />
          </Box>
        </Box>
        <br />
        <div className="skate-spot__menu-bar">
          <div className="skate-spot__menu-bar-button">All</div>
          <div className="skate-spot__menu-bar-button">Images</div>
          <div className="skate-spot__menu-bar-button">Videos</div>
        </div>
        <br />
        <Box>
          <SkateSpotFeed id={id} className={classes.child}/>
          </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          className="skate-spot__add-a-photo"
        >
          <AddAPhoto onClick={handleAddPost} />
        </Box>
      </Box>
    </>
  );
};

export default SkateSpot;
