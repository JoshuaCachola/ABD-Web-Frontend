import React, { useState, useEffect } from "react";
import {
  Container,
  makeStyles,
  Box,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import ReactPlayer from "react-player";

import Navbar from "./utils/Navbar";
import api from "../utils";
import { USER_ID, TOKEN_KEY } from "../constants";

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
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  avatarOverlay: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    position: "absolute",
    opacity: 0,
    transition: ".5 ease",
    top: 70,
    "&:hover": {
      opacity: 1,
    },
    [theme.breakpoints.down("sm")]: {
      top: 50,
    },
  },
  root: {
    maxWidth: "70%",
  },
  username: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  staticText: {
    fontSize: "14px",
  },
  changeAvatar: {
    textAlign: "center",
  },
  fileInput: {
    opacity: 0,
    cursor: "pointer",
  },
  uploadPictureButton: {
    marginTop: "5px",
  },
  skaterName: {
    fontWeight: "bold",
    fontSize: "20px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  },
  postsAndFollows: {
    fontWeight: "bold",
    fontSize: "18px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
}));

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [profileDetails, setProfileDetails] = useState({});
  const [imgPath, setImgPath] = useState("");

  const handleSetImgPath = (e) => {
    setImgPath(e.target.files[0]);
  };

  const handleChangePicture = () => {};

  useEffect(() => {
    /**
     * IIFE - fetches posts created by the skater
     */
    (async () => {
      try {
        let res = await fetch(`${api.url}/api/v1/skateposts`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
          },
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
    /**
     * IFFE - fetches skater's profile details
     */
    (async () => {
      try {
        let res = await fetch(
          `${api.url}/api/v1/skaters/${localStorage.getItem(USER_ID)}`,
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
            <Box mr={3} width="50%">
              <Avatar className={classes.avatar}>J</Avatar>
              <Avatar className={classes.avatarOverlay}>
                <div className={classes.changeAvatar}>
                  <Typography style={{ fontSize: "14px", marginTop: "30px" }}>
                    Change profile picture
                  </Typography>
                  <input
                    type="file"
                    className={classes.fileInput}
                    onChange={handleSetImgPath}
                  />
                </div>
              </Avatar>
              <Box mt={2} mr={9}>
                {imgPath && (
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    style={{ fontFamily: "Rock Salt", fontSize: "10px" }}
                    onClick={handleChangePicture}
                  >
                    Update profile picture
                  </Button>
                )}
              </Box>
            </Box>
            <Box ml={5} display="flex" flexDirection="column">
              <Box display="flex">
                <Box mr={2} mb={2}>
                  <Typography className={classes.username}>
                    {profileDetails.username}
                  </Typography>
                </Box>
                {/* <Box>
                  <Button
                    color="secondary"
                    size="small"
                    style={{ fontFamily: "Rock Salt" }}
                  >
                    Change profile picture
                  </Button>
                </Box> */}
              </Box>
              <Box display="flex" mb={2}>
                <Box mr={2} width={75}>
                  <Typography>
                    <span className={classes.postsAndFollows}>
                      {posts.length}
                    </span>{" "}
                    <span className={classes.staticText}>posts</span>
                  </Typography>
                </Box>
                {/* <Box mr={2}>
                  <Typography>
                    <span className={classes.bold}>0</span> skate crews
                  </Typography>
                </Box> */}
                <Box width={200}>
                  <Typography>
                    <span className={classes.postsAndFollows}>0</span>
                    <span className={classes.staticText}> followed spots</span>
                  </Typography>
                </Box>
              </Box>
              <Box mb={2}>
                <Typography className={classes.skaterName}>
                  {profileDetails.firstName} {profileDetails.lastName}
                </Typography>
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
