import { writable } from "svelte/store";

const locationStores = writable({
  latitude: "",
  longitude: "",
  expiryDate: "",
});

export default locationStores;
