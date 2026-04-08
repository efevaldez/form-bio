"use client";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

export default function Providers({ children }: { children: React.ReactNode }) {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    transitions: {
      duration: {
        short: 200,
        standard: 300,
      },
    },

    palette: {
      //mode: "dark",
      primary: {
        main: "#F2C200",
      },
      secondary: {
        main: "#2F2F2F"
      },
      background: {
        default: "#F8F8F8",
        paper: "#FFFFFF",
      },
      text: {
        primary: "#1F1F1F",
        secondary: "#5F5F5F",
      },
    },
    typography: {
      fontFamily: `"Inter", sans-serif`,
      h1: {
        fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
        fontWeight: 600,
      },
      h2: {
        fontSize: "clamp(1.25rem, 4vw, 2rem)",
        fontWeight: 600,
      },
      h3: {
        fontSize: "clamp(1.1rem, 3vw, 1.75rem)",
        fontWeight: 600,
      },
      h4: {
        fontSize: "clamp(1rem, 3vw, 1.5rem)",
        fontWeight: 600,
      },
      body1: {
        fontSize: "clamp(0.875rem, 2vw, 1rem)",
      },
      body2: {
        fontSize: "clamp(0.8125rem, 1.5vw, 0.875rem)",
      },
      button: {
        textTransform: "none",
        fontSize: "clamp(0.875rem, 1vw, 1rem)",
      },
    },
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            "@media (max-width: 600px)": {
              paddingLeft: 0,
              paddingRight: 0,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: "8px 20px",
            boxShadow: "none",
            "@media (max-width: 600px)": {
              padding: "6px 16px",
              fontSize: "0.875rem",
            },
          },
          contained: {
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            ":hover": {
              boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            "@media (max-width: 600px)": {
              padding: "8px",
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          fullWidth: true,
          variant: "outlined",
        },
        styleOverrides: {
          root: {
            "@media (max-width: 600px)": {
              "& .MuiInputBase-input": {
                fontSize: "16px", // Prevents zoom on iOS
              },
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            backgroundColor: "#fff",
          },
          input: {
            padding: '14px 14px',
            "@media (max-width: 600px)": {
              padding: "12px 12px",
            },
          }
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            backgroundColor: "#fff",
          },
          notchedOutline: {
            borderColor: "#D0D0D0",
          }
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            "@media (max-width: 600px)": {
              fontSize: "0.875rem",
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            "@media (max-width: 600px)": {
              padding: "8px",
              fontSize: "0.75rem",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            "@media (max-width: 600px)": {
              margin: "0 8px",
            },
          },
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
