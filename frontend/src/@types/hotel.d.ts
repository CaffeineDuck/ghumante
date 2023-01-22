interface HotelInterface {
  id: number;
  name: string;
  geolocation: GeoLocationInterface;
  location_name: string;
  description: string;
  room_available: boolean;
  photo: string;
  created_at: Date;
}
