<script>
	import { supabaseClient } from '$lib/db'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import { page } from '$app/stores'

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth')
		})

		return () => {
			subscription.unsubscribe()
		}
	})

	async function signOut() {
		const { error } = await supabaseClient.auth.signOut()
		if (error) {
			console.error('Could not sign out. ', error)
		}
	}

	$: currentUser = $page.data.session?.user
</script>

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		{#if currentUser}
			<li><a href="" on:click={signOut} on:keyup={signOut}>Sign out</a></li>
			<li>Current user: {currentUser?.email}</li>
		{:else}
			<li><a href="/auth/signin">Sign in</a></li>
			<li><a href="/auth/signup">Sign up</a></li>
		{/if}
	</ul>
</nav>
<slot />
