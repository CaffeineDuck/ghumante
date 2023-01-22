interface CommonObjectResponse {
  id: number;
  type: string;
  geometry: Geolocation;
  properties: Record<any, any>;
}
