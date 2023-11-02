'use client';

import { Box, CardMedia, Paper, Typography } from '@mui/material';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useContext } from 'react';
import { ActiveLocationContext } from '../ActiveLocationContext';
import { GOOGLE_MAPS_API_KEY } from '@/libs/envValues';

const Map = () => {
  const activeLocationContext = useContext(ActiveLocationContext);
  const { mapCenter, activeLocation } = activeLocationContext;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={mapCenter}
          zoom={12}
        >
          <Marker
            position={mapCenter}
            onClick={() => {
              // TODO: Handle marker click here
            }}
          />
        </GoogleMap>
      )}
      {activeLocation && (
        <Paper
          elevation={1}
          style={{
            position: 'absolute',
            right: '10%',
            bottom: '5%',
            width: '80%',
            padding: '16px',
            overflow: 'auto',
          }}
        >
          {/* TODO: Add reviews and images from google map, link to direction */}
          <Box style={{ display: 'flex' }}>
            <CardMedia
              component="img"
              height="100px"
              width="100px"
              image={activeLocation.imageUrl}
              alt="Image"
              style={{ flex: '0 0 30%' }}
            />
            <Box style={{ flex: '0 0 70%', paddingLeft: '16px' }}>
              <Typography variant="h6">{activeLocation.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {activeLocation.description}
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}
    </div>
  );
};

export default Map;
