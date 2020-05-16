import React from "react";
import { Box, Avatar, makeStyles } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  control: {
    paddingLeft: theme.spacing(10)
  },
}));

const SkateSpotDetails = ({skateSpot}) => {
  const classes = useStyles();

  return (
    <Box display="flex" className="skate-spots-details">
      <Box className="skate-spot-details__child">
        {/* <canvas class="skate-spot-details__canvas"></canvas> */}
        <span className="skate-spot-details__img">
          <Avatar
            src={skateSpot.imgs[0]}
            alt="skate-spot-pic"
            className={classes.large}
          />
        </span>
      </Box>
      <Box className="skate-spot-details__child skate-spot-details__child-text">
        <div className="skate-spots__name">
          <span className="skate-spot-details__check">
            {skateSpot.name} &nbsp;
            <CheckCircleIcon className="skate-spot-details__check" />
          </span>
        </div>
        <div className="skate-spots__city">{skateSpot.city}</div>
        <div className="skate-spots__state">{skateSpot.state}</div>
      </Box>
    </Box>
  );
};

export default SkateSpotDetails;
