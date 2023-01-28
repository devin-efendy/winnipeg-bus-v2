<script>
  import { createEventDispatcher } from "svelte";

  export let nav = "";
  export let active = false;

  const dispatch = createEventDispatcher();

  function onClick() {
    dispatch("navEvent", {
      nav,
    });
  }
</script>

<button class:active on:click={onClick}>
  <slot class="nav-icon" />
</button>

<style>
  button {
    display: flex;
    align-items: center;

    border-radius: 6px;
    border: none;

    background-color: transparent;
    color: #a0aec0;
  }

  button:active:focus {
    color: #63b3ed;
  }

  button:focus-visible {
    outline: solid 3px #3182ce;
  }

  button:hover {
    cursor: pointer;
    color: #f7fafc;
  }

  button.active {
    cursor: default;
    color: #f7fafc !important;
  }
</style>
