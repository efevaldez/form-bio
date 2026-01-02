"use client";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

export default function Providers({ children }: { children: React.ReactNode }) {
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.2rem",
        "@media (min-width:600px)": {
          fontSize: "1.5rem",
        },
      },
    },
    components: {
      MuiTextField: {
        defaultProps: {
          fullWidth: true,
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
