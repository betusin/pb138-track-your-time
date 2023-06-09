import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#f7f9d2",
      main: "#ccd921",
      dark: "#2f2e2e",
    },
    secondary: {
      main: "#2f2e2e",
      light: "#ccd921",
    },
  },
});

export const styleLargeIcon = {
  fontSize: 30,
};
