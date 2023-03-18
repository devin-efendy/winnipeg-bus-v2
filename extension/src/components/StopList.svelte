<script lang="ts">
  import type { IStop } from '@/types';
  import Scrollable from './Scrollable.svelte';
  import Stop from './Stop.svelte';

  export let stops: IStop[] = [];

  $: {
    console.log(stops);
  }
</script>

<div id="stop-list">
  <Scrollable>
    {#if stops.length > 0}
      {#each stops.sort() as stop}
        <Stop {stop} />
      {/each}
    {:else}
      <p>Fetching nearby stops...</p>
    {/if}
  </Scrollable>
</div>

<style>
  #stop-list {
    width: 300px;
    height: 100%;
    /* padding: 12px; */
    border-right: 1px solid gray;
  }
</style>
