<script lang="ts">
	export let url;
	export let ogp;
</script>

{#if url !== undefined}
<a href={ogp.url} class="container" target="_blank" rel="noopener noreferrer">
	<img src={ogp.image} alt="" class="image" />
	<dl class="content">
		{#if ogp.title !== undefined}
		<dt class="title">{ogp.title}</dt>
		{/if}
		{#if ogp.description !== undefined}
		<dd class="description">{ogp.description}</dd>
		{/if}
		<dd class="url">{ogp.url}</dd>
	</dl>
</a>
{/if}

<style lang="scss">
	@import '../../styles/variables.scss';

	@media (min-width: 641px) {
		.container {
			display: flex;
			background-color: $color-bg-white;
			border: 1px solid $color-border-light;
			border-radius: 8px;
			padding: 32px;
			margin: 24px -32px;

			&:hover {
				border: 1px solid $color-border;
			}
		}

		.image {
			max-width: 240px;
			max-height: 120px;
			margin-right: 32px;
		}

		.content {
			flex: 1;
		}

		.title {
			font-size: 16px;
			font-weight: bold;
			margin-bottom: 8px;
		}

		.description {
			color: $color-text-sub;
			font-size: 14px;
		}

		.url {
			color: $color-text-off;
			font-size: 14px;
			word-break: break-word;
		}
	}

	@media (max-width: 640px) {
		.container {
			display: block;
			background-color: $color-bg-white;
			border: 1px solid $color-border-light;
			border-radius: 8px;
			padding: 16px;
			margin: 24px 0;

			&:hover {
				border: 1px solid $color-border;
			}
		}

		.image {
			width: 100%;
		}

		.content {
			flex: 1;
		}

		.title {
			font-size: 14px;
			font-weight: bold;
			margin-bottom: 8px;
		}

		.description {
			color: $color-text-sub;
			font-size: 12px;
		}

		.url {
			color: $color-text-off;
			font-size: 12px;
			word-break: break-word;
		}
	}
</style>