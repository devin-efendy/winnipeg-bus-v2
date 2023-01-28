<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import getLocation from "../utils/location";
  import type { UserLocation } from "../types";
  import {
    getStorageItem,
    removeStorageItem,
    setStorageItem,
  } from "../utils/storage";

  const locationStores = writable<UserLocation>(undefined);

  setContext("location", {
    fetchLocation: async function () {
      let currentLocation = (await getStorageItem("location")) as UserLocation;

      console.log(currentLocation);

      if (currentLocation && currentLocation.expiryDate > Date.now()) {
        console.log("cache hit");
        return currentLocation;
      }

      const { latitude, longitude } = await getLocation();

      currentLocation = {
        latitude,
        longitude,
        // 5 minutes = 5 x 60sec * 1000ms
        expiryDate: Date.now() + 5 * 60 * 1000,
      };

      locationStores.set(currentLocation);
      setStorageItem("location", currentLocation);

      return { latitude, longitude };
    },
    clearLocation: function () {
      removeStorageItem("location");
    },
  });
</script>

<slot />
