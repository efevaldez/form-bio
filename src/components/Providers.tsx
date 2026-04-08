'use client';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

export default function Providers({ children }: { children: React.ReactNode }) {
  const theme = createTheme({
    transitions: {
      duration: {
        short: 200,
        standard: 300,
      },
    },

    palette: {
      //mode: "dark",
      primary: {
        main: '#F2C200',
      },
      secondary: {
        main: '#2F2F2F',
      },
      background: {
        default: '#F8F8F8',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#1F1F1F',
        secondary: '#5F5F5F',
      },
    },
    typography: {
      fontFamily: `"Inter", sans-serif`,
      h1: {
        fontSize: '1.2rem',
        '@media (min-width:600px)': {
          fontSize: '1.5rem',
        },
      },
      button: {
        textTransform: 'none',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: '8px 20px',
            boxShadow: 'none',
          },
          contained: {
            boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
            ':hover': {
              boxShadow: '0 6px 14px rgba(0,0,0,0.12)',
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          fullWidth: true,
          variant: 'outlined',
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            backgroundColor: '#fff',
          },
          input: {
            padding: '14px 14px',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            backgroundColor: '#fff',
          },
          notchedOutline: {
            borderColor: '#D0D0D0',
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
