<script>
	import TransitProvider from './context/TransitProvider.svelte';
	import ThemeProvider from './context/ThemeProvider.svelte';
	import Main from './Main.svelte';
</script>

<main>
	<TransitProvider>
		<ThemeProvider>
			<Main />
		</ThemeProvider>
	</TransitProvider>
</main>
