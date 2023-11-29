export interface PlaceDetails {
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  rating: number;
  userRatingCount: number;
  photo: string;
}
