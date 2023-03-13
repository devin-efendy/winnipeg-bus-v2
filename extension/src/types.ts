export interface UserLocation {
  latitude: string;
  longitude: string;
  expiryDate: number;
}

export interface ITransitContext {
  fetchLocation?: () => UserLocation;
  clearLocation?: () => void;
}
