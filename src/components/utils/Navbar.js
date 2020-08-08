import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  TextField,
  Box,
  makeStyles,
  InputAdornment,
  Button,
  Paper,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GroupIcon from "@material-ui/icons/Group";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import MessageIcon from "@material-ui/icons/Message";

import addSpotImg from "../../images/add-spot.svg";
import { theme } from "../../theme";
import { removeToken } from "../../store/authentication";
import { setSkateSpots } from "../../store/skateSpots";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "white",
    borderBottom: "1px solid #ececec",
  },
  search: {
    margin: "5px auto",
    justifyContent: "center"
  },
  navbarLogo: {
    color: "white",
    fontFamily: "Rock Salt, cursive",
    fontSize: "20px",
    border: "1px solid black",
    backgroundColor: "black",
    textAlign: "center",
    padding: "0 5px",
    margin: "0 20px",
    cursor: "pointer"
  },
  navbarIcons: {
    paddingLeft: "16px",
    cursor: "pointer",
    "&:hover": {
      color: `${theme.palette.secondary.main}`,
    },
  },
  iconsContainer: {
    margin: '0 20px'
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
  searchContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    zIndex: 99
  },
  searchResults: {
    maxWidth: "80%",
    borderBottom: "1px solid #ececec",
    margin: "5px auto",
    cursor: "pointer"
  },
  lastSearchResult: {
    maxWidth: "80%",
    margin: "5px auto",
    cursor: "pointer"
  },
  name: {
    fontWeight: "bold",
    fontSize: "14px"
  },
  location: {
    fontSize: "12px",
    fontStyle: "italic"
  }
});

const Navbar = ({ history }) => {
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    dispatch(setSkateSpots());
  }, []);

  const skateSpots = useSelector(({ skateSpotFeed }) => skateSpotFeed.skateSpots);
  const addNewSpot = () => {
    history.push("/skatespots/create-spot");
  };
  const handleMessaging = () => {
    history.push("/messaging");
  };
  const handleHome = () => history.push("/skatespots");
  const handleLogout = () => {
    localStorage.clear();
    dispatch(removeToken());
    history.push("/");
  };

  const handleRouteHome = () => {
    history.push("/skater-feed");
  };

  const handleShowSearch = (e) => {
    if (e.target.tagName === "INPUT") {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };

  const classes = useStyles();
  return (
    <nav className={classes.navbar} onClick={e => handleShowSearch(e)}>
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <Box className={classes.navbarLogo} onClick={handleRouteHome}>
          <h1>already been done</h1>
        </Box>
        <Box className={classes.search}>
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
          // ref={search}
          />
          {showSearch &&
            <Paper className={classes.searchContainer}>
              {skateSpots.map((spot, i) => {
                return (
                  <Box
                    display="flex"
                    key={i}
                    justifyContent="space-between"
                    className={i === skateSpots.length - 1 ? classes.lastSearchResult : classes.searchResults}
                    onClick={() => history.push(`/skatespots/${spot.id}`)}
                  >
                    <Typography className={classes.name}>{spot.name} &nbsp;</Typography>
                    <Typography className={classes.location}>{spot.city}, {spot.state}</Typography>
                  </Box>
                )
              })
              }
            </Paper>
          }
        </Box>
        <Box display="flex" className={classes.iconsContainer}>
          <div onClick={handleHome} className={classes.navbarIcons}>
            <HomeIcon />
          </div>
          <div className={classes.navbarIcons}>
            <AccountCircleIcon />
          </div>
          <div className={classes.navbarIcons}>
            <GroupIcon />
          </div>
          <div onClick={handleMessaging} className={classes.navbarIcons}>
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
