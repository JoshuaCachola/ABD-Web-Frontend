import React from "react";
import { Link, useHistory } from "react-router-dom";
// import Homepage from "../homepage/Homepage";
import { TextField, Box } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import addSpotImg from "../../images/add-spot.svg";

const Navbar = () => {
  const history = useHistory();
  const addNewSpot = () => {
    history.push("/skatespots/create-spot");
    // return <Redirect to="/skatespots/create-spot" />;
  };

  const handleHome = e => history.push("/skatespots");
  return (
    <nav className="navbar">
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <Box className="navbar__logo" flexBasis="33%">
          <h1>already been done</h1>
        </Box>
        <Box flexBasis="33%">
          <TextField
            // flexBasis="30%"
            defaultValue="Search"
            variant="outlined"
            size="small"
            className="navbar__search"
          />
        </Box>
        <Box display="flex">
          <div onClick={handleHome} className="navbar__icons">
            <HomeIcon />
          </div>
          <div className="navbar__icons">
            <AccountCircleIcon />
          </div>
          <div className="navbar__icons">
            <GroupIcon />
          </div>
          <div onClick={addNewSpot} className="navbar__icons">
            <img src={addSpotImg} alt="add-spot" height="24" width="24" />
          </div>
        </Box>
      </Box>
    </nav>
  );
};

export default Navbar;
