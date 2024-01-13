'use client';

import LanguageIcon from '@mui/icons-material/Language';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';

import { useChangeLocale } from '@/locales/client';

const LanguageMenu = () => {
  const changeLocale = useChangeLocale({ preserveSearchParams: true });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageChange = (locale: 'en' | 'ja') => {
    changeLocale(locale);
    handleClose();
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="primary"
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleLanguageChange('ja')}>
          {/* TODO: changing language while not reloading site not trigger change in loading google map autocomplete script */}
          <Typography variant="body1" component="div" color="primary">
            日本語
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange('en')}>
          <Typography variant="body1" component="div" color="primary">
            English
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageMenu;
