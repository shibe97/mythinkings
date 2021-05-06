<script lang="ts">
	export let pages: number[];
	export let current: number;
</script>

<style lang="scss">
	@import '../../styles/variables.scss';
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 24px;
		margin-top: 24px;
	}
	.list {
		margin: 0 4px;
	}
	.item {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 36px;
		height: 36px;
		border-radius: 5px;
	}
	.current {
		background-color: $color-accent;
		color: $color-text-white;
	}
</style>

<ul class="container">
	{#each pages as p}
		<li class="list">
			{#if current !== p}
				<a href={`/p/${p}`} class="item">
					{p}
				</a>
			{:else}
				<span class="item current">{p}</span>
			{/if}
		</li>
	{/each}
</ul>