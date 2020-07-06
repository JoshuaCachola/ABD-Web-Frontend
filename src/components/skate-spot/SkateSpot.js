import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { AddAPhoto } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "../utils/Navbar";
import SkateSpotFeed from "./SkateSpotFeed";
import SkateSpotDetails from "./SkateSpotDetails";
import { setSkateSpot } from "../../store/skateSpots";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  child: {
    maxWidth: "80%",
    marginLeft: "10px"
  },
  menuBar: {
    borderTop: '1px solid #c8c8c8',
    margin: 'auto auto',
    justifyContent: 'center',
    display: 'flex',
    maxWidth: '95%'
  }
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
        <div className={classes.menuBar}>
          <div className="skate-spot__menu-bar-button">All</div>
          <div className="skate-spot__menu-bar-button">Images</div>
          <div className="skate-spot__menu-bar-button">Videos</div>
          <Box className="skate-spot__menu-bar-button">
            <AddAPhoto onClick={handleAddPost} />
          </Box>
        </div>
        <br />
        <Box>
          <SkateSpotFeed id={id} className={classes.child} />
        </Box>
      </Box>
    </>
  );
};

const mapStateToProps = state => {
  return {
    skateSpot: state.skateSpotFeed.skateSpot
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSkateSpot: (skateSpot) => dispatch(setSkateSpot(skateSpot)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  SkateSpot
); 
