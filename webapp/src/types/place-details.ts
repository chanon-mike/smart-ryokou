export interface PlaceDetails {
  placeId: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  rating: number;
  userRatingCount: number;
  photo: string;
}
