import React, { useState, useEffect } from "react";
import VideoPlayer from "react-video-js-player";
import {
  Box,
  Card,
  Avatar,
  CardHeader,
  CardContent,
  TextField,
  Button,
  makeStyles,
  Container,
  IconButton,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

import api from "../../utils";

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
    height: "100%",
    top: 0,
  },
  username: {
    fontWeight: "bold",
  },
});

const SkateSpotPost = ({ id, post, caption, skater, skateSpotId }) => {
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState([]);
  // const [boardTap, setBoardTap] = useState(false);

  useEffect(() => {
    getComments();
  }, []);

  // clean up function
  useEffect(() => {
    return () => {
      setComment("");
      setPostComments([]);
    };
  }, []);

  const getComments = async () => {
    try {
      const res = await fetch(
        `${api.url}/api/v1/skatespots/${skateSpotId}/posts/${id}/comments`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`,
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
            Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`,
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
              avatar={<Avatar></Avatar>}
              title={
                <Box display="flex">
                  <div className={classes.username}>
                    {skater.username} &nbsp;•
                    <Button
                      style={{
                        fontFamily: "Rock Salt",
                        fontSize: "9px",
                      }}
                    >
                      Follow
                    </Button>
                  </div>
                </Box>
              }
              subheader={caption}
              className="skate-spot__comment-header"
            />
            <CardContent className="skate-spot__comment-content">
              <ul>
                {postComments &&
                  postComments.map((postComment, i) => (
                    <li key={i}>
                      <Box className={classes.commentsContainer}>
                        <Box display="flex" className={classes.commentsBody}>
                          <Avatar>
                            {postComment.skaterCommenter.username[0]}
                          </Avatar>
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
              {/* {postBoardTappedState[post.id] ? ( */}
              <div className={classes.boardTapPost}>
                <IconButton
                  aria-label="add to favorites"
                  // onClick={() => handleTapPost(post.id, "untap")}
                >
                  <FavoriteIcon color="secondary" />
                </IconButton>
                {/* ) : (
                <IconButton
                  aria-label="remove from favorites"
                  // onClick={() => handleTapPost(post.id, "tap")}
                >
                  <FavoriteIcon />
                </IconButton>
              )} */}
              </div>
            </CardContent>
            <form onSubmit={submitComment}>
              <Box
                display="flex"
                justifyContent="space-between"
                className="skate-spot__comment-input"
              >
                <Box width="85%" ml={1}>
                  <TextField
                    fullWidth={true}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="  Add a comment..."
                    multiline
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
