interface DestinationInterface {
  id: number;
  name: string;
  geometry: GeoLocationInterface;
  description: string;
  photo: string | null;
  created_at: Date;
  category: number;
}
