import { createTheme } from '@mui/material/styles';

const themeColors = {
  primary: '#4D70D9',
  secondary: '#D94D70',
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
    fontFamily: ['"Sawarabi Gothic"'].join(','),
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
