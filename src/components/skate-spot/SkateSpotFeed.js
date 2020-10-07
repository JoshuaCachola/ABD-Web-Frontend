import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SkateSpotPost from "./SkateSpotPost";
import {
  Box,
  makeStyles,
  Container,
  Typography,
  Modal,
  useMediaQuery,
} from "@material-ui/core";
import ReactPlayer from "react-player";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import { getSkaterPosts } from "../../requests";

const useStyles = makeStyles((theme) => ({
  skateFeedChild: {
    backgroundColor: "#FFFFFF",
    backgroundSize: "cover",
    height: "auto",
    width: "100%",
    maxWidth: "293px",
    minHeight: "293px",
    cursor: "pointer",
  },
  skateFeedImg: {
    width: "100%",
    height: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  postOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    width: "100%",
    height: "auto",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    opacity: 0,
    transition: ".5s ease",
    cursor: "pointer",
    "&:hover": {
      opacity: 1,
    },
  },
  postContainer: {
    width: "calc(33% - 4px)",
    position: "relative",
    display: "inline-block",
    marginBottom: "8px",
    marginRight: "8px",
    backgroundColor: "#000000",
    "&:nth-of-type(3n)": {
      marginRight: 0,
    },
  },
  postContainerMedia: {
    width: "calc(33% - 6px)",
    position: "relative",
    display: "inline-block",
    marginBottom: "8px",
    marginRight: "8px",
    backgroundColor: "#000000",
    "&:nth-of-type(3n)": {
      marginRight: "3px",
    },
  },
  postOverlayTextContainer: {
    top: "50%",
    left: "50%",
    margin: "-10px 0 0 -75px",
    color: "white",
    position: "absolute",
    display: "flex",
    [theme.breakpoints.down("md")]: {
      margin: "-10px 0 0 -70px",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "-10px 0 0 -65px",
    },
  },
  postOverlayText: {
    fontSize: "18px",
    fontWeight: "bold",
    [theme.breakpoints.down("md")]: {
      fontSize: "16px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
  overlayIcons: {
    fontSize: "10px",
  },
}));

const SkateSpotFeed = ({ type }) => {
  const [postIndex, setPostIndex] = useState(-1);
  const [likesAndCommentsCount, setLikesandCommentsCount] = useState({});
  const [posts, setPosts] = useState([]);
  const spotPosts = useSelector(({ skateSpotPosts }) => skateSpotPosts.posts);
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

  useEffect(() => {
    if (spotPosts) {
      if (type === "PROFILE") {
        (async () => {
          const sPosts = await getSkaterPosts();
          console.log(sPosts);
          setPosts(sPosts);
        })();
      } else if (type === "SPOT") {
        setPosts(spotPosts);
      }
    }
  }, [type, spotPosts]);

  // Creates state for like and comment count for each post in feed
  useEffect(() => {
    if (posts) {
      const counts = {};
      posts.forEach((post) => {
        const count = {};
        count.likesCount = post.LikedPosts[0]
          ? post.LikedPosts[0].likeCount
          : 0;
        count.commentsCount = post.SkatePostComments[0]
          ? post.SkatePostComments[0].commentCount
          : 0;
        counts[post.id] = count;
      });
      setLikesandCommentsCount(counts);
    }
  }, [posts]);

  /**
   * Renders either a ReactPlayer component or img depending on the ending of the post  # noqa
   * @param {String} post
   * @param {Number} id
   */
  const createFeed = (post, id) => {
    return (
      <div
        className={
          postMediaQuery ? classes.postContainerMedia : classes.postContainer
        }
        onClick={() => handleSkatePostPopup(id)}
        key={id}
      >
        {post.post[0].endsWith("mp4") ? (
          <ReactPlayer url={post.post[0]} height="100%" width="100%" />
        ) : (
          <img
            className={classes.skateFeedImg}
            src={post.post[0]}
            alt="skate-pic"
          />
        )}
        <div className={classes.postOverlay}>
          <Container className={classes.postOverlayTextContainer}>
            <Box display="flex" mr={3}>
              <FavoriteIcon />
              &nbsp;
              <Typography className={classes.postOverlayText}>
                {likesAndCommentsCount[post.id]
                  ? likesAndCommentsCount[post.id].likesCount
                  : 0}
              </Typography>
            </Box>
            <Box display="flex">
              <InsertCommentIcon />
              &nbsp;
              <Typography className={classes.postOverlayText}>
                {likesAndCommentsCount[post.id]
                  ? likesAndCommentsCount[post.id].commentsCount
                  : 0}
              </Typography>
            </Box>
          </Container>
        </div>
      </div>
    );
  };

  const postMediaQuery = useMediaQuery("(min-width:50em)");
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {posts &&
        posts.map((post, i) => {
          return createFeed(post, i);
        })}
      {openPopup && (
        <Modal
          open={openPopup}
          onClose={handleClosePopup}
          aria-labelledby="skater-post-popup"
          aria-describedby="skater-post-popup"
        >
          <SkateSpotPost
            skateSpotId={posts[postIndex].skateSpotId}
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
