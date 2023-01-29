<script>
	import theme from '../theme/index';

	Object.entries(theme).forEach(([key, variant]) => {
		const keyVar = `--${key}`;

		Object.entries(variant).forEach(([variantKey, variantValue]) => {
			const variantCssVar = `${keyVar}-${variantKey}`;
			document.documentElement.style.setProperty(variantCssVar, variantValue);
		});
	});
</script>

<slot />
