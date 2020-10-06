import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  makeStyles,
  Box,
  Avatar,
  Typography,
  Snackbar,
  Slide,
} from "@material-ui/core";
import ReactPlayer from "react-player";

import Navbar from "./utils/Navbar";
import api from "../utils";
import { TOKEN_KEY } from "../constants";
import { getFollowedSpotsCount } from "../requests";

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
    cursor: "pointer",
    "&:hover": {
      opacity: 1,
    },
    [theme.breakpoints.down("sm")]: {
      top: 50,
    },
    [theme.breakpoints.down("md")]: {
      top: 52,
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
    display: "none",
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
  const [numFollowedSpots, setNumFollowedSpots] = useState(0);
  const [profileDetails, setProfileDetails] = useState({});
  const [imgPath, setImgPath] = useState("");
  const [showNotification, setShowNotification] = useState({
    open: false,
    Transition: Slide,
  });
  const fileInputRef = useRef(null);

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
        let res = await fetch(`${api.url}/api/v1/skaters/skater-profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
          },
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

  useEffect(() => {
    (async () => {
      const count = await getFollowedSpotsCount();
      setNumFollowedSpots(count);
    })();
  }, []);

  useEffect(() => {
    if (imgPath) {
      (async () => {
        await updateProfilePicture();
      })();
      setImgPath("");
    }
  }, [imgPath]);

  // Sets imgPath state if there is something in fileInputRef
  const handleSetImgPath = () => {
    if (fileInputRef.current.files.length) {
      setImgPath(fileInputRef.current.files[0]);
    }
  };

  const updateProfilePicture = async () => {
    try {
      const body = new FormData();
      body.append("image", imgPath);
      let res = await fetch(`${api.url}/api/v1/skatespots/upload-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
        body,
      });

      if (!res.ok) {
        throw res;
      }

      const { postUrl } = await res.json();

      res = await fetch(`${api.url}/api/v1/skaters/change-profile-picture`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
        body: JSON.stringify({ profileImg: postUrl }),
      });

      if (!res.ok) {
        throw res;
      }

      // update profile picture in profileDetails state
      const { success } = await res.json();
      if (success) {
        const newProfileDetails = { ...profileDetails };
        newProfileDetails.accountPhoto = postUrl;
        setProfileDetails(newProfileDetails);
      }

      // show notification that profile picture has changed
      const newNotification = { ...showNotification };
      newNotification.open = true;
      setShowNotification(newNotification);
    } catch (err) {
      console.error(err);
    }
  };

  // closes the notification
  const handleCloseNotification = () => {
    const newNotification = { ...showNotification };
    newNotification.open = false;
    setShowNotification(newNotification);
  };

  // cleanup function
  useEffect(() => {
    return () => {
      setImgPath("");
    };
  }, []);

  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Container className={classes.root}>
        <Container className={classes.profile}>
          <Container className={classes.profileDetails}>
            <Box mr={3} width="50%">
              {profileDetails.accountPhoto ? (
                <Avatar
                  src={profileDetails.accountPhoto}
                  alt="profile-picture"
                  className={classes.avatar}
                />
              ) : (
                <Avatar className={classes.avatar}>
                  {profileDetails.username}
                </Avatar>
              )}
              <Avatar
                className={classes.avatarOverlay}
                onClick={() => fileInputRef.current.click()}
              >
                <div className={classes.changeAvatar}>
                  <Typography style={{ fontSize: "14px", fontWeight: "bold" }}>
                    Change profile picture
                  </Typography>
                  <input
                    type="file"
                    className={classes.fileInput}
                    ref={fileInputRef}
                    onChange={handleSetImgPath}
                  />
                </div>
              </Avatar>
            </Box>
            <Box ml={5} display="flex" flexDirection="column">
              <Box display="flex">
                <Box mr={2} mb={2}>
                  <Typography className={classes.username}>
                    {profileDetails.username}
                  </Typography>
                </Box>
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
                <Box width={200}>
                  <Typography>
                    <span className={classes.postsAndFollows}>
                      {numFollowedSpots}
                    </span>
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
            <Snackbar
              open={showNotification.open}
              onClose={handleCloseNotification}
              TransitionComponent={showNotification.Transition}
              message="Profile picture changed..."
              key={showNotification.Transition}
            />
          </Box>
        </div>
      </Container>
    </>
  );
};

export default Profile;
