import React, { useState } from "react";
import { useSelector } from "react-redux";
import SkateSpotPost from "./SkateSpotPost";
import {
  Box,
  makeStyles,
  Container,
  Grid,
  Typography,
  Modal,
} from "@material-ui/core";
import ReactPlayer from "react-player";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InsertCommentIcon from "@material-ui/icons/InsertComment";

import { theme } from "../../theme";

const useStyles = makeStyles({
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
    backgroundColor: "#FFFFFF",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
    maxWidth: "293px",
    minHeight: "293px",
    cursor: "pointer",
  },
  skateFeedImg: {
    // maxWidth: "100%",
    maxWidth: "293px",
    minHeight: "293px",
    // height: "293px",
    objectFit: "contain",
    display: "block",
  },
  root: {
    flexGrow: 1,
  },
  gridRow: {
    margin: "0 12.5px",
  },
  postOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    opacity: 0,
    transition: ".5s ease",
    "&:hover": {
      opacity: 1,
    },
  },
  postContainer: {
    maxWidth: "293px",
    position: "relative",
  },
  postOverlayTextContainer: {
    top: "50%",
    left: "50%",
    margin: "-25px 0 0 -75px",
    color: "white",
    position: "absolute",
    display: "flex",
  },
  postOverlayText: {
    fontSize: "18px",
    fontWeight: "bold",
  },
});

const SkateSpotFeed = ({ id }) => {
  const [postIndex, setPostIndex] = useState(-1);
  const posts = useSelector(({ skateSpotPosts }) => skateSpotPosts.posts);
  const isShowingPost = useSelector(
    ({ skateSpotPosts }) => skateSpotPosts.isShowingPost
  );
  const [openPopup, setOpenPopup] = useState(isShowingPost);

  const handleSkatePostPopup = (id) => {
    setPostIndex(id);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setPostIndex(-1);
  };

  const createFeed = (pos) => {
    const tempBuffer = [];
    for (let i = pos; i < pos + 3 && i < posts.length; i++) {
      const spotPost = posts[i];
      spotPost.post[0].endsWith("mp4")
        ? tempBuffer.push(
            <Grid item s={4} key={i}>
              <div
                className={classes.postContainer}
                onClick={() => handleSkatePostPopup(pos)}
              >
                <ReactPlayer
                  url={spotPost.post[0]}
                  light={false}
                  height="293px"
                  width="293px"
                />
                <div className={classes.postOverlay}>
                  <Container className={classes.postOverlayTextContainer}>
                    <Box display="flex" mr={3}>
                      <FavoriteIcon />
                      &nbsp;
                      <Typography className={classes.postOverlayText}>
                        0
                      </Typography>
                    </Box>
                    <Box display="flex">
                      <InsertCommentIcon />
                      &nbsp;
                      <Typography className={classes.postOverlayText}>
                        0
                      </Typography>
                    </Box>
                  </Container>
                </div>
              </div>
            </Grid>
          )
        : tempBuffer.push(
            <Grid item s={4} key={i}>
              <div
                className={classes.postContainer}
                onClick={() => handleSkatePostPopup(pos)}
              >
                <img
                  className={classes.skateFeedImg}
                  src={spotPost.post[0]}
                  alt="skate-pic"
                />
                <div className={classes.postOverlay}>
                  <Container className={classes.postOverlayTextContainer}>
                    <Box display="flex" mr={3}>
                      <FavoriteIcon />
                      &nbsp;
                      <Typography className={classes.postOverlayText}>
                        0
                      </Typography>
                    </Box>
                    <Box display="flex">
                      <InsertCommentIcon />
                      &nbsp;
                      <Typography className={classes.postOverlayText}>
                        0
                      </Typography>
                    </Box>
                  </Container>
                </div>
              </div>
            </Grid>
          );
    }
    return tempBuffer;
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {posts &&
        posts.map((_, i) => {
          if (i % 3 === 0) {
            return (
              <Container className={classes.gridRow}>
                <Grid container spacing={2} key={`start-${i}`}>
                  {createFeed(i)}
                </Grid>
              </Container>
            );
          } else {
            return <div key={`start-${i}`}> </div>;
          }
        })}
      {/* <Container className={classes.skateSpotFeed}>
        {posts &&
          posts.map(({ post }, i) => {
            return (
              <div
                key={i}
                id={i}
                onClick={handleSkatePost}
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
      </Container> */}
      {openPopup && (
        <Modal
          open={openPopup}
          onClose={handleClosePopup}
          aria-labelledby="skater-post-popup"
          aria-describedby="skater-post-popup"
        >
          <SkateSpotPost
            skateSpotId={id}
            id={posts[postIndex].id}
            skater={posts[postIndex].skater}
            post={posts[postIndex].post}
            caption={posts[postIndex].caption}
          />
        </Modal>
      )}
    </div>
  );
};

export default SkateSpotFeed;
