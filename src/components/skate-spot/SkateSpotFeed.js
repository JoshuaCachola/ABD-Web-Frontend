import React, { useState, useEffect, createRef } from "react";
import VideoThumbnail from "react-video-thumbnail";
import SkateSpotPost from "./SkateSpotPost";
import { connect } from "react-redux";
import { getSpotPosts, isShowPost } from "../../store/skateSpotPosts";
import { Route } from "react-router-dom";
import { Box, Card } from "@material-ui/core";
import ReactPlayer from "react-player";
// import { apiBaseUrl } from "../../config";

const SkateSpotFeed = ({ isShowingPost, showPost, id, posts, getSpotPosts }) => {
  // const id = props.match.url.split("/")[2];
  const [postIndex, setPostIndex] = useState(null);

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
    if (e.target.tagName === "IMG" || e.target.tagName === "VIDEO") {
      setPostIndex(e.currentTarget.id);
      // debugger
      showPost(isShowingPost);
    }
  };

  // const thumbHandler = (thumb) => <img src={thumb} alt="skate-pic" />;
  console.log(posts);
  return (
    <>
      <Box className="skate-spot__feed-container" display="flex" justifyContent="space-evenly" flexWrap="wrap">
        {posts && posts.map(({ post }, i) => {
          return (
            <Box className="skate-spot__feed-div" key={i} id={i} onClick={handleSkatePost}>
              {
                post[0].endsWith("mp4")
                  ?
                  // <div className="skate-spot__feed-div">
                  <ReactPlayer
                    url={post[0]}
                    light={false}
                    height="100%"
                    width="293px"
                  />
                  // </div>
                  :
                  // <div className="skate-spot__feed-div">
                  <img className="skate-spot__feed-image" src={post[0]} alt="skate-pic" />
                // </div>
              }
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
