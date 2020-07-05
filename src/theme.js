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
      main: '#F08080',
      contrastText: '#000000',
    },
    border: {
      gradient: 'background-image: linear-gradient(to up, rgba(255,0,0,0), #F08080'
    }
  }
});
