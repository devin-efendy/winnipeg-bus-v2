<script>
  import "iconify-icon";
  import NavButton from "./NavButton.svelte";

  let activeNavButtons = [true, false, false];
  let iconSize = "30";
</script>

<div role="navigation" id="navigation-bar">
  <h1>Peg Bus</h1>

  <div id="search-input-container">
    <label>
      <input placeholder="Search Bus Stops" />
    </label>
    <NavButton active={activeNavButtons[2]}>
      <iconify-icon
        icon="ic:baseline-search"
        style={`font-size: ${iconSize}px`}
      />
    </NavButton>
  </div>

  <div id="nav-button-group">
    <NavButton active={activeNavButtons[2]}>
      <iconify-icon
        icon="ion:navigate-circle-outline"
        style={`font-size: ${iconSize}px`}
      />
    </NavButton>
    <NavButton active={activeNavButtons[3]}>
      <iconify-icon
        icon="ic:round-refresh"
        style={`font-size: ${iconSize}px`}
      />
    </NavButton>
    <NavButton>
      <iconify-icon
        icon="ic:round-bookmark-border"
        style={`font-size: ${iconSize}px`}
      />
    </NavButton>
  </div>
</div>

<style>
  #navigation-bar {
    display: flex;

    width: 100%;
    height: 50px;

    background-color: #313131;
    padding: 0 50px;

    justify-content: space-between;
    align-items: center;
  }

  #search-input-container {
    display: flex;
    gap: 8px;
  }

  label {
    cursor: text;

    height: 100%;

    display: flex;
    align-items: center;
    padding: 8px;

    background: #191919;

    border-radius: 6px;

    width: 230px;
  }

  input {
    font-weight: 400;
    width: 100%;

    background: none;
    outline: none;

    border: none;
    padding-right: 20px;

    font-size: 14px;

    color: white;
  }

  input::placeholder {
    color: #aaaaaa;
  }

  label:focus-within {
    outline: 3px solid #3182ce;
  }

  #nav-button-group {
    display: flex;
    gap: 16px;
  }
</style>
