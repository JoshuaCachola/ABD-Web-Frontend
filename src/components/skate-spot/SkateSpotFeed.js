import React, { useState, useEffect } from "react";
import SkateSpotPost from "./SkateSpotPost";
import { connect } from "react-redux";
import { getSpotPosts, isShowPost } from "../../store/skateSpotPosts";
import { Box } from "@material-ui/core";
import ReactPlayer from "react-player";
// import { apiBaseUrl } from "../../config";

const SkateSpotFeed = ({ isShowingPost, showPost, id, posts, getSpotPosts }) => {
  // const id = props.match.url.split("/")[2];
  const [postIndex, setPostIndex] = useState(null);
  const [currentPosts, setCurrentPosts] = useState(null);
  useEffect(() => {
    (async () => {
      if (!currentPosts) {
        setCurrentPosts(await getSpotPosts(id));
      }
    })();
  }, [currentPosts, id, getSpotPosts]);

  const handleSkatePost = (e) => {
    // const postIndex = e.currentTarget.id;
    console.log(e.target.tagName);
    if (e.target.tagName === "IMG" || e.target.tagName === "VIDEO") {
      setPostIndex(e.currentTarget.id);
      // debugger
      showPost(isShowingPost);
    }
  };

  console.log(posts);
  return (
    <>
      <div className="skate-spot__feed-container">
        {posts &&
          posts.map(({ post }, i) => {
            return (
              <div
                key={i}
                id={i}
                onClick={handleSkatePost}
                className="skate-spot__feed-child"
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
                    className="skate-spot__feed-image"
                    src={post[0]}
                    alt="skate-pic"
                  />
                )}
              </div>
            );
          })}
      </div>
      <Box>
        {isShowingPost === true && (
          <SkateSpotPost
            skateSpotId={id}
            id={posts[postIndex].id}
            skater={posts[postIndex].skater}
            post={posts[postIndex].post}
            caption={posts[postIndex].caption}
          />
        )}
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
