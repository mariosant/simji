<script lang="ts">
	import { filesBucketId, storage } from '$lib/appwrite';

	let { data }: PageProps = $props();
</script>

<div>
	<img
		alt={data.purchase.preset.name}
		src={storage.getFileView({ bucketId: filesBucketId, fileId: data.purchase.artifactId })}
		class="w-full rounded-2xl"
	/>
</div>
