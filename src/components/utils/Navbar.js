import React from "react";
import { Link } from "react-router-dom";
import Homepage from "../homepage/Homepage";

const Navbar = () => {
  return (
    <Link to="/">
      <Homepage />
    </Link>
  );
};

export default Navbar;
