import React, { useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Box, makeStyles, Tooltip, Container } from "@material-ui/core";
import { AddAPhoto } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "../utils/Navbar";
import SkateSpotFeed from "./SkateSpotFeed";
import SkateSpotDetails from "./SkateSpotDetails";
import { theme } from "../../theme";
import { getSpotPosts } from "../../store/skateSpotPosts";

const useStyles = makeStyles({
  spotContainer: {
    maxWidth: "95%",
    display: "flex",
    justifyContent: "center"
  },
  menuBar: {
    borderTop: "1px solid #c8c8c8",
    margin: "auto auto",
    justifyContent: "center",
    display: "flex",
    maxWidth: "95%",
  },
  addAPhoto: {
    cursor: "pointer",
    "&:hover": {
      color: `${theme.palette.secondary.main}`,
    },
  },
  skateSpotMenuBarButton: {
    maxWidth: "80%",
    margin: "5px auto",
  },
  root: {
    maxWidth: "70%"
  }
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
      <Container className={classes.root}>
        <Container className={classes.spotContainer}>
          <SkateSpotDetails
            skateSpotDetails={skateSpotDetails.current}
            id={id}
          />
        </Container>
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
      </Container>
    </div>
  );
};

export default withRouter(SkateSpot);
