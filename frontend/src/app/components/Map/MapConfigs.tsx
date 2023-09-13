const MapConfigs = () => {
  const API_KEY = process.env.GOOGLE_MAPS_API ?? '';

  return {
    API_KEY,
  };
};

export default MapConfigs;
