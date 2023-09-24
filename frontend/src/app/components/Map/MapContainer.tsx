'use client'; // This is a client component 👈🏽

import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import MapConfigs from '../../../libs/MapConfigs';

const { API_KEY } = MapConfigs();

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

const MapContainer: React.FC<MapProps> = ({ center, zoom }) => {
  const [mapCenter, setMapCenter] = useState(center);

  const navigateToLocation = (lat: number, lng: number) => {
    setMapCenter({ lat, lng });
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={mapCenter}
        zoom={zoom}
      >
        <Marker
          position={center}
          onClick={() => {
            // Handle marker click here
          }}
        />
      </GoogleMap>
      <button
        onClick={() => {
          navigateToLocation(40.7128, -74.006);
        }}
      >
        Navigate to New York
      </button>
    </LoadScript>
  );
};

export default MapContainer;
