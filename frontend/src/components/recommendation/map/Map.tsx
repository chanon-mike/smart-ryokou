'use client';

import LocationDetail from '@/components/recommendation/map/LocationDetail';
import { GOOGLE_MAPS_API_KEY } from '@/libs/envValues';
import { mapStyles } from '@/libs/mapStyles';
import type { Location } from '@/types/recommendation';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { useContext, useEffect, useMemo } from 'react';
import { ActiveLocationContext } from '../ActiveLocationContext';
import { RecommendationContext } from '../RecommendationContext';

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
      {activeLocation && <LocationDetail activeLocation={activeLocation} />}
    </div>
  );
};

export default Map;
