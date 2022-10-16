<script lang="ts">
	import { supabaseClient } from '$lib/db'

	let email: string

	async function signIn() {
		const { data, error } = await supabaseClient.auth.signInWithOtp({
			email
		})
		if (error) {
			console.error(error)
		} else {
			console.log(data)
		}
	}
</script>

<h2>Sign In</h2>

<form id="loginform" on:submit|preventDefault={signIn}>
	<input bind:value={email} id="login-username" type="text" name="username" placeholder="Email" />

	<button id="btn-login">Sign In </button>
</form>
