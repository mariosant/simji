<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="container mx-auto grid grid-cols-2 gap-4">
	{#each data.presets.rows as preset}
		<a href="/presets/{preset.$id}"
			><img alt={preset.name} src={preset.previewUrl} class="rounded-2xl" /></a
		>
	{/each}
</div>
