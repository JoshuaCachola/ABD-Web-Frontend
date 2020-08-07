import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Avatar, makeStyles, Container, Button } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    //     backgroundColor: '#fff',
    //     border: '1px solid red',
    //     height: '100px',
    //     borderRadius: '50%',
    // //     -moz - border - radius: 50 %;
    // // -webkit - border - radius: 50 %;
    //     width: '100px',
  },
  skateSpotDetailsImg: {
    backgroundColor: "#fff",
    border: "1px solid red",
    height: "100px",
    borderRadius: "50%",
    // mozBorderRadius: '50%',
    // webkitBorderRadius: '50%',
    width: "100px",
  },
  control: {
    paddingLeft: theme.spacing(10),
  },
  checkCircle: {
    paddingTop: "5px",
  },
  skateSpotCity: {
    fontSize: "16px",
  },
  skateSpotState: {
    fontSize: "14px",
  },
  skateSpotName: {
    fontSize: "24px",
    lineHeight: "32px",
    fontWeight: "bold"
  },
  skateSpotDetails: {
    margin: "20px 90px 20px 20px",
  },
  root: {
    // padding: "10px",
    // margin: "auto auto",
    maxWidth: "100%",
    display: "flex",
    justifyContent: "center",
  },
  bold: {
    fontWeight: "bold"
  }
}));

const SkateSpotDetails = ({ skateSpotDetails }) => {
  const [skateSpot, setSkateSpot] = useState({});
  const numOfPosts = useSelector(({ skateSpotPosts }) => skateSpotPosts.getNumberOfPosts);
  useEffect(() => {
    if (Object.keys(skateSpotDetails).length === 0) {
      setSkateSpot(JSON.parse(localStorage.getItem("CURRENT_SKATE_SPOT")));
    } else {
      setSkateSpot(skateSpotDetails);
    }
  }, [Object.keys(skateSpotDetails).length, skateSpotDetails]);

  console.log(skateSpotDetails);
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      {Object.keys(skateSpot).length && (
        <>
          <Box className={classes.skateSpotDetails}>
            <div className="skate-spot-details__img-container">
              {/* <canvas class="skate-spot-details__canvas"></canvas> */}
              <Box borderRadius="50%" border={6} borderColor="secondary.main">
                <Avatar
                  src={skateSpot.imgs[0]}
                  alt="skate-spot-pic"
                  className={classes.large}
                />
              </Box>
            </div>
          </Box>
          <Box className="skate-spot-details__child skate-spot-details__child-text">
            <Box mb={2} display="flex" className={classes.skateSpotName}>
              <span className="skate-spot-details__check">
                {skateSpot.name} &nbsp;
                <CheckCircleIcon
                  color="secondary"
                  className={classes.checkCircle}
                />
              </span>
              <Box pl={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                >
                  Follow
              </Button>
              </Box>
            </Box>
            <Box mb={2} display="flex">
              <div className={classes.skateSpotCity}>{skateSpot.city}, {skateSpot.state}</div>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box>
                <span className={classes.bold}>{skateSpot.following}</span> {skateSpot.following === 1 ? "follower" : "follower"}
              </Box>
              <Box>
                <span className={classes.bold}>{numOfPosts}</span> {numOfPosts === 1 ? "post" : "posts"}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default SkateSpotDetails;
