<script lang="ts">
	import Header from '$lib/components/header.svelte';

	let { children } = $props();
</script>

<Header />
{@render children()}
