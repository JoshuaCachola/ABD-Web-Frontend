import React from "react";
import {
  Container,
  makeStyles,
  Box,
  Avatar,
  Typography
} from "@material-ui/core";

import Navbar from "./utils/Navbar";

const useStyles = makeStyles({

});

const Profile = () => {
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
        </Box>
      </Container>
    </>
  );
};

export default Profile;
