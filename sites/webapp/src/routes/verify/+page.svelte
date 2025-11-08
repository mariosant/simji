<script lang="ts">
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { verifyLogin } from '$lib/session.svelte';

	onMount(async () => {
		await verifyLogin();

		toast.success('Successful sign in!', {
			description: 'Hey, welcome back to Simji!. We missed you!'
		});

		goto('/');
	});
</script>
