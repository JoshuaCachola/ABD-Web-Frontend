import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { setSkateSpots, currentSkateSpot } from "../store/skateSpots";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, Box, Button, Avatar } from "@material-ui/core";

// Components
import Navbar from "./utils/Navbar";
import api from "../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 600,
    fontFamily: "Raleway",
    fontWeight: "bold",
    fontSize: "14px",
    margin: "10px 0",
  },
  img: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  skateSpotsContainer: {
    boxShadow: "0 0 12px rgba(0,0,0,0.2)",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(293px, 1fr))",
    gridGap: "30px 0px",
    marginLeft: "35px",
  },
  buttons: {
    lineHeight: "18px",
    marginLeft: "7px",
    padding: "9px 14px",
  },
  avatar: {
    paddingLeft: "14px",
  },
  spotListingsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  skateSpotListings: {
    margin: "10px",
    border: "1px solid black",
  },
  skateSpotsName: {
    fontSize: "24px",
    lineHeight: "32px",
  },
  skateSpotsCity: {
    fontSize: "16px",
  },
  skateSpotsState: {
    fontSize: "14px",
  },
}));

const SkateSpots = ({ history }) => {
  const dispatch = useDispatch();
  const skateSpots = useSelector(
    ({ skateSpotFeed }) => skateSpotFeed.skateSpots
  );
  useEffect(
    () => {
      if (!skateSpots.length) {
        dispatch(setSkateSpots());
      }
    },
    // eslint-disable-next-line
    [skateSpots, skateSpots.length, setSkateSpots]
  );

  const followSkateSpot = async (skateSpotId) => {
    try {
      const res = await fetch(`${api.url}/${skateSpotId}/follow`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`,
        },
      });

      if (!res.ok) {
        throw res;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRouteToSpot = (skateSpotId, skateSpot) => {
    dispatch(currentSkateSpot(skateSpot));
    history.push(`/skatespots/${skateSpotId}`);
  };

  const classes = useStyles();
  return (
    <>
      <Navbar />
      <div className="skate-spots">
        <Box display="flex" flexDirection="column" p={1}>
          <Box display="flex" justifyContent="center">
            <Box className={classes.root}>
              <h2>Suggested Skate Spots</h2>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            className={classes.skateSpotsListings}
          >
            <Card className={classes.root}>
              {skateSpots.map((skateSpot) => (
                <CardContent key={skateSpot.id}>
                  {/* <Link
                    to={{
                      pathname: `/skatespots/${skateSpot.id}`,
                      state: {
                        skateSpot,
                      },
                    }}
                    style={{ textDecoration: "none" }}
                  > */}
                  <Box
                    onClick={() => handleRouteToSpot(skateSpot.id, skateSpot)}
                    className={classes.spotListingsContainer}
                  >
                    <Box flexBasis="20%" className={classes.avatar}>
                      <Avatar
                        className={classes.img}
                        src={skateSpot.imgs[0]}
                        alt="skate-img"
                      />
                    </Box>
                    <Box alignItems="center" flexBasis="50%">
                      <div className={classes.skateSpotsName}>
                        {skateSpot.name}
                      </div>
                      <div className={classes.skateSpotsCity}>
                        {skateSpot.city}
                      </div>
                      <div className={classes.skateSpotsState}>
                        {skateSpot.state}
                      </div>
                    </Box>
                    <Box justifyContent="flex-end" className={classes.buttons}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => followSkateSpot(skateSpot.id)}
                      >
                        Follow
                      </Button>
                    </Box>
                  </Box>
                  {/* </Link> */}
                </CardContent>
              ))}
            </Card>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default withRouter(SkateSpots);
