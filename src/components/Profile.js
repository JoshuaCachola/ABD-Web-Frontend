import React, { useState, useEffect } from "react";
import {
  Container,
  makeStyles,
  Box,
  Avatar,
  Typography
} from "@material-ui/core";
import ReactPlayer from "react-player";
import Navbar from "./utils/Navbar";
import api from "../utils";

const useStyles = makeStyles({
  menuBar: {
    borderTop: "1px solid #c8c8c8",
    margin: "auto auto",
    justifyContent: "center",
    display: "flex",
    maxWidth: "80%",
  },
});

const Profile = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let res = await fetch(`${api.url}/skateposts`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("TOKEN_KEY")}`
          }
        });

        if (!res.ok) {
          throw res;
        }

        res = await res.json();
        setPosts(res);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Container>
        <Box>
          <div>
            <Box>
              <Avatar>
                J
            </Avatar>
            </Box>
          </div>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box>
            <Typography>Username</Typography>
          </Box>
          <Box>
            <Typography>0 posts 0 skate crews 0 spots followed</Typography>
          </Box>
          <Box>
            <Typography>First Last</Typography>
          </Box>
        </Box>
      </Container>
      <br />
      <div className={classes.menuBar}>
        <Box>
          <Container className={classes.skateSpotFeed}>
            {posts &&
              posts.map(({ post }, i) => {
                return (
                  <div
                    key={i}
                    id={i}
                    // onClick={handleSkatePost}
                    className={classes.skateFeedChild}
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
                          className={classes.skateFeedImg}
                          src={post[0]}
                          alt="skate-pic"
                        />
                      )}
                  </div>
                );
              })}
          </Container>
          {/* <Box>
            {isShowingPost && (
              <SkateSpotPost
                skateSpotId={id}
                id={posts[postIndex].id}
                skater={posts[postIndex].skater}
                post={posts[postIndex].post}
                caption={posts[postIndex].caption}
              />
            )}
          </Box> */}
        </Box>
      </div>
    </>
  );
};

export default Profile;
