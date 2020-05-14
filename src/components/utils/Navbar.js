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
        <div className="navbar__logo">
          <h1>already been done</h1>
        </div>
        <TextField
          label="Search"
          defaultValue="San Francisco"
          variant="outlined"
          size="small"
        />
        <HomeIcon />
      </Box>
    </nav>
  );
};

export default Navbar;
