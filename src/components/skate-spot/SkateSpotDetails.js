import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Avatar,
  makeStyles,
  Container,
  Button,
  Typography,
} from "@material-ui/core";

import api from "../../utils";
import { handleFollowSkateSpot } from "../../requests";
import {
  CURRENT_SKATE_SPOT,
  FOLLOW,
  TOKEN_KEY,
  UNFOLLOW,
} from "../../constants";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    [theme.breakpoints.down("md")]: {
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
  },
  skateSpotDetailsImg: {
    backgroundColor: "#fff",
    border: "1px solid red",
    height: "100px",
    borderRadius: "50%",
    width: "100px",
    position: "relative",
  },
  control: {
    paddingLeft: theme.spacing(10),
  },
  checkCircle: {
    paddingTop: "5px",
  },
  skateSpotName: {
    fontSize: "24px",
    fontWeight: "bold",
    minWidth: "130px",
    [theme.breakpoints.down("md")]: {
      fontSize: "18px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
  skateSpotDetails: {
    margin: "20px 90px 20px 20px",
  },
  root: {
    margin: "20px 30px",
    display: "flex",
    justifyContent: "center",
  },
  bold: {
    fontWeight: "bold",
    fontSize: "18px",
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
  followersAndPostsText: {
    fontSize: "18px",
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
}));

const SkateSpotDetails = ({ skateSpotDetails, id }) => {
  const [skateSpot, setSkateSpot] = useState({});
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);
  const numOfPosts = useSelector(
    ({ skateSpotPosts }) => skateSpotPosts.getNumberOfPosts
  );

  useEffect(() => {
    if (Object.keys(skateSpot).length) {
      setFollowers(skateSpot.following);
    }
  }, [skateSpot]);

  useEffect(() => {
    if (!Object.keys(skateSpotDetails).length) {
      setSkateSpot(JSON.parse(localStorage.getItem(CURRENT_SKATE_SPOT)));
    } else {
      setSkateSpot(skateSpotDetails);
    }
  }, [skateSpotDetails]);

  useEffect(() => {
    /**
     * IFFE - checks to see if skater is following skatespot
     */
    (async () => {
      try {
        let res = await fetch(
          `${api.url}/api/v1/skatespots/${id}/following-spot`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
            },
          }
        );

        if (!res.ok) {
          throw res;
        }

        res = await res.json();
        if (res.success) {
          setFollowing(true);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  });

  const followSkateSpot = async (skateSpotId, type) => {
    const success = handleFollowSkateSpot(skateSpotId, type);
    if (success && type === FOLLOW) {
      setFollowing(true);
      setFollowers(followers + 1);
    } else if (success && type === UNFOLLOW) {
      setFollowing(false);
      if (followers > 0) {
        setFollowers(followers - 1);
      } else {
        setFollowers(0);
      }
    }
  };

  const createFollowButton = (following) => {
    return following ? (
      <Button
        color="secondary"
        size="small"
        onClick={() => followSkateSpot(skateSpot.id, UNFOLLOW)}
        style={{ fontFamily: "Rock Salt", fontSize: 10 }}
      >
        Unfollow
      </Button>
    ) : (
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={() => followSkateSpot(skateSpot.id, FOLLOW)}
        style={{ fontFamily: "Rock Salt", fontSize: 10 }}
      >
        Follow
      </Button>
    );
  };

  const classes = useStyles();
  return (
    <Container className={classes.root}>
      {Object.keys(skateSpot).length && (
        <>
          <Box borderRadius="50%" border={4} borderColor="secondary.main">
            <Box
              borderRadius="50%"
              border={4}
              borderColor="primary.contrastText"
            >
              <Avatar
                src={skateSpot.imgs[0]}
                alt="skate-spot-pic"
                className={classes.large}
              />
            </Box>
          </Box>
          <Box ml={7} display="flex" flexDirection="column">
            <Box mb={2} display="flex">
              <Typography className={classes.skateSpotName}>
                {skateSpot.name} &nbsp;
              </Typography>
              <Box pl={2}>{createFollowButton(following)}</Box>
            </Box>
            <Box mb={2} display="flex">
              <Typography className={classes.bold}>
                {skateSpot.city}, {skateSpot.state}
              </Typography>
            </Box>
            <Box display="flex">
              <Box mr={4}>
                <Typography className={classes.followersAndPostsText}>
                  <span className={classes.bold}>{followers}</span>
                  &nbsp;{skateSpot.following === 1 ? "follower" : "follower"}
                </Typography>
              </Box>
              <Box>
                <Typography className={classes.followersAndPostsText}>
                  <span className={classes.bold}>{numOfPosts}</span>
                  &nbsp;{numOfPosts === 1 ? "post" : "posts"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default SkateSpotDetails;
