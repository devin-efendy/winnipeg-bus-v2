<script lang="ts">
  import NavBar from "./components/NavBar.svelte";
  import AppContent from "./components/AppContent.svelte";
  import ThemeProvider from "./context/ThemeProvider.svelte";
  import { onMount } from "svelte";
  import getCurrentPosition from "./utils/location";

  let lat: string = "";
  let lon: string = "";

  onMount(() => {
    getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        lat = latitude.toString();
        lon = longitude.toString();
      },
      (error) => {
        console.error(error);
      }
    );
  });
</script>

<main>
  <ThemeProvider>
    <NavBar />
    <AppContent>
      <div style="padding: 15px;">
        {#if lat && lon}
          <p>latitude: {lat}</p>
          <p>longitude: {lon}</p>
        {:else}
          <p>Finding your location...</p>
        {/if}
      </div>
    </AppContent>
  </ThemeProvider>
</main>
