<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import getLocation from '@utils/location';
  import type { UserLocation } from '@types-transit';
  import { getStorageItem, removeStorageItem, setStorageItem } from '@utils/storage';

  const locationStores = writable<UserLocation>(undefined);

  setContext('location', {
    fetchLocation: async function () {
      let currentLocation = (await getStorageItem('location')) as UserLocation;

      if (currentLocation && currentLocation.expiryDate > Date.now()) {
        console.log('[ctx] Current location is found in cache');
        // locationStores.update((location) => currentLocation);
        locationStores.set(currentLocation);
        return currentLocation;
      }

      console.log('[ctx] Location is not found in cache. Fetching new one...');

      const { latitude, longitude } = await getLocation();

      const expiryDate = Date.now() + 60 * 60 * 1000; // 60 minutes = 60 x 60sec * 1000ms
      currentLocation = {
        latitude,
        longitude,
        expiryDate
      };

      setStorageItem('location', currentLocation);
      // locationStores.update((location) => currentLocation);
      locationStores.set(currentLocation);

      return currentLocation;
    },
    clearLocation: function () {
      removeStorageItem('location');
    },
    locationStores
  });
</script>

<slot />
