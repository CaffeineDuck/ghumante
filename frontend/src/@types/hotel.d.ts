interface HotelInterface {
  id: number;
  name: string;
  geometry: GeoLocationInterface;
  location_name: string;
  description: string;
  room_available: boolean;
  photo: string;
  created_at: Date;
  price_per_night: number;
}
