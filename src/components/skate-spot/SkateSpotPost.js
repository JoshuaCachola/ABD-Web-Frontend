import React, { useState } from "react";
import VideoPlayer from "react-video-js-player";
import { 
  Box, 
  Card, 
  Avatar, 
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button
} from "@material-ui/core";
import { connect } from "react-redux";

import { isShowPost } from "../../store/skateSpotPosts";

const SkateSpotPost = ({ showPost, isShowingPost, id, post, caption, skater }) => {
  console.log(id, post, caption);
  const handleShowPost = (e) => {
    // console.log(e.target.tagName);
    if (e.target.tagName === "DIV") {
      showPost(isShowingPost);
    }
  };

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
            <CardContent className="skate-spot__comment-content"></CardContent>
            {/* <CardActions> */}
            {/* <section className="skate-spot__comment-input"> */}
            <form>
              <Box
                display="flex"
                justifyContent="space-between"
                className="skate-spot__comment-input"
              >
                <Box>
                  <TextField
                    className="skate-spot__comment-input"
                    placeholder="  Add a comment..."
                    multiline
                  ></TextField>
                </Box>
                <Box>
                  <Button>Post</Button>
                </Box>
              </Box>
            </form>
            {/* </section> */}
            {/* </CardActions> */}
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

// export default SkateSpotPost;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  SkateSpotPost
);
