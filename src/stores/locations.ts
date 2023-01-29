import { writable } from 'svelte/store';

const locationStores = writable({
	latitude: '',
	longitude: '',
	expiryDate: 0
});

export default locationStores;
