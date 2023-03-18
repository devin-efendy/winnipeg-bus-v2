<script lang="ts">
  import NavBar from '@components/NavBar.svelte';
  import AppContent from '@components/AppContent.svelte';
  import { getContext, onMount } from 'svelte';
  import type { TransitContext } from './types';
  import StopList from '@components/StopList.svelte';

  const { fetchLocation, locationStores } = getContext<TransitContext>('location');

  let nearbyStops = [];

  $: if ($locationStores) {
    const { latitude, longitude } = $locationStores;
    console.log(latitude, longitude);

    fetch(`http://localhost:8080/stops/nearby?lat=${latitude}&lon=${longitude}`)
      .then((res) => {
        return res.json();
      })
      .then((resJson) => {
        nearbyStops = resJson['stops'];
      });
  }

  onMount(async () => {
    await fetchLocation();
  });
</script>

<main>
  <NavBar />
  <AppContent>
    {#if !$locationStores}
      <div>Fetching your location...</div>
    {:else}
      <StopList stops={nearbyStops} />
    {/if}
  </AppContent>
</main>
