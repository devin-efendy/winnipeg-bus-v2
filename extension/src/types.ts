import type { Writable } from 'svelte/store';

export interface UserLocation {
  latitude: string;
  longitude: string;
  expiryDate: number;
}

export interface TransitContext {
  fetchLocation?: () => UserLocation;
  clearLocation?: () => void;
  locationStores?: Writable<UserLocation>;
}

export interface IStop {
  key: number;
  headsign: string;
  direction: string;
  distances: {
    direct: string;
    walking: string;
  };
  location: {
    latitude: string;
    longitude: string;
  };
  routes: string[];
}
