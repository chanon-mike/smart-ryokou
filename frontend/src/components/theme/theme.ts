import { createTheme } from '@mui/material/styles';

const themeColors = {
  primary: '#144DC7',
  secondary: '#F1D0D5',
  background: '#FFFFFF',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: themeColors.primary,
    },
    secondary: {
      main: themeColors.secondary,
    },
    background: {
      default: themeColors.background,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export default theme;
