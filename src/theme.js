import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32",  // Green
    },
    secondary: {
      main: "#1565c0", // Blue
    },
    background: {
      default: "#f4f7f4",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default theme;
