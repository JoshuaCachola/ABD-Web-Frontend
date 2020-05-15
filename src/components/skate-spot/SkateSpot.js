import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { getSpotPosts } from "../../store/skateSpotPosts";
import { Box, makeStyles, Avatar } from "@material-ui/core";
import { AddAPhoto } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import Navbar from "../utils/Navbar";
import SkateSpotFeed from "./SkateSpotFeed";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const SkateSpot = (props) => {
  // const [skateSpot, setSkateSpot] = useState({});
  const { skateSpot } = props.location.state;
  const id = props.match.url.split("/")[2];
  const history = useHistory();
  // console.log(skateSpot);
  // useEffect(() => {
  //   if (!props.posts) {
  //     props.getSpotPosts(id);
  //   }
  //   console.log(props.posts);
  //   // setSkateSpot(props.location.state);
  // }, [props, props.posts, id, props.posts.length]);

  const handleAddPost = (e) => {
    history.push(`/skatespots/${id}/post`)
  };

  const classes = useStyles();

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <Box display="flex" className="skate-spots" justifyContent="space-around">
        <Avatar
          src={skateSpot.imgs[0]}
          alt="skate-spot-pic"
          className={classes.large}
        />
        <Box flexBasis="35%">
          <div className="skate-spots__name">{skateSpot.name}</div>
          <div className="skate-spots__city">{skateSpot.city}</div>
          <div className="skate-spots__state">{skateSpot.state}</div>
        </Box>
      </Box>
      {/* <Box display="flex"> */}
      <SkateSpotFeed id={id} />
      {/* </Box> */}
      <Box display="flex" justifyContent="flex-end" className="skate-spot__add-a-photo">
        <AddAPhoto onClick={() => handleAddPost()} />
      </Box>
    </>
  );
};

export default SkateSpot;
// const mapStateToProps = state => {
//   return {
//     posts: state.skateSpotPosts.posts
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     getSpotPosts: id => dispatch(getSpotPosts(id))
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(
//   SkateSpot
// );
