import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';

import NewLocationInput from '@/components/recommendation/list/new-location/NewLocationInput';
import { useScopedI18n } from '@/locales/client';
import type { Location } from '@/types/recommendation';

interface NewLocationButtonProps {
  dateIndex: number;
}

const NewLocationButton = ({ dateIndex }: NewLocationButtonProps) => {
  const t = useScopedI18n('result.tooltip');
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
        <Tooltip
          disableFocusListener
          disableTouchListener
          title={t('new-location-button')}
          placement="top"
        >
          <AddCircleIcon
            fontSize="large"
            color={`${newLocations.length > 0 ? 'secondary' : 'primary'}`}
          />
        </Tooltip>
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
