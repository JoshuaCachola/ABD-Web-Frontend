import React, { useState } from "react";
import VideoPlayer from "react-video-js-player";
import { Box } from "@material-ui/core";
import { connect } from "react-redux";

import { isShowPost } from "../../store/skateSpotPosts";

const SkateSpotPost = ({showPost, isShowingPost, id, post, caption}) => {
  console.log(id, post, caption);
  const handleShowPost = (e) => {
    // console.log(e.target.tagName);
    if (e.target.tagName === "DIV") {
      showPost(isShowingPost);
    }
  };

  return (
    <Box onClick={handleShowPost} className="skate-spot">
      <Box className="skate-spot__post" display="flex" justifyContent="center" alignItems="center">
        <Box>
          <VideoPlayer
            controls={true}
            src={post[0]}
            width="414"
            height="514"
            type="video/mp4"
          />
        </Box>
        <Box>
          <h1>{caption}</h1>
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
