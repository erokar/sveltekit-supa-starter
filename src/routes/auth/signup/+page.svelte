<script lang="ts">
	import { supabaseClient } from '$lib/db'

	let email: string
	let password: string
	let passwordConfirmation: string
	let errorMessage: string | null
	let successMessage: string
	let awaiting: boolean = false

	async function signUp() {
		if (!email || !password || !passwordConfirmation) {
			errorMessage = 'All fields must be filled in.'
			return
		}
		if (password !== passwordConfirmation) {
			errorMessage = 'Password and password confirmation differ.'
			return
		}
		awaiting = true
		const { error } = await supabaseClient.auth.signUp({
			email,
			password
		})
		if (error) {
			errorMessage = error.message
			awaiting = false
			return
		}
		awaiting = false
		errorMessage = null
		successMessage = `Sign in email sent to ${email}.`
	}
</script>

<h2>Sign Up</h2>

{#if errorMessage}
	<div role="alert">
		{errorMessage}
	</div>
{/if}
{#if successMessage}
	<div role="alert">{successMessage}</div>
{/if}

<form id="loginform" on:submit|preventDefault={signUp}>
	<input bind:value={email} id="login-username" type="text" name="username" placeholder="Email" />

	<input
		bind:value={password}
		id="login-password"
		type="password"
		name="password"
		placeholder="Password"
	/>

	<input
		bind:value={passwordConfirmation}
		id="login-password-confirmation"
		type="password"
		name="passwordConfirmation"
		placeholder="Password confirmation"
	/>

	<button id="btn-login">
		{#if awaiting}
			TODO: Add spinner
		{/if}
		<span class="m-2">Sign Up</span>
	</button>
</form>
