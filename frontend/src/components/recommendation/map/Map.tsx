'use client';

import LocationDetail from '@/components/recommendation/map/LocationDetail';
import { GOOGLE_MAPS_API_KEY } from '@/libs/envValues';
import { mapStyles } from '@/libs/mapStyles';
import type { Location } from '@/types/recommendation';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useContext, useEffect, useMemo } from 'react';
import { ActiveLocationContext } from '../ActiveLocationContext';
import { RecommendationContext } from '../RecommendationContext';

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
  const { mapCenter, setMapCenter, activeLocation, setActiveLocation } = activeLocationContext;

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

  const handleMarkerClick = (location: Location) => {
    setActiveLocation(location);
    setMapCenter({ lat: location.lat, lng: location.lng });
  };

  useEffect(() => {
    if (allLocations.length > 0) {
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
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => handleMarkerClick(location)}
              icon={location.color}
            />
          ))}
        </GoogleMap>
      )}
      {activeLocation && <LocationDetail activeLocation={activeLocation} />}
    </div>
  );
};

export default Map;
