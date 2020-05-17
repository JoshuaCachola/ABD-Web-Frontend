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
} from "@material-ui/core";
import { connect } from "react-redux";

import { isShowPost } from "../../store/skateSpotPosts";
import api from "../../utils";

const useStyles = makeStyles({
  comment: {
    paddingLeft: 10,
    wordWrap: "break-word",
    overflowWrap: "anywhere"
  },
  commentsContainer: {
    paddingTop: 2
  },
  commentsBody: {
    marginTop: 2
  },
  commentInput: {
    maxWidth: "90%"
  }
});

const SkateSpotPost = (
  { showPost, isShowingPost, id, post, caption, skater, skateSpotId }) => {
  const [ comment, setComment ] = useState("");
  const [ postComments, setPostComments ] = useState([]);
  const handleShowPost = (e) => {
    if (e.target.tagName === "DIV") {
      showPost(isShowingPost);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${api.url}/skatespots/${skateSpotId}/posts/${id}/comments`,
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
    })();

  }, [setPostComments, id, skateSpotId]);

  const handleSetComment = e => setComment(e.target.value);
  const submitComment = async e => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${api.url}/skatespots/${skateSpotId}/posts/${id}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`
          },
          body: JSON.stringify({
            comment
          })
      });

      if (!res.ok) throw res;

      window.location.href = `/skatespots/${skateSpotId}`;
    } catch (err) {
      console.error(err);
    }
  };

  console.log(postComments);
  const classes = useStyles();
  return (
    <Box onClick={handleShowPost} className="skate-spot">
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
                className="skate-spot__post-img"
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
              title={skater.username}
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
                            {postComment.skaterCommenter.username}
                            &nbsp;
                            {postComment.comment}
                          </div>
                        </Box>
                      </Box>
                    </li>
                  ))}
              </ul>
            </CardContent>
            <form onSubmit={submitComment}>
              <Box
                display="flex"
                justifyContent="space-between"
                className="skate-spot__comment-input"
              >
                <Box>
                  <TextField
                    name={comment}
                    onChange={handleSetComment}
                    placeholder="  Add a comment..."
                    className={classes.commentInput}
                    multiline
                  ></TextField>
                </Box>
                <Box>
                  <Button type="submit">Post</Button>
                </Box>
              </Box>
            </form>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    isShowingPost: state.skateSpotPosts.isShowingPost
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showPost: toggle => dispatch(isShowPost(toggle))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  SkateSpotPost
);
