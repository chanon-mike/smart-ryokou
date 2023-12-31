import { IconButton, styled } from '@mui/material';

export const SecondaryColorHoverIconButton = styled(IconButton)(({ theme }) => ({
  '&:hover': {
    color: theme.palette.secondary.main,
    backgroundColor: 'transparent',
  },
}));
