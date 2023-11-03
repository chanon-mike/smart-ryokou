'use client';

import { Box, CardMedia, Paper, Typography } from '@mui/material';
import { useJsApiLoader, GoogleMap, MarkerF } from '@react-google-maps/api';
import { useContext, useEffect, useMemo } from 'react';
import { ActiveLocationContext } from '../ActiveLocationContext';
import { GOOGLE_MAPS_API_KEY } from '@/libs/envValues';
import { RecommendationContext } from '../RecommendationContext';
import type { Location } from '@/types/recommendation';
import { mapStyles } from '@/libs/mapStyles';

const Map = () => {
  const recommendationContext = useContext(RecommendationContext);
  const activeLocationContext = useContext(ActiveLocationContext);
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: GOOGLE_MAPS_API_KEY });
  const { recommendations } = recommendationContext;
  const { mapCenter, setMapCenter, activeLocation, setActiveLocation } = activeLocationContext;

  const allLocations = useMemo(
    () =>
      recommendations.flatMap((rec) =>
        rec.locations.map((location) => ({
          ...location,
        })),
      ),
    [recommendations],
  );

  const handleMarkerClick = (location: Location) => {
    setActiveLocation(location);
    setMapCenter({ lat: location.lat, lng: location.lng });
  };

  useEffect(() => {
    if (allLocations.length > 0) {
      // Find every lat and lng and get the average
      const averageLatLng = allLocations.reduce(
        (acc, loc) => ({ lat: acc.lat + loc.lat, lng: acc.lng + loc.lng }),
        { lat: 0, lng: 0 },
      );

      averageLatLng.lat /= allLocations.length;
      averageLatLng.lng /= allLocations.length;

      setMapCenter(averageLatLng);
    }
  }, [allLocations, setMapCenter]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={mapCenter}
          zoom={12}
          options={{
            styles: mapStyles,
            disableDefaultUI: true,
            keyboardShortcuts: false,
          }}
        >
          {allLocations.map((location, index) => (
            <MarkerF
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => handleMarkerClick(location)}
            />
          ))}
        </GoogleMap>
      )}
      {activeLocation && (
        <Paper
          elevation={1}
          style={{
            position: 'absolute',
            right: '8%',
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
