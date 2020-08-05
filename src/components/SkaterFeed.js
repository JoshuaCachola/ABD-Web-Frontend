import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { makeStyles, Card } from "@material-ui/core";

import api from "../utils";
import { getFollowedSkatePosts } from "../store/skateSpotPosts";

const useStyles = makeStyles({});

const SkaterFeed = ({ history }) => {
  const dispatch = useDispatch();
  const skaterFeed = useSelector(
    ({ skateSpotPosts }) => skateSpotPosts.followedSkatePosts
  );
  // const [skaterPosts, setSkaterPosts] = useState([]);

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

  const classes = useStyles();
  return <h1>skater feed</h1>;
};

export default withRouter(SkaterFeed);
