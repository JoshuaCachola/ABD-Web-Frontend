import React from "react";
import { withRouter } from "react-router-dom";
import {
  TextField,
  Box,
  makeStyles,
  InputAdornment,
  Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GroupIcon from "@material-ui/icons/Group";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import MessageIcon from "@material-ui/icons/Message";

import addSpotImg from "../../images/add-spot.svg";
import { theme } from "../../theme";
import { removeToken } from "../../store/authentication";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "white",
    borderBottom: "1px solid #ececec",
  },
  search: {
    margin: "5px 0",
  },
  navbarLogo: {
    color: "white",
    fontFamily: "Rock Salt, cursive",
    fontSize: "20px",
    border: "1px solid black",
    backgroundColor: "black",
    textAlign: "center",
    padding: "0 5px",
    margin: "0 5px",
  },
  navbarIcons: {
    paddingLeft: "16px",
    cursor: "pointer",
    "&:hover": {
      color: `${theme.palette.secondary.main}`,
    },
  },
  navbarSearch: {
    fontFamily: "Raleway",
    fontSize: "12px",
    backgroundColor: "#f6f6f6",
  },
  logoutButton: {
    color: `${theme.palette.primary.main}`,
    "&:hover": {
      color: `${theme.palette.secondary.main}`,
      fontWeight: "bold",
    },
  },
});

const Navbar = ({ history }) => {
  const dispatch = useDispatch();
  const addNewSpot = () => {
    history.push("/skatespots/create-spot");
  };

  const handleHome = () => history.push("/skatespots");
  const handleLogout = () => {
    localStorage.clear();
    dispatch(removeToken());
    history.push("/");
  };

  const classes = useStyles();
  return (
    <nav className={classes.navbar}>
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <Box className={classes.navbarLogo}>
          <h1>already been done</h1>
        </Box>
        <Box flexBasis="33%" className={classes.search}>
          <TextField
            placeholder="Search by city"
            variant="outlined"
            size="small"
            className={classes.navbarSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box display="flex">
          <div onClick={handleHome} className={classes.navbarIcons}>
            <HomeIcon />
          </div>
          <div className={classes.navbarIcons}>
            <AccountCircleIcon />
          </div>
          <div className={classes.navbarIcons}>
            <GroupIcon />
          </div>
          <div className={classes.navbarIcons}>
            <MessageIcon />
          </div>
          <div onClick={addNewSpot} className={classes.navbarIcons}>
            <img src={addSpotImg} alt="add-spot" height="24" width="24" />
          </div>
          <div className={classes.navbarIcons}>
            <Button
              color="primary"
              size="small"
              className={classes.logoutButton}
              onClick={handleLogout}
            >
              Log out
            </Button>
          </div>
        </Box>
      </Box>
    </nav>
  );
};

export default withRouter(Navbar);
