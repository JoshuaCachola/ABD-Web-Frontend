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
  }
});

const SkateSpots = ({ skateSpots, getSkateSpots }) => {
  const history = useHistory()

  useEffect(() => {
    if (!skateSpots.length) {
      getSkateSpots();
    }
  }, [skateSpots, skateSpots.length, getSkateSpots]);

  const addNewSpot = () => {
    history.push("/skatespots/create-spot");
    // return <Redirect to="/skatespots/create-spot" />;
  };

  const classes = useStyles();
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="skate-spots">
        {/* <h1>Skate Spots List</h1> */}
        <Box display="flex" alignItems="center" justifyContent="center">
          <Card className={classes.root}>
            {skateSpots.map((skateSpot) => (
              <CardContent key={skateSpot.id}>
                <Link to={{
                  pathname: `/skatespots/${skateSpot.id}`,
                  state: {
                    skateSpot
                  }
                }}>
                  <Box display="flex" justifyContent="space-between">
                    <Box flexBasis="30%">
                      <img
                        className={classes.img}
                        src={skateSpot.imgs[0]}
                        alt="skate-img"
                      />
                    </Box>
                    <Box alignItems="center" flexBasis="30%">
                      <div className="skate-spots__name">{skateSpot.name}</div>
                      <div className="skate-spots__city">{skateSpot.city}</div>
                      <div className="skate-spots__state">{skateSpot.state}</div>
                    </Box>
                    <Box>
                      <Button flexBasis="30%">Follow</Button>
                    </Box>
                  </Box>
                </Link>
              </CardContent>
            ))}
          </Card>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={addNewSpot}>Add spot</Button>
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
    getSkateSpots: () => dispatch(setSkateSpots())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  SkateSpots
);
