import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import {
  TextField,
  Box,
  makeStyles,
  InputAdornment,
  Paper,
  Typography,
  useMediaQuery,
  ButtonGroup,
  Popper,
  Grow,
  MenuList,
  MenuItem,
  ClickAwayListener,
  Tooltip,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import GroupIcon from "@material-ui/icons/Group";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import MessageIcon from "@material-ui/icons/Message";

// import addSpotImg from "../../images/add-spot.svg";
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
    justifyContent: "center",
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
    cursor: "pointer",
    minWidth: "230px",
  },
  navbarIcons: {
    paddingLeft: "16px",
    cursor: "pointer",
    "&:hover": {
      color: `${theme.palette.secondary.main}`,
    },
  },
  iconsContainer: {
    margin: "0 20px",
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
    width: "250px",
    zIndex: 10000,
    marginLeft: "-125px",
  },
  searchResults: {
    maxWidth: "80%",
    borderBottom: "1px solid #ececec",
    margin: "5px auto",
    cursor: "pointer",
  },
  lastSearchResult: {
    maxWidth: "80%",
    margin: "5px auto",
    cursor: "pointer",
  },
  name: {
    fontWeight: "bold",
    fontSize: "14px",
  },
  location: {
    fontSize: "12px",
    fontStyle: "italic",
  },
  innerNavbar: {
    maxWidth: "70%",
    margin: "0 auto",
  },
});

// options for drop menu
const options = ["Profile", "Logout"];

const Navbar = ({ history }) => {
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(-1);
  const menuRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(
    () => {
      dispatch(setSkateSpots());
    },
    // eslint-disable-next-line
    []
  );

  const skateSpots = useSelector(
    ({ skateSpotFeed }) => skateSpotFeed.skateSpots
  );

  const addNewSpot = () => {
    history.push("/skatespots/create-spot");
  };

  // const handleMessaging = () => history.push("/messaging");

  const handleHome = () => history.push("/skatespots");

  const handleLogout = () => {
    localStorage.clear();
    dispatch(removeToken());
    history.push("/");
  };

  const handleProfile = () => history.push("/profile");

  const handleRouteHome = () => {
    history.push("/skater-feed");
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleMenuClose = (e) => {
    if (menuRef.current && menuRef.current.contains(e.target)) {
      return;
    }

    setOpen(false);
  };

  const handleSearchClose = (e) => {
    if (searchRef.current && searchRef.current.contains(e.target)) {
      return;
    }

    setShowSearch(false);
  };

  const handleMenuItemClick = (index) => {
    setSelectedOption(index);
    if (index === 0) {
      handleProfile();
    } else if (index === 1) {
      handleLogout();
    }
    setOpen(false);
  };

  const classes = useStyles();
  const showSearchBar = useMediaQuery("(min-width:1080px");
  return (
    <nav className={classes.navbar}>
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        className={classes.innerNavbar}
      >
        <Box className={classes.navbarLogo} onClick={handleRouteHome}>
          <h1>already been done</h1>
        </Box>
        {showSearchBar && (
          <Box
            className={classes.search}
            ref={searchRef}
            aria-label="drop-search"
          >
            <TextField
              placeholder="Search by city"
              variant="outlined"
              size="small"
              className={classes.navbarSearch}
              onClick={() => setShowSearch(!showSearch)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              // ref={search}
            />
            <Popper
              open={showSearch}
              anchorEl={searchRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <ClickAwayListener onClickAway={handleSearchClose}>
                    <Paper className={classes.searchContainer}>
                      {skateSpots.map((spot, i) => {
                        return (
                          <Box
                            display="flex"
                            key={i}
                            justifyContent="space-between"
                            className={
                              i === skateSpots.length - 1
                                ? classes.lastSearchResult
                                : classes.searchResults
                            }
                            onClick={() =>
                              history.push(`/skatespots/${spot.id}`)
                            }
                          >
                            <Typography className={classes.name}>
                              {spot.name} &nbsp;
                            </Typography>
                            <Typography className={classes.location}>
                              {spot.city}, {spot.state}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Paper>
                  </ClickAwayListener>
                </Grow>
              )}
            </Popper>
          </Box>
        )}
        <Box display="flex" className={classes.iconsContainer}>
          <div onClick={handleHome} className={classes.navbarIcons}>
            <HomeIcon />
          </div>
          <div /*onClick={handleMessaging}*/ className={classes.navbarIcons}>
            <Tooltip title="Messaging coming soon..." aria-label="messaging">
              <MessageIcon />
            </Tooltip>
          </div>
          <div onClick={addNewSpot} className={classes.navbarIcons}>
            {/* <img src={addSpotImg} alt="add-spot" height="24" width="24" /> */}
            <AddLocationIcon />
          </div>
          {/* <div className={classes.navbarIcons}>
            <GroupIcon />
          </div> */}
          <div className={classes.navbarIcons}>
            <ButtonGroup ref={menuRef} aria-label="drop-menu">
              <div
                onClick={handleToggle}
                aria-controls={open ? "split-button-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
              >
                <AccountCircleIcon />
              </div>
            </ButtonGroup>
            <Popper
              open={open}
              anchorEl={menuRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleMenuClose}>
                      <MenuList id="split-button-menu">
                        {options.map((option, index) => (
                          <MenuItem
                            key={option}
                            selected={index === selectedOption}
                            onClick={() => handleMenuItemClick(index)}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Box>
      </Box>
    </nav>
  );
};

export default withRouter(Navbar);
