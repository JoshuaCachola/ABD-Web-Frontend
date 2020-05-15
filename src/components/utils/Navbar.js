import React from "react";
import { Link } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import { TextField, Box, SvgIcon } from "@material-ui/core";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
const Navbar = () => {
  return (
    <nav className="navbar">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box className="navbar__logo" flexBasis="30%">
          <h1>already been done</h1>
        </Box>
        <Box flexBasis="30%" justifyContent="center">
          <TextField
            // flexBasis="30%"
            label="Search"
            defaultValue="San Francisco"
            variant="outlined"
            size="small"
            className="navbar__search"
          />
        </Box>
        <Box flexBasis="12%" >
          <HomeIcon />
        </Box>
      </Box>
    </nav>
  );
};

export default Navbar;
