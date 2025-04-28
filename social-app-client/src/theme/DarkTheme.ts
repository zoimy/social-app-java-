import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#000000",
      secondary: "#757575",
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      color: "#1976d2", // цвет для заголовков
    },
    body1: {
      fontSize: "1rem",
      color: "#333333", // цвет для текста тела
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212",
      paper: "#1f1f1f",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      color: "#90caf9", // цвет для заголовков
    },
    body1: {
      fontSize: "1rem",
      color: "#cccccc", // цвет для текста тела
    },
  },
});


declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
