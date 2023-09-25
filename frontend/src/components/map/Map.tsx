import MapContainer from './MapContainer';

interface MapProps {
  lat: number;
  lng: number;
}

const Map: React.FC<MapProps> = ({ lat, lng }) => {
  const componentStyle = {
    width: '100%',
    height: '100%',
  };

  const defaultZoom = 12;

  return (
    <div style={componentStyle}>
      <MapContainer center={{ lat, lng }} zoom={defaultZoom} />
    </div>
  );
};

export default Map;
