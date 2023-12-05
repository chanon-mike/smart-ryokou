export interface Recommendation {
  date: string;
  locations: Location[];
}

export interface Location {
  id: string;
  name: string;
  description: string;
  address: string;
  rating: number;
  userRatingCount: number;
  photo: string;
  lat: number;
  lng: number;
}
