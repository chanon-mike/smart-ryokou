'use client'; // This is a client component 👈🏽

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import MapConfigs from '@/libs/MapConfigs';
const { API_KEY } = MapConfigs();

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

const MapContainer: React.FC<MapProps> = ({ center, zoom }) => {
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap mapContainerStyle={{ width: '100%', height: '100%' }} center={center} zoom={zoom}>
        <Marker
          position={center}
          onClick={() => {
            // Handle marker click here
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
