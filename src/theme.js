import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  // fontFamily: "Rock Salt",
  // primaryColor: "#326C73",
  // secondaryColor: "#FFFFFF",
  typography: {
    fontFamily: "Raleway, sans-serif",
  },
  palette: {
    primary: {
      main: '#000000',
      contrastText: 'black',
    },
    secondary: {
      main: 'rgb(50, 108, 115, 0.25)',
      contrastText: '#000000',
    }
  }
});
