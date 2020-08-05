import React, { useState, useEffect } from "react";
import { Box, Avatar, makeStyles, Container } from "@material-ui/core";
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
}));

const SkateSpotDetails = ({ skateSpotDetails }) => {
  const [skateSpot, setSkateSpot] = useState({});

  useEffect(() => {
    if (Object.keys(skateSpotDetails).length === 0) {
      setSkateSpot(JSON.parse(localStorage.getItem("CURRENT_SKATE_SPOT")));
    } else {
      setSkateSpot(skateSpotDetails);
    }
    console.log(skateSpot);
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
            <div className={classes.skateSpotName}>
              <span className="skate-spot-details__check">
                {skateSpot.name} &nbsp;
                <CheckCircleIcon
                  color="secondary"
                  className={classes.checkCircle}
                />
              </span>
            </div>
            <div className={classes.skateSpotCity}>{skateSpot.city}</div>
            <div className={classes.skateSpotState}>{skateSpot.state}</div>
          </Box>
        </>
      )}
    </Container>
  );
};

export default SkateSpotDetails;
