<script lang="ts">
  import NavBar from "./components/NavBar.svelte";
  import AppContent from "./components/AppContent.svelte";

  let lat: string = "";
  let lon: string = "";

  console.log(window);
  console.log(navigator);

  const options = {
    timeout: 10000,
    maximumAge: 0,
  };

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      lat = latitude.toString();
      lon = longitude.toString();

      console.log(lat, lon);
    },
    (error) => {
      console.log(error);
    },
    options
  );
</script>

<main>
  <div id="app-container">
    <NavBar />
    <AppContent>
      {#if lat && lon}
        <p>latitude: {lat}</p>
        <p>longitude: {lon}</p>
      {:else}
        <p>Finding your location...</p>
      {/if}
    </AppContent>
  </div>
</main>

<style>
</style>
