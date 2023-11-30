import NewLocationInput from '@/components/recommendation/list/new-location/NewLocationInput';
import type { Location } from '@/types/recommendation';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';

interface NewLocationButtonProps {
  dateIndex: number;
}

const NewLocationButton = ({ dateIndex }: NewLocationButtonProps) => {
  const [newLocations, setNewLocations] = useState<Location[]>([]);
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
        <AddCircleIcon
          fontSize="large"
          color={`${newLocations.length > 0 ? 'secondary' : 'primary'}`}
        />
      </IconButton>

      <NewLocationInput
        newLocations={newLocations}
        setNewLocations={setNewLocations}
        dateIndex={dateIndex}
        open={open}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default NewLocationButton;
