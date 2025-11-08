<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Drawer from '$lib/components/ui/drawer';
	import { session, logout, isLoggedIn } from '$lib/session.svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
</script>

<div class="container mx-auto flex items-center justify-between gap-4 py-4">
	<div class="flex items-center gap-4">
		<Drawer.Root direction="left">
			<Drawer.Trigger>
				<Button variant="secondary">
					<Icon icon="mingcute:menu-line" />
				</Button>

				<Drawer.Content class="bg-black text-white">
					<div class="space-y-4 p-4">
						<a href="/presets" class="block text-xl font-semibold">Simji</a>
						<a href="/presets" class="block text-lg font-semibold">Presets</a>
						{#if isLoggedIn()}
							<a href="/purchases" class="block text-lg font-semibold">My Photos</a>
						{/if}
					</div>

					<div class="space-y-4 p-4">
						{#if isLoggedIn()}
							<button onclick={() => logout()} class="block text-lg font-semibold">Sign out</button>
						{:else}
							<a href="/sign-in" class="block text-lg font-semibold">Sign In</a>
						{/if}
					</div>
				</Drawer.Content>
			</Drawer.Trigger>
		</Drawer.Root>

		<a href="/presets" class="text-2xl font-bold">Simji</a>
	</div>

	{#if isLoggedIn()}
		<div class="flex items-center gap-2">
			<div class="truncate font-semibold">{session.currentUser?.email}</div>
			<Avatar.Root>
				<Avatar.Image
					src="https://api.dicebear.com/9.x/thumbs/svg?seed={session.currentUser?.email}"
				/>
			</Avatar.Root>
		</div>
	{:else}
		<Button href="/sign-in" variant="secondary">Sign In</Button>
	{/if}
</div>
