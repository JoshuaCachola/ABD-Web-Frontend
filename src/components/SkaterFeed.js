import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  makeStyles,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  Container,
  CardActions,
  IconButton,
  CardContent,
  Typography,
  Box
} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';

import api from "../utils";
import { getFollowedSkatePosts } from "../store/skateSpotPosts";
import Navbar from "./utils/Navbar";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "50px auto"
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
    objectFit: "contain"
  },
  commentUsername: {
    paddingRight: "5px",
    fontWeight: "bold"
  }
});

const SkaterFeed = ({ history }) => {
  const dispatch = useDispatch();
  const skaterFeed = useSelector(
    ({ skateSpotPosts }) => skateSpotPosts.followedSkatePosts
  );
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    (async () => {
      try {
        let res = await fetch(`${api.url}/skatespots/following`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`,
          },
        });

        if (!res.ok) {
          throw res;
        }

        res = await res.json();

        if (!res.length) {
          history.push("/skatespots");
        } else {
          dispatch(getFollowedSkatePosts(res));
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  console.log(skaterFeed);
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <div>
        {skaterFeed &&
          skaterFeed.map((post, i) => {
            return (
              <Card key={i} className={classes.root}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="skate-post" className={classes.avatar}>
                      R
                  </Avatar>
                  }
                  title={post.skater.username}
                  subheader={post.caption}
                />
                <CardMedia
                  className={classes.media}
                  image={post.post[0]}
                  title="Paella dish"
                />
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon /> {/* Add custom skateboard icon */}
                  </IconButton>
                </CardActions>
                <CardContent>
                  {post.SkatePostComments.length > 0 &&
                    post.SkatePostComments.map((comment, i) => {
                      return (
                        <Box display="flex" key={i}>
                          <Typography variant="subtitle2" gutterBottom className={classes.commentUsername}>
                            {comment.skaterCommenter.username}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            {comment.comment}
                          </Typography>
                        </Box>
                      )
                    })}
                </CardContent>
              </Card>
            );
          })
        }
      </div>
    </>
  );
};

export default withRouter(SkaterFeed);
