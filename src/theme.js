import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Raleway, sans-serif",
  },
  palette: {
    primary: {
      main: "#000000",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#F08080",
      contrastText: "#000000",
    },
  },
});
