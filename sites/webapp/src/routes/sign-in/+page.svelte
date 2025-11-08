<script lang="ts">
	import { toast } from 'svelte-sonner';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { loginViaMagicUrl } from '$lib/session.svelte';

	let email = $state<string>();

	const handleLogin = async () => {
		await loginViaMagicUrl(email).then(() => {
			toast.info('An email has been sent', {
				description: 'Check your email for the magic link.'
			});
		});
	};
</script>

<div class="pt-16">
	<Card.Root class="mx-auto w-full max-w-sm">
		<Card.Header>
			<Card.Title>Sign In with a magic link</Card.Title>
			<Card.Description
				>Enter your email below and an email with a magic link will be sent to you.</Card.Description
			>
		</Card.Header>
		<Card.Content>
			<form onsubmit={handleLogin}>
				<div class="flex flex-col gap-6">
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							bind:value={email}
							required
						/>
					</div>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<Button onclick={handleLogin} type="submit" class="w-full">Sign in with magic link</Button>
		</Card.Footer>
	</Card.Root>
</div>
