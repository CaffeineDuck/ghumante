interface DestinationInterface {
  id: number;
  name: string;
  geometry: GeoLocationInterface;
  description: string;
  photo: string;
  created_at: Date;
  category: number;
  location_name: string;
  visiting_time: number;
}
