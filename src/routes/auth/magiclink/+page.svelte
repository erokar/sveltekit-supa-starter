<script lang="ts">
	import { supabaseClient } from '$lib/db'
	import { goto } from '$app/navigation'

	let email: string

	async function signIn() {
		// TODO
		console.log('TODO')
	}
</script>

<div class="container pt-2">
	<div
		id="loginbox"
		style="margin-top:50px;"
		class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"
	>
		<div class="panel panel-info">
			<div class="panel-heading">
				<h2>Sign In</h2>
			</div>

			<div style="padding-top:30px" class="panel-body">
				<div style="display:none" id="login-alert" class="alert alert-danger col-sm-12" />

				<form id="loginform" class="form-horizontal" role="form" on:submit|preventDefault={signIn}>
					<div style="margin-bottom: 25px" class="input-group">
						<span class="input-group-addon"><i class="glyphicon glyphicon-user" /></span>
						<input
							bind:value={email}
							id="login-username"
							type="text"
							class="form-control"
							name="username"
							placeholder="Email"
						/>
					</div>

					<div style="margin-top:10px" class="form-group">
						<!-- Button -->

						<div class="col-sm-12 controls">
							<button id="btn-login" class="btn btn-success">Sign In </button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
