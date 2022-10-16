<script lang="ts">
	import { page } from '$app/stores'
	import { supabaseClient } from '$lib/db'
	import { goto } from '$app/navigation'

	let email = ''
	let password = ''
	let errorMessage = ''

	async function signIn() {
		const { error } = await supabaseClient.auth.signInWithPassword({
			email,
			password
		})
		if (error) {
			errorMessage = error.message
		}

		$: if ($page.data.session?.user) {
			goto('/')
		}
	}
</script>

<h2>Sign In</h2>

{#if errorMessage}
	<div role="alert">
		{errorMessage}
	</div>
{/if}
<form id="loginform" on:submit|preventDefault={signIn}>
	<input bind:value={email} id="login-username" type="text" name="username" placeholder="Email" />

	<input
		bind:value={password}
		id="login-password"
		type="password"
		name="password"
		placeholder="Password"
	/>

	<button id="btn-login" class="btn btn-success">Sign In </button>
</form>
<a href="/auth/signup">Don't have an account?</a>
<br />
<a href="/auth/magiclink">Want a magic link?</a>
