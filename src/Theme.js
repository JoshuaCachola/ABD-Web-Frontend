import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";


const theme = createMuiTheme({
  fontFamily: "Rock Salt",
  primaryColor: "#326C73",
  secondaryColor: "#FFFFFF",
  typography: {
    fontFamily: "Raleway, sans-serif",
  },
});

const Theme = props => {
  return (
    <ThemeProvider theme={theme}>
     {props.children}
    </ThemeProvider>
  );
};

export default Theme;