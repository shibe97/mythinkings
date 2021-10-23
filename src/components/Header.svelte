<script lang="ts">
	import { onMount } from 'svelte';
  import createAuth0Client from '@auth0/auth0-spa-js';
  import { isAuthenticated, authToken } from '../store';
	const config = {
		domain: "mythikings.jp.auth0.com",
		client_id: "u0N1w2Lt5jNg0s1onz5RO1h5wu0LSFxQ"
	};
  export let client;
	async function authenticate() {
    client = await createAuth0Client(config);
    isAuthenticated.set(await client.isAuthenticated());
    authToken.set(await client.getTokenSilently());
  }
  onMount(() => {
    authenticate();
  })
</script>

<header class="header">
  <h1 class="logo"><a href="/"><img src="/logo.svg" alt="mythinkings" class="logo"></a></h1>
  {#if $isAuthenticated === true }
  <button on:click={() => client.logout({
    returnTo: window.location.origin
  })}>ログアウト</button>
  {/if}
  {#if $isAuthenticated === false }
  <button on:click={() => client.loginWithPopup()}>ログイン</button>
  {/if}
</header>

<style lang="scss">
	@import '../../styles/variables.scss';
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    display: flex;
    align-items: center;
		padding: 16px 24px;
    box-sizing: border-box;
    height: 72px;
  }
  .logo {
    height: 28px;
  }

	@media (max-width: 640px) {
		.header {
			padding: 16px 24px;
      height: 64px;
		}
	}
</style>