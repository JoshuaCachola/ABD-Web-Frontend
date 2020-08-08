import React, { useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Box, makeStyles, Tooltip } from "@material-ui/core";
import { AddAPhoto } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "../utils/Navbar";
import SkateSpotFeed from "./SkateSpotFeed";
import SkateSpotDetails from "./SkateSpotDetails";
import { setSkateSpot } from "../../store/skateSpots";
import { theme } from "../../theme";
import { getSpotPosts } from "../../store/skateSpotPosts";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  child: {
    maxWidth: "80%",
    marginLeft: "10px",
  },
  menuBar: {
    borderTop: "1px solid #c8c8c8",
    margin: "auto auto",
    justifyContent: "center",
    display: "flex",
    maxWidth: "80%",
  },
  addAPhoto: {
    cursor: "pointer",
    "&:hover": {
      color: `${theme.palette.secondary.main}`,
    },
  },
  skateSpotMenuBarButton: {
    // borderTop: "1px solid #c8c8c8",
    maxWidth: "80%",
    margin: "5px auto",
  },
});

const SkateSpot = ({ match, history }) => {
  const skateSpot = useSelector(
    ({ skateSpotFeed }) => skateSpotFeed.currentSkateSpot
  );

  const skateSpotDetails = useRef(skateSpot);
  const id = match.url.split("/")[2];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpotPosts(id));
  }, []);
  const handleAddPost = (e) => {
    history.push(`/skatespots/${id}/post`);
  };

  const classes = useStyles();
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <Box className={classes.root}>
        <Box className={classes.child}>
          <Box display="flex" justifyContent="center">
            <SkateSpotDetails
              skateSpotDetails={skateSpotDetails.current}
              id={id}
            />
          </Box>
        </Box>
        <br />
        <div className={classes.menuBar}>
          {/* <div className="skate-spot__menu-bar-button">All</div>
          <div className="skate-spot__menu-bar-button">Images</div>
          <div className="skate-spot__menu-bar-button">Videos</div> */}
          <Box
            className={classes.skateSpotMenuBarButton}
            display="flex"
            justifyContent="center"
          >
            <Tooltip title="Post a photo to this spot">
              <AddAPhoto
                className={classes.addAPhoto}
                onClick={handleAddPost}
              />
            </Tooltip>
          </Box>
        </div>
        <br />
        <Box>
          <SkateSpotFeed id={id} className={classes.child} />
        </Box>
      </Box>
    </div>
  );
};

export default withRouter(SkateSpot);
