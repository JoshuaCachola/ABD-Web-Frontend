import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { setSkateSpots } from "../store/skateSpots";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, Box, Button, Avatar } from "@material-ui/core";

// Components
import Navbar from "./utils/Navbar";
import api from "../utils";
import { setCurrentSkateSpot } from "../store/skateSpots";
import { setYourFollowedSpots } from "../store/skateSpots";

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
  skateSpot: {
    cursor: "pointer",
  },
  skateSpotDetails: {
    marginLeft: "20px",
  },
}));

const SkateSpots = ({ history }) => {
  const dispatch = useDispatch();
  const skateSpots = useSelector(
    ({ skateSpotFeed }) => skateSpotFeed.skateSpots
  );

  // followed spots queried from db
  const [followedSpots, setFollowedSpots] = useState([]);

  // gets followed skate spots and updates followedSpots state
  const getFollowedSpots = async () => {
    try {
      let res = await fetch(`${api.url}/skatespots/following`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`,
        },
      });

      if (!res.ok) {
        throw res;
      }

      res = await res.json();
      setFollowedSpots(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFollowedSpots();
  }, [followedSpots.length]);

  useEffect(
    () => {
      if (!skateSpots.length) {
        dispatch(setSkateSpots());
      }
    },
    // eslint-disable-next-line
    [skateSpots, skateSpots.length, setSkateSpots]
  );

  const followSkateSpot = async (skateSpotId, type) => {
    try {
      let res;
      if (type === "follow") {
        res = await fetch(`${api.url}/skatespots/${skateSpotId}/follow`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`,
          },
        });
      } else {
        res = await fetch(`${api.url}/skatespots/${skateSpotId}/unfollow`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`,
          },
        });

        console.log("it worked");
        const newArr = followedSpots.filter(
          (spot) => spot.skateSpotId !== skateSpotId
        );
        setFollowedSpots(newArr);
        console.log("im here");
        return;
      }

      if (!res.ok) {
        throw res;
      }

      getFollowedSpots();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRouteToSpot = (skateSpotId, skateSpot) => {
    dispatch(setCurrentSkateSpot(skateSpot));
    history.push(`/skatespots/${skateSpotId}`);
  };
  console.log(followedSpots);
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
                <CardContent key={skateSpot.id} id={skateSpot.id}>
                  {/* <Link
                    to={{
                      pathname: `/skatespots/${skateSpot.id}`,
                      state: {
                        skateSpot,
                      },
                    }}
                    style={{ textDecoration: "none" }}
                  > */}
                  <Box className={classes.spotListingsContainer}>
                    <Box
                      className={classes.skateSpot}
                      display="flex"
                      onClick={() => handleRouteToSpot(skateSpot.id, skateSpot)}
                    >
                      <Box className={classes.avatar}>
                        <Avatar
                          className={classes.img}
                          src={skateSpot.imgs[0]}
                          alt="skate-img"
                        />
                      </Box>
                      <Box
                        className={classes.skateSpotDetails}
                        alignItems="center"
                      >
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
                    </Box>
                    <Box justifyContent="flex-end" className={classes.buttons}>
                      {followedSpots.find(
                        (spot) => spot.skateSpotId === skateSpot.id
                      ) ? (
                        <Button
                          color="secondary"
                          onClick={() =>
                            followSkateSpot(skateSpot.id, "unfollow")
                          }
                        >
                          Unfollow
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() =>
                            followSkateSpot(skateSpot.id, "follow")
                          }
                        >
                          Follow
                        </Button>
                      )}
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
