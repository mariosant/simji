<script lang="ts">
	import '../app.css';

	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import favicon from '$lib/assets/favicon.svg';
	import { session, initialize } from '$lib/session.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		initialize();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="dark min-h-screen bg-black px-4 text-white">
	{@render children()}
</div>

<Toaster position="top-center" />
