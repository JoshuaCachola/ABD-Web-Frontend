import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setSkateSpots } from "../store/skateSpots";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, Box, Button, Avatar } from "@material-ui/core";

// Components
import Navbar from "./utils/Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 600,
    fontFamily: "Raleway",
    fontWeight: "bold"
  },
  img: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const SkateSpots = ({ skateSpots, getSkateSpots }) => {

  useEffect(() => {
    if (!skateSpots.length) {
      getSkateSpots();
    }
  }, [skateSpots, skateSpots.length, getSkateSpots]);

  const classes = useStyles();
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="skate-spots">
        <Box
          display="flex"
          flexDirection="column"
          className="skate-spots__container"
        >
          <Box display="flex" justifyContent="center">
            <Box className={classes.root}>
              <h2>Suggested Skate Spots</h2>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            className="skate-spots__listings"
          >
            <Card className={classes.root}>
              {skateSpots.map((skateSpot) => (
                <CardContent key={skateSpot.id}>
                  <Link
                    to={{
                      pathname: `/skatespots/${skateSpot.id}`,
                      state: {
                        skateSpot,
                      },
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <Box display="flex" justifyContent="space-between">
                      <Box flexBasis="20%">
                        <Avatar
                          className={classes.img}
                          src={skateSpot.imgs[0]}
                          alt="skate-img"
                        />
                      </Box>
                      <Box alignItems="center" flexBasis="40%">
                        <div className="skate-spots__name">
                          {skateSpot.name}
                        </div>
                        <div className="skate-spots__city">
                          {skateSpot.city}
                        </div>
                        <div className="skate-spots__state">
                          {skateSpot.state}
                        </div>
                      </Box>
                      <Box justifyContent="flex-end">
                        <Button
                        variant="contained"
                        color="secondary"
                      >
                        Follow
                      </Button>
                      </Box>
                    </Box>
                  </Link>
                </CardContent>
              ))}
            </Card>
          </Box>
        </Box>
      </div>
    </>
  );
};

// export default SkateSpots;
const mapStateToProps = state => {
  return {
    skateSpots: state.skateSpotFeed.skateSpots,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSkateSpots: () => dispatch(setSkateSpots()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  SkateSpots
);
