import { Box, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
import NewLocationInput from './NewLocationInput';

const NewLocationButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box display="flex" justifyContent="center" my={2}>
      {/* Add New Location Icon */}
      <IconButton onClick={handleOpen}>
        <AddCircleIcon fontSize="large" color="primary" />
      </IconButton>

      <NewLocationInput open={open} handleClose={handleClose} />
    </Box>
  );
};

export default NewLocationButton;
