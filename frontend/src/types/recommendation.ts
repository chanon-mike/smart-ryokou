export interface Recommendation {
  date: string;
  locations: Location[];
}

export interface Location {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  lat: number;
  lng: number;
}
