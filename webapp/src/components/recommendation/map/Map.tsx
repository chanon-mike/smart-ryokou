'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';
import { GoogleMap, MarkerF, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { useContext, useEffect, useMemo } from 'react';

import LocationDetail from '@/components/recommendation/map/LocationDetail';
import { GOOGLE_MAPS_API_KEY } from '@/libs/envValues';
import { mapStyles } from '@/libs/mapStyles';
import type { Location } from '@/types/recommendation';

import { ActiveLocationContext } from '../ActiveLocationContext';
import { DisplayRoutesContext } from '../DisplayRoutesContext';
import { RecommendationContext } from '../RecommendationContext';

const fixedColors = [
  'red',
  'blue',
  'green',
  'purple',
  'pink',
  'brown',
  'gray',
  'cyan',
  'yellow',
  'orange',
];

const Map = () => {
  const { session } = useContext(RecommendationContext);
  const { mapCenter, setMapCenter, activeLocation, setActiveLocation, zoom, setZoom } =
    useContext(ActiveLocationContext);
  const { displayRoutes } = useContext(DisplayRoutesContext);
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: GOOGLE_MAPS_API_KEY });
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
          {displayRoutes &&
            paths.map(({ path, color, key }) => (
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
                        path: 'M 0,0 3,9 -3,9 0,0 z', // 0,0 is the tip of the arrow
                        fillColor: color,
                        fillOpacity: 1.0,
                        strokeColor: color,
                        strokeWeight: 3.0,
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
