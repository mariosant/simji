<script lang="ts">
	import type { PageProps } from './$types';
	import { storage, filesBucketId } from '$lib/appwrite';
	import { Status } from '$lib/appwrite-types';
	import { Spinner } from '$lib/components/ui/spinner';

	let { data }: PageProps = $props();
</script>

<div class="container mx-auto grid grid-cols-2 gap-4">
	{#each data.rows as purchase}
		<a href="/purchases/{purchase.$id}" class="relative block">
			{#if purchase.status === Status.COMPLETE}
				<img
					alt={purchase.preset.name}
					src={storage.getFileView({ bucketId: filesBucketId, fileId: purchase.artifactId })}
					class="rounded-2xl"
				/>
			{:else if purchase.status === Status.PROCESSING}
				<div
					class="flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg border bg-gray-50"
				>
					<Spinner class="size-8" />
				</div>
			{/if}
		</a>
	{/each}
</div>
