import { Box, FormControlLabel, Switch } from '@mui/material';
import { useContext } from 'react';

import { DisplayRoutesContext } from '@/components/recommendation/DisplayRoutesContext';

const RouteDirectionArrowToggleButton = () => {
  const { displayRoutes, setDisplayRoutes } = useContext(DisplayRoutesContext);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
      }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={displayRoutes}
            onChange={() => setDisplayRoutes(!displayRoutes)}
            color="primary"
          />
        }
        label="Directions"
      />
    </Box>
  );
};

export default RouteDirectionArrowToggleButton;
