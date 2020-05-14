import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getSpotPosts } from "../../store/skateSpotPosts";
import { Box } from "@material-ui/core";

import Navbar from "../utils/Navbar";

const SkateSpot = (props) => {
  const { skateSpot } = props.location.state;
  const id = props.match.url.split("/")[2];
  console.log(props.posts);
  useEffect(() => {
    if (!props.posts.length) {
      props.getSpotPosts(id);
    }
  }, [props, props.posts, props.posts.length]);

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <Box display="flex">
        <div className="skate-spot__img">
          <img src={skateSpot.imgs[0]} alt="skate-spot-pic" />
        </div>
        <div>
          <div className="skate-spot__name">{skateSpot.name}</div>
          <div className="skate-spot__city">{skateSpot.city}</div>
          <div className="skate-spot__state">{skateSpot.state}</div>
        </div>
      </Box>
      <Box>
        {/* Followers */}
      </Box>
      <Box>

      </Box>
    </>
  );
};

// export default SkateSpot;
const mapStateToProps = state => {
  return {
    posts: state.skateSpotPosts.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSpotPosts: id => dispatch(getSpotPosts(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  SkateSpot
);
