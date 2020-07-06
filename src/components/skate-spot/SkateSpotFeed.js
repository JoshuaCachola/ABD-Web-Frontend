import React, { useState, useEffect } from "react";
import SkateSpotPost from "./SkateSpotPost";
import { connect } from "react-redux";
import { Box, makeStyles, Container } from "@material-ui/core";
import ReactPlayer from "react-player";

import { getSpotPosts, isShowPost } from "../../store/skateSpotPosts";
import {theme} from '../../theme';

const useStyles = makeStyles({
  skateSpotFeed: {
    [theme.breakpoints.down('xs')]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(393px 1fr)',
      gridGap: '30px 0px',
      margin: 'auto auto',
      justifyContent: 'center'
    },
    [theme.breakpoints.up('sm')]: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(293px, 3fr))',
      gridGap: '30px 0px',
      margin: 'auto auto',
      justifyContent: 'center'
    }
  }
});

const SkateSpotFeed = ({ isShowingPost, showPost, id, posts, getSpotPosts }) => {
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
    if (e.target.tagName === "IMG" || e.target.tagName === "VIDEO") {
      setPostIndex(e.currentTarget.id);
      showPost(isShowingPost);
    }
  };

  const classes = useStyles();
  return (
    <>
      <Container className={classes.skateSpotFeed}>
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
      </Container>
      <Box>
        {isShowingPost && (
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
