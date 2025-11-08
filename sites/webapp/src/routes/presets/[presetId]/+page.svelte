<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';
	import { session, isLoggedIn } from '$lib/session.svelte';
	import type { PageProps } from './$types';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { uploadSelfie, createPurchase } from '$lib/service';
	import { goto } from '$app/navigation';

	let { data }: PageProps = $props();

	let fileInput: HTMLInputElement;

	const handleTakeSelfie = () => {
		fileInput.click();
	};

	const handleFileChange = async (event: Event) => {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (!file) {
			return;
		}

		const selfie = await uploadSelfie(file);
		const purchase = await createPurchase({
			preset: data.preset,
			selfie,
			userId: session.currentUser?.$id
		});

		await goto(`/purchases`);
	};
</script>

<input
	type="file"
	accept="image/*"
	capture="user"
	class="hidden"
	bind:this={fileInput}
	onchange={handleFileChange}
/>

<div class="container mx-auto space-y-4 pb-8">
	<div>
		<img
			alt="Preview for {data.preset.name} preset"
			src={data.preset.previewUrl}
			class="block w-full rounded-t-2xl"
		/>
		<div class="space-y-2 rounded-2xl rounded-t-none border border-t-0 p-4">
			<div class="text-xl font-semibold">{data.preset.name}</div>
			<div class="">{data.preset.description}</div>
		</div>
	</div>

	<div>
		{#if session.isReady}
			{#if isLoggedIn()}
				<Button class="w-full" onclick={handleTakeSelfie}>
					<Icon icon="mingcute:camera-2-ai-fill" class="size-5" />
					Take a selfie
				</Button>
			{:else}
				<Button href="/sign-in" class="w-full">
					<Icon icon="mingcute:camera-2-ai-fill" class="size-5" />
					Sign in to take a selfie
				</Button>
			{/if}
		{:else}
			<Skeleton class="h-9 w-full" />
		{/if}
	</div>
</div>
