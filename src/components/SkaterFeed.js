import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  makeStyles,
  Card,
  CardHeader,
  Avatar,
  Container,
  CardActions,
  IconButton,
  Typography,
  Box,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VideoPlayer from "react-video-js-player";

import api from "../utils";
import { getFollowedSkatePosts } from "../store/skateSpotPosts";
import Navbar from "./utils/Navbar";
import { theme } from "../theme";

const useStyles = makeStyles((theme) => ({
  post: {
    maxWidth: "500px",
    margin: "50px auto",
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "0 auto",
    },
  },
  media: {
    height: "auto",
    width: "100%",
    objectFit: "contain",
  },
  commentUsername: {
    paddingRight: "5px",
    fontWeight: "bold",
  },
}));

const SkaterFeed = ({ history }) => {
  const dispatch = useDispatch();
  const skaterFeed = useSelector(
    ({ skateSpotPosts }) => skateSpotPosts.followedSkatePosts
  );
  const [boardTappedPosts, setBoardTappedPosts] = useState([]);
  const [postBoardTappedState, setPostBoardTappedState] = useState({});
  // const [expanded, setExpanded] = useState({});

  // get all liked posts for user
  useEffect(() => {
    (async () => {
      try {
        let res = await fetch(`${api.url}/skateposts/boardtaps`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`,
          },
        });

        if (!res.ok) {
          throw res;
        }

        res = await res.json();
        setBoardTappedPosts(res);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (skaterFeed) {
      const postState = {};
      skaterFeed.forEach((post) => {
        const foundBoardTapped = boardTappedPosts.find(
          (tappedPost) => tappedPost.postId === post.id
        );
        if (foundBoardTapped) {
          postState[post.id] = true;
        } else {
          postState[post.id] = false;
        }
      });
      setPostBoardTappedState(postState);
    }
  }, [skaterFeed]);

  useEffect(() => {
    (async () => {
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
        if (!res.length) {
          history.push("/skatespots");
        } else {
          dispatch(getFollowedSkatePosts(res));
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleTapPost = async (postId, type) => {
    try {
      let res;
      if (type === "tap") {
        res = await fetch(`${api.url}/skateposts/${postId}/boardtap`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`,
          },
        });
      } else {
        res = await fetch(`${api.url}/skateposts/${postId}/boardtap`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`,
          },
        });
      }

      if (!res.ok) {
        throw res;
      }

      // change state of post to board tapped (liked)
      const newTappedState = { ...postBoardTappedState };
      newTappedState[postId] = !newTappedState[postId];
      setPostBoardTappedState(newTappedState);
    } catch (err) {
      console.error(err);
    }
  };

  const classes = useStyles();

  // if (!skaterFeed) {
  //   return <h1>Follow a skate spot to get its feed!</h1>;
  // }
  return (
    <>
      <Navbar />
      <div>
        {skaterFeed &&
          skaterFeed.map((post, i) => {
            return (
              <Card key={i} className={classes.post}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="skate-post" className={classes.avatar}>
                      R
                    </Avatar>
                  }
                  title={post.skater.username}
                  subheader={post.caption}
                />
                {post.post[0].endsWith(".mp4") ? (
                  <VideoPlayer
                    controls={true}
                    src={post.post[0]}
                    width={500}
                    height={281.25}
                    type="video/mp4"
                  />
                ) : (
                  <img
                    className={classes.media}
                    src={post.post[0]}
                    alt="skate-img"
                  />
                )}
                <CardActions disableSpacing>
                  {postBoardTappedState[post.id] ? (
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() => handleTapPost(post.id, "untap")}
                    >
                      <FavoriteIcon color="secondary" />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="remove from favorites"
                      onClick={() => handleTapPost(post.id, "tap")}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  )}
                  {/* Add custom skateboard icon */}
                </CardActions>
                <Container>
                  {post.SkatePostComments.length > 0 &&
                    post.SkatePostComments.map((comment, i) => {
                      return (
                        <Box display="flex" key={i}>
                          <Typography
                            variant="subtitle2"
                            gutterBottom
                            className={classes.commentUsername}
                          >
                            {comment.skaterCommenter.username}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            {comment.comment}
                          </Typography>
                        </Box>
                      );
                    })}
                </Container>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default withRouter(SkaterFeed);
