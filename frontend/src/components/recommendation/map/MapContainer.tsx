'use client';

import type { FC } from 'react';
import { useContext } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import MapConfigs from '@/libs/MapConfigs';
import { ActiveLocationContext } from '../ActiveLocationContext';
const { API_KEY } = MapConfigs();

interface MapProps {
  zoom: number;
}

const MapContainer: FC<MapProps> = ({ zoom }) => {
  const activeLocationContext = useContext(ActiveLocationContext);
  const { mapCenter } = activeLocationContext;

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={mapCenter}
        zoom={zoom}
      >
        <Marker
          position={mapCenter}
          onClick={() => {
            // Handle marker click here
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
