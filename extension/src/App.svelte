<script>
	import LocationProvider from '@context/LocationProvider.svelte';
	import ThemeProvider from './context/ThemeProvider.svelte';
	import Main from './Main.svelte';
</script>

<main>
	<LocationProvider>
		<ThemeProvider>
			<Main />
		</ThemeProvider>
	</LocationProvider>
</main>
