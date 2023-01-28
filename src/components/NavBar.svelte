<script>
  import "iconify-icon";
  import IconButton from "./IconButton.svelte";

  let searchInputValue = "";
  let activeNavButtons = [true, false];
  let iconSize = "24px";
</script>

<div role="navigation" id="navigation-bar">
  <h1 style="color: #93C5FD;">WT</h1>

  <IconButton icon="ic:round-refresh" size={iconSize} />

  <div id="search-input-container">
    <label>
      <input
        bind:value={searchInputValue}
        id="search-input"
        name="search-input"
        placeholder="Search stops or locations"
      />
    </label>
    <IconButton
      on:click={() => {
        searchInputValue && console.log(searchInputValue);
      }}
      icon="ic:baseline-search"
      size={iconSize}
    />
  </div>

  <div id="nav-button-group">
    <IconButton
      active={activeNavButtons[0]}
      icon="ion:navigate-circle-outline"
      size={iconSize}
    />
    <IconButton
      active={activeNavButtons[1]}
      icon="ic:round-bookmark-border"
      size={iconSize}
    />
    <IconButton
      active={activeNavButtons[2]}
      icon="mi:options-vertical"
      size={iconSize}
    />
  </div>
</div>

<style>
  #navigation-bar {
    display: flex;
    width: 100%;
    height: 55px;
    background-color: var(--bg-base);
    border-bottom: 1px solid var(--border-divider);
    padding: 0px 50px;
    justify-content: space-between;
    align-items: center;
  }

  #search-input-container {
    display: flex;
    gap: 8px;
  }

  label {
    cursor: text;

    width: 230px;
    height: 35px;
    display: flex;
    align-items: center;
    padding: 8px;

    background: #191919;
    border-radius: 6px;
    border: 1px solid var(--border-base);
  }

  input {
    width: 100%;
    padding-right: 20px;

    background: none;
    outline: none;
    border: none;

    font-size: 14px;
    font-weight: 400;
    color: white;
  }

  input::placeholder {
    color: #aaaaaa;
  }

  label:focus-within {
    outline: 3px solid var(--outline-active);
  }

  #nav-button-group {
    display: flex;
    gap: 16px;
  }
</style>
