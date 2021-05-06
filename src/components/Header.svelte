<header class="header">
  <h1 class="logo"><a href="/"><img src="/logo.svg" alt="mythinkings" class="logo"></a></h1>
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
      backdrop-filter: blur(2px);
		}
	}
</style>