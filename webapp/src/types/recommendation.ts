export interface Recommendation {
  date: string;
  locations: Location[];
}

export interface Location {
  id: string;
  placeId: string;
  name: string;
  description: string;
  rating?: number;
  userRatingCount?: number;
  photo: string;
  lat: number;
  lng: number;
}
