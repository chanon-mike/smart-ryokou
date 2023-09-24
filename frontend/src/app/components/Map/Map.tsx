import MapContainer from './MapContainer';

const Map = () => {
  const componentStyle = {
    width: '1200px',
    height: '720px',
  };

  const center = { lat: 37.7749, lng: -122.4194 }; // San Francisco
  const defaultZoom = 14;

  return (
    <div style={componentStyle}>
      <MapContainer center={center} zoom={defaultZoom} />
    </div>
  );
};

export default Map;
