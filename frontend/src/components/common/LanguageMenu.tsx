'use client';

import LanguageIcon from '@mui/icons-material/Language';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

const LanguageMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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
        <MenuItem onClick={handleClose}>
          {/* TODO: changing language while not reloading site not trigger change in loading google map autocomplete script */}
          <Link href="/?lang=ja" as="/ja">
            <Typography variant="body1" component="div" color="primary">
              日本語
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/?lang=en" as="/en">
            <Typography variant="body1" component="div" color="primary">
              English
            </Typography>
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageMenu;
