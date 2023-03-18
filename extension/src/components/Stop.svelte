<script lang="ts">
  import type { IStop } from '@/types';

  export let stop: IStop = undefined;
</script>

<div id="card-container">
  <div class="card-header">
    <h3>{stop.headsign}</h3>

    <div class="card-header-subtitle">
      <p>#{stop.key}</p>
      <p>({stop.distances.walking} m)</p>
      <p>{stop.direction}</p>
    </div>
  </div>

  <div class="stop-routes">
    {#each stop.routes as route}
      <div>
        {route === 'BLUE' ? 'B' : route}
      </div>
    {/each}
  </div>
</div>

<style>
  #card-container {
    margin: 12px;
    padding: 16px;
    border-radius: 8px;

    transition: background-color 0.1s ease-in-out;
  }

  #card-container:hover {
    background-color: rgb(77, 77, 225);
  }

  .card-header h3 {
    font-size: 14px;
  }

  .card-header-subtitle {
    display: flex;
    margin-top: 2px;
  }

  .card-header-subtitle p {
    margin-right: 12px;
    font-size: 12px;
  }

  .stop-routes {
    display: flex;
    margin-top: 12px;
    font-weight: 500;
  }

  .stop-routes div {
    background-color: rgb(69, 69, 69);
    display: flex;
    align-items: center;
    justify-content: center;

    width: 35px;
    height: 35px;

    border-radius: 6px;
    border: none;

    /* padding: 3px; */
    margin-right: 6px;
    font-size: 14px;
  }
</style>
