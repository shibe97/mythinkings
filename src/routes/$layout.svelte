<script lang="ts">
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<style lang="scss">
	@import '../../styles/variables.scss';
	.wrapper {
		background-color: $color-bg-main;
	}
	.main {
		position: relative;
		width: 720px;
		margin: 0 auto 0;
		padding: 112px 0 40px;
		box-sizing: border-box;
		color: $color-text-main;
	}

	@media (max-width: 800px) and (min-width: 640px) {
		.main {
			width: auto;
			padding: 112px 40px 40px;
		}
	}

	@media (max-width: 640px) {
		.main {
			width: auto;
			padding: 80px 24px 16px;
		}
	}
</style>

<svelte:head>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-2JQZLFL2LV"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', 'G-2JQZLFL2LV');
	</script>
</svelte:head>

<div class="wrapper">
  <Header /> 
  <main class="main">
	  <slot></slot>
  </main>
  <Footer /> 
</div>