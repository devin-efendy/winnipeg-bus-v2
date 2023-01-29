<script lang="ts">
	import NavBar from './components/NavBar.svelte';
	import AppContent from './components/AppContent.svelte';
	import { getContext, onMount } from 'svelte';
	import type { ITransitContext } from './types';

	const { fetchLocation } = getContext<ITransitContext>('location');

	let latitude = '';
	let longitude = '';

	onMount(async () => {
		const { latitude: lat, longitude: lon } = await fetchLocation();
		latitude = lat;
		longitude = lon;
	});
</script>

<main>
	<NavBar />
	<AppContent>
		<div style="padding: 15px;">
			{#if latitude && longitude}
				<p>latitude: {latitude}</p>
				<p>longitude: {longitude}</p>
			{:else}
				<p>Finding your location...</p>
			{/if}
		</div>
	</AppContent>
</main>
