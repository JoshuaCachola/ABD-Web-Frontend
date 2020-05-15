import React, { useState, useEffect, createRef } from "react";
import VideoThumbnail from "react-video-thumbnail";
import SkateSpotPost from "./SkateSpotPost";
import { connect } from "react-redux";
import { getSpotPosts, isShowPost } from "../../store/skateSpotPosts";
import { Route } from "react-router-dom";
import { Box, Card } from "@material-ui/core";
import VideoPlayer from "react-video-js-player";
// import { apiBaseUrl } from "../../config";

const SkateSpotFeed = ({isShowingPost, showPost, id, posts, getSpotPosts}) => {
  // const id = props.match.url.split("/")[2];
  const [ postIndex, setPostIndex ] = useState(null);

  // console.log(props);
  const video = createRef();
  useEffect(() => {
    if (!posts.length) {
      getSpotPosts(id);
    }
  }, [posts.length, id]);
  
  const handleSkatePost = (e) => {
    // const postIndex = e.currentTarget.id;
    console.log(e.target.tagName);
    if (e.target.tagName === "IMG") {
      setPostIndex(e.currentTarget.id);
      // debugger
      showPost(isShowingPost);
    }
  };

  // console.log(posts);
  return (
    <>
      <Box className="skate-spot__feed" display="flex">
        {posts && posts.map(({post}, i) => {
          return (
            <Box key={post.id} id={i} onClick={handleSkatePost}>
              <VideoThumbnail ref={video} videoUrl={post[0]} height={293} width={293} />
            </Box>
          );
        })}
      </Box>
      <Box>
        {isShowingPost === true &&
          <SkateSpotPost 
            id={posts[postIndex].id}
            post={posts[postIndex].post}
            caption={posts[postIndex].caption}
          />
        }
      </Box>
    </>
  );
};

// export default SkateSpotFeed;
const mapStateToProps = (state) => {
  return {
    posts: state.skateSpotPosts.posts,
    isShowingPost: state.skateSpotPosts.isShowingPost
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSpotPosts: (id) => dispatch(getSpotPosts(id)),
    showPost: (toggle) => dispatch(isShowPost(toggle))
  };
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(
  SkateSpotFeed
);