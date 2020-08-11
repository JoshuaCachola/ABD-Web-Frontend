import React, { useState, useEffect } from "react";
import {
  Container,
  makeStyles,
  Box,
  Avatar,
  Typography,
  Button
} from "@material-ui/core";
import ReactPlayer from "react-player";

import { theme } from "../theme";
import Navbar from "./utils/Navbar";
import api from "../utils";

const useStyles = makeStyles((theme) => ({
  menuBar: {
    borderTop: "1px solid #c8c8c8",
    margin: "auto auto",
    justifyContent: "center",
    display: "flex",
    maxWidth: "95%",
  },
  skateSpotFeed: {
    maxWidth: "80%",
    [theme.breakpoints.down("xs")]: {
      display: "grid",
      gridTemplateColumns: "repeat(393px 1fr)",
      gridGap: "30px 0px",
      margin: "auto auto",
      justifyContent: "center",
    },
    [theme.breakpoints.up("sm")]: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(293px, 3fr))",
      gridGap: "30px 0px",
      margin: "auto auto",
      justifyContent: "center",
    },
  },
  skateFeedChild: {
    backgroundColor: "#000000",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
    maxWidth: "293px",
    minHeight: "293px",
    cursor: "pointer",
  },
  skateFeedImg: {
    maxWidth: "100%",
    width: "293px",
    height: "293px",
    objectFit: "contain",
  },
  profile: {
    maxWidth: "95%",
    display: "flex",
    justifyContent: "center",
  },
  profileDetails: {
    margin: "20px 30px",
    display: "flex",
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20)
  },
  root: {
    maxWidth: "70%"
  },
  username: {
    fontSize: "24px",
    fontWeight: "bold"
  },
  bold: {
    fontWeight: "bold",
    fontSize: "20px"
  }
}));

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [profileDetails, setProfileDetails] = useState({});

  useEffect(() => {
    (async () => {
      try {
        let res = await fetch(`${api.url}/skateposts`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`
          }
        });

        if (!res.ok) {
          throw res;
        }

        res = await res.json();
        setPosts(res);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let res = await fetch(`${api.url}/skaters/${localStorage.getItem("ID")}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`
          }
        });

        if (!res.ok) {
          throw res;
        }

        res = await res.json();

        setProfileDetails(res);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Container className={classes.root}>
        <Container className={classes.profile}>
          <Container className={classes.profileDetails}>
            <Box mr={3}>
              <Avatar
                className={classes.large}
              >
                J
            </Avatar>
            </Box>
            <Box ml={5} display="flex" flexDirection="column">
              <Box display="flex">
                <Box mr={2} mb={2}>
                  <Typography className={classes.username}>{profileDetails.username}</Typography>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                  >
                    Edit Profile
                  </Button>
                </Box>
              </Box>
              <Box display="flex" mb={2}>
                <Box mr={2}>
                  <Typography><span className={classes.bold}>{posts.length}</span> posts</Typography>
                </Box>
                <Box mr={2}>
                  <Typography><span className={classes.bold}>0</span> skate crews</Typography>
                </Box>
                <Box>
                  <Typography><span className={classes.bold}>0</span> skate spots followed</Typography>
                </Box>
              </Box>
              <Box mb={2}>
                <Typography className={classes.bold}>{profileDetails.firstName} {profileDetails.lastName}</Typography>
              </Box>
            </Box>
          </Container>
        </Container>
        <br />
        <div className={classes.menuBar}>
          <Box mt={5}>
            <Container className={classes.skateSpotFeed}>
              {posts &&
                posts.map(({ post }, i) => {
                  return (
                    <div
                      key={i}
                      id={i}
                      // onClick={handleSkatePost}
                      className={classes.skateFeedChild}
                    >
                      {post[0].endsWith("mp4") ? (
                        <ReactPlayer
                          url={post[0]}
                          light={false}
                          height="100%"
                          width="293px"
                        />
                      ) : (
                          <img
                            className={classes.skateFeedImg}
                            src={post[0]}
                            alt="skate-pic"
                          />
                        )}
                    </div>
                  );
                })}
            </Container>
            {/* <Box>
            {isShowingPost && (
              <SkateSpotPost
                skateSpotId={id}
                id={posts[postIndex].id}
                skater={posts[postIndex].skater}
                post={posts[postIndex].post}
                caption={posts[postIndex].caption}
              />
            )}
          </Box> */}
          </Box>
        </div>
      </Container>
    </>
  );
};

export default Profile;
