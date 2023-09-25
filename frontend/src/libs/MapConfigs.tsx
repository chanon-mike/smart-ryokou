const MapConfigs = () => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API ?? '';

  return {
    API_KEY,
  };
};

export default MapConfigs;
