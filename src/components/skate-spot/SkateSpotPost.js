import React, { useState, useEffect } from "react";
import VideoPlayer from "react-video-js-player";
import {
  Box,
  Card,
  Avatar,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
  makeStyles,
  Container,
  IconButton,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

import api from "../../utils";
import { handleTapPost, handleFollowSkateSpot } from "../../requests";
import { TOKEN_KEY } from "../../constants";

const useStyles = makeStyles({
  comment: {
    paddingLeft: 10,
    wordWrap: "break-word",
    overflowWrap: "anywhere",
  },
  commentsContainer: {
    paddingTop: 2,
  },
  commentsBody: {
    marginTop: 2,
    fontFamily: "Raleway",
  },
  skateSpotPostImg: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    objectFit: "contain",
  },
  boardTapPost: {
    width: "44.6%",
    position: "absolute",
    bottom: 40,
    right: 0,
    borderTop: "1px solid #c5c5c5",
  },
  username: {
    fontWeight: "bold",
  },
  postComments: {
    height: "80%",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

const SkateSpotPost = ({ id, post, caption, skater, skateSpotId }) => {
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState([]);
  const [boardTappedPost, setBoardTappedPost] = useState(false);
  const [following, setFollowing] = useState(false);

  const getComments = async () => {
    try {
      const res = await fetch(
        `${api.url}/api/v1/skatespots/${skateSpotId}/posts/${id}/comments`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
          },
        }
      );

      if (!res.ok) throw res;

      const comments = await res.json();
      setPostComments(comments);
    } catch (err) {
      console.error(err);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${api.url}/api/v1/skatespots/${skateSpotId}/posts/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
          },
          body: JSON.stringify({
            comment,
          }),
        }
      );

      if (!res.ok) throw res;
      // reset comment to empty string after post
      setComment("");

      // refetch comments to display new comment
      getComments();
    } catch (err) {
      console.error(err);
    }
  };

  const boardTapPost = (postId, type) => {
    const success = handleTapPost(postId, type);
    if (success) {
      type === "tap" ? setBoardTappedPost(true) : setBoardTappedPost(false);
    }
  };

  const toggleFollowSpot = async (id, type) => {
    const success = await handleFollowSkateSpot(id, type);
    if (success && type === "follow") {
      setFollowing(true);
    } else if (success && type === "unfollow") {
      setFollowing(false);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
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

        const { success } = await res.json();
        setFollowing(success);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${api.url}/api/v1/skateposts/${id}/boardtap`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
          },
        });

        if (!res.ok) {
          throw res;
        }

        const { tapped } = await res.json();
        setBoardTappedPost(tapped);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  // clean up function
  useEffect(() => {
    return () => {
      setComment("");
      setPostComments([]);
      setBoardTappedPost(false);
    };
  }, []);

  const classes = useStyles();

  return (
    <Container>
      <Box
        className="skate-spot__post"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          {post[0].endsWith("mp4") ? (
            <VideoPlayer
              controls={true}
              src={post[0]}
              width="414"
              height="514"
              type="video/mp4"
            />
          ) : (
            <div className="skate-spot__post-image-container">
              <img
                className={classes.skateSpotPostImg}
                src={post[0]}
                alt="skate-pic"
              />
            </div>
          )}
        </Box>
        <Box display="flex" flexDirection="column">
          <Card className="skate-spot__comment-container">
            <CardHeader
              avatar={
                <Avatar src={skater.accountPhoto} alt="profile-picture" />
              }
              title={
                <Box display="flex">
                  <div className={classes.username}>
                    {skater.username} &nbsp;•
                    {following ? (
                      <Button
                        style={{
                          fontFamily: "Rock salt",
                          fontSize: "9px",
                        }}
                        onClick={() => toggleFollowSpot(id, "unfollow")}
                      >
                        Unfollow
                      </Button>
                    ) : (
                      <Button
                        style={{
                          fontFamily: "Rock Salt",
                          fontSize: "9px",
                        }}
                        onClick={() => toggleFollowSpot(id, "follow")}
                      >
                        Follow
                      </Button>
                    )}
                  </div>
                </Box>
              }
              subheader={caption}
              className="skate-spot__comment-header"
            />
            <CardContent className="skate-spot__comment-content">
              <div className={classes.postComments}>
                <ul>
                  {postComments &&
                    postComments.map((postComment, i) => (
                      <li key={i}>
                        <Box className={classes.commentsContainer}>
                          <Box display="flex" className={classes.commentsBody}>
                            {postComment.skaterCommenter.accountPhoto ? (
                              <Avatar
                                src={postComment.skaterCommenter.accountPhoto}
                                alt="profile-picture"
                              />
                            ) : (
                              <Avatar>
                                {postComment.skaterCommenter.username[0]}
                              </Avatar>
                            )}
                            <div className={classes.comment}>
                              <span className={classes.username}>
                                {postComment.skaterCommenter.username}
                              </span>
                              &nbsp;
                              {postComment.comment}
                            </div>
                          </Box>
                        </Box>
                      </li>
                    ))}
                </ul>
              </div>
              <div className={classes.boardTapPost}>
                <CardActions disableSpacing>
                  {boardTappedPost ? (
                    <IconButton
                      aria-label="remove from favorites"
                      onClick={() => boardTapPost(id, "untap")}
                    >
                      <FavoriteIcon color="secondary" />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() => boardTapPost(id, "tap")}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  )}
                </CardActions>
              </div>
            </CardContent>
            <form onSubmit={submitComment}>
              <Box
                display="flex"
                justifyContent="space-between"
                className="skate-spot__comment-input"
              >
                <Box width="85%" ml={1} className={classes.comment}>
                  <TextField
                    fullWidth={true}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="  Add a comment..."
                  ></TextField>
                </Box>
                <Box>
                  <Button
                    type="submit"
                    style={{
                      fontFamily: "Rock Salt",
                      fontSize: "9px",
                    }}
                  >
                    Post
                  </Button>
                </Box>
              </Box>
            </form>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default SkateSpotPost;
