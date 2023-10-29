import MapContainer from './MapContainer';

const Map = () => {
  const componentStyle = {
    width: '100%',
    height: '100%',
  };

  const defaultZoom = 12;

  return (
    <div style={componentStyle}>
      <MapContainer zoom={defaultZoom} />
    </div>
  );
};

export default Map;
