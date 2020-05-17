import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import { setSkateSpots } from "../store/skateSpots";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, Box, Button } from "@material-ui/core";

// Components
import Navbar from "./utils/Navbar";

const useStyles = makeStyles({
  root: {
    minWidth: 600
  },
  img: {
    maxWidth: 100,
    maxHeight: 100,
  },
});

const SkateSpots = ({ skateSpots, getSkateSpots }) => {
  // const history = useHistory()

  useEffect(() => {
    if (!skateSpots.length) {
      getSkateSpots();
    }
    // } else if (!skateSpot)
  }, [skateSpots, skateSpots.length, getSkateSpots]);

  // const addNewSpot = () => {
  //   history.push("/skatespots/create-spot");
  //   // return <Redirect to="/skatespots/create-spot" />;
  // };

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
                      <Box flexBasis="30%">
                        <img
                          className={classes.img}
                          src={skateSpot.imgs[0]}
                          alt="skate-img"
                        />
                      </Box>
                      <Box alignItems="center" flexBasis="30%">
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
                      <Box flexBasis="30%">
                        <Button>Follow</Button>
                      </Box>
                    </Box>
                  </Link>
                </CardContent>
              ))}
            </Card>
          </Box>
          {/* <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            className={classes.addSpotContainer}
          >
            <Box
              display="flex"
              justifyContent="flex-end"
              className={classes.addSpotContent}
            >
              <img src={addSpotImg} alt="add-spot" height="42" width="42" />
            </Box>
            <Box
              display="flex"
              justifyContent="flex-end"
              className={classes.addSpotContent}
            >
              <Button onClick={addNewSpot}>Add spot</Button>
            </Box>
          </Box> */}
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
