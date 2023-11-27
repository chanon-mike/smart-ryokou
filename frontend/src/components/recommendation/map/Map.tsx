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
  const { session } = recommendationContext;
  const { mapCenter, setMapCenter, activeLocation, setActiveLocation, zoom, setZoom } =
    activeLocationContext;

  const allLocations = useMemo(
    () =>
      session.recommendations.flatMap((rec) =>
        rec.locations.map((location) => ({
          ...location,
        })),
      ),
    [session],
  );

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
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={mapCenter}
          zoom={zoom}
          options={{
            styles: mapStyles,
            keyboardShortcuts: false,
            zoom,
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
