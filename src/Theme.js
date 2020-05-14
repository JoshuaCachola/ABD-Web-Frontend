import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  fontFamily: "Verdana",
  primaryColor: "red",
  secondaryColor: "green",
  typography: {
    fontFamily: "Verdana"
  }
});

const Theme = props => {
  return (
    <ThemeProvider theme={theme}>
      {props.childern}
    </ThemeProvider>
  );
};

export default Theme;