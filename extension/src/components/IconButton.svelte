<script>
	export let active = false;
	export let icon = '';
	export let size = '';
	export let label = '';
</script>

<button aria-label={label} class:active on:click>
	<iconify-icon class="nav-icon" {icon} style={`font-size: ${size}`} />
</button>

<style>
	button {
		display: flex;
		align-items: center;

		border-radius: 6px;
		border: none;

		background-color: var(--icon-button-base);
		color: var(--icon-button-color);

		padding: 4px;
	}

	button:active:focus {
		background-color: var(--icon-button-active);
		color: #fafafa;
	}

	button:focus-visible {
		outline: solid 3px var(--outline-active);
	}

	button:hover {
		cursor: pointer;
		background-color: var(--icon-button-hover);
	}

	button.active {
		cursor: default;
		background-color: var(--icon-button-active) !important;
		color: #fafafa !important;
	}
</style>
