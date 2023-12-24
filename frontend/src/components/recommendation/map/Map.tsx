'use client';

import LocationDetail from '@/components/recommendation/map/LocationDetail';
import { GOOGLE_MAPS_API_KEY } from '@/libs/envValues';
import { mapStyles } from '@/libs/mapStyles';
import type { Location } from '@/types/recommendation';
import { GoogleMap, MarkerF, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { useContext, useEffect, useMemo } from 'react';
import { ActiveLocationContext } from '../ActiveLocationContext';
import { RecommendationContext } from '../RecommendationContext';
import { Box, useMediaQuery, useTheme } from '@mui/material';

const fixedColors = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'orange',
  'pink',
  'brown',
  'gray',
  'cyan',
];

const Map = () => {
  const recommendationContext = useContext(RecommendationContext);
  const activeLocationContext = useContext(ActiveLocationContext);
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: GOOGLE_MAPS_API_KEY });
  const { session } = recommendationContext;
  const { mapCenter, setMapCenter, activeLocation, setActiveLocation, zoom, setZoom } =
    activeLocationContext;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const allLocations = useMemo(
    () =>
      session.recommendations.flatMap((rec, recIndex) =>
        rec.locations.map((location) => ({
          ...location,
          color: `https://maps.google.com/mapfiles/ms/icons/${
            fixedColors[recIndex % fixedColors.length]
          }-dot.png`,
        })),
      ),
    [session],
  );

  const paths = useMemo(() => {
    return session.recommendations.flatMap((rec, recIndex) => {
      const arrows = [];

      for (let i = 0; i + 1 < rec.locations.length; i++) {
        arrows.push({
          key: `${recIndex}-${i}`,
          path: [rec.locations[i], rec.locations[i + 1]],
          color: fixedColors[recIndex % fixedColors.length],
        });
      }

      return arrows;
    });
  }, [session]);

  const handleMarkerClick = (location: Location) => {
    setActiveLocation(location);
    setMapCenter({ lat: location.lat, lng: location.lng });
    setZoom(16);
  };

  useEffect(() => {
    if (allLocations.length > 0) {
      setMapCenter(allLocations[0]);
    }
  }, [allLocations, setMapCenter]);

  return (
    <Box sx={{ height: { sm: '75dvh', xs: '50dvh' }, position: 'relative' }}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={mapCenter}
          zoom={zoom}
          options={{
            styles: mapStyles,
            keyboardShortcuts: false,
            zoom,
            disableDefaultUI: isMobile,
          }}
        >
          {paths.map(({ path, color, key }) => (
            <Polyline
              key={key}
              path={path}
              options={{
                strokeColor: color,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                icons: [
                  {
                    icon: {
                      path: 'M 0,0 5,15 -5,15 0,0 z', // 0,0 is the tip of the arrow
                      fillColor: color,
                      fillOpacity: 1.0,
                      strokeColor: color,
                      strokeWeight: 1,
                    },
                    offset: '100%',
                  },
                ],
              }}
            />
          ))}
          {allLocations.map((location) => (
            <MarkerF
              key={`${location.id}-${location.name}-${location.color}}`}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => handleMarkerClick(location)}
              icon={location.color}
            />
          ))}
        </GoogleMap>
      )}
      {activeLocation && <LocationDetail activeLocation={activeLocation} />}
    </Box>
  );
};

export default Map;
