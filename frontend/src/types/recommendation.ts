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
  imageUrl: string;
  lat: number;
  lng: number;
}
