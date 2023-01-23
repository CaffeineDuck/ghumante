interface DestinationInterface {
  id: number;
  name: string;
  geometry: GeoLocationInterface;
  description: string;
  photo: string;
  created_at: Date;
  category: number;
  address: string;
  visiting_time: number;
}
