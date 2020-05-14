import React, { useState, useEffect, createRef } from "react";
import VideoThumbnail from "react-video-thumbnail";
import SkateSpotPost from "./SkateSpotPost";
import { connect } from "react-redux";
import { getSpotPosts } from "../../store/skateSpotPosts";
// import { Link, Switch } from "react-router-dom";
import { Box, Card } from "@material-ui/core";
import { apiBaseUrl } from "../../config";

const SkateSpotFeed = (props) => {
  // const id = props.match.url.split("/")[2];
  // const [ posts, setPosts ] = useState([]);
  // console.log(props);
  const video = createRef();
  useEffect(() => {
    if (!props.posts.length) {
      props.getSpotPosts(props.id);
    }
    // (async () => {
    //   try {
    //     const res = await fetch(`${apiBaseUrl}/skatespots/${props.id}/posts`, {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`,
    //       },
    //     });

    //     if (!res.ok) throw res;
    //     console.log(res);
    //     const posts  = await res.json();
    //     console.log(posts);
    //     setPosts(posts);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // })();
  }, [props, props.posts, props.posts.length, props.id]);
  console.log(props.posts);
  return (
    <>
    {/* // <Box className="skate-spot__feed" display="flex"> */}
      {props.posts && props.posts.map(({post}, i) => {
        return (
          <div key={i} id={post.id}>
            <VideoThumbnail ref={video} videoUrl={post[0]} height={300} width={300} />
          </div>
        );
      })}
    {/* // </Box> */}
    </>
  );
};

// export default SkateSpotFeed;
const mapStateToProps = (state) => {
  return {
    posts: state.skateSpotPosts.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSpotPosts: (id) => dispatch(getSpotPosts(id)),
  };
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(
  SkateSpotFeed
);