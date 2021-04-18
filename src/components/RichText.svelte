<script lang="ts">
	export let richText: HTMLElement;
</script>

<style lang="scss">
	@import '../../styles/variables.scss';
	.content :global(h1) {
		font-size: 1.8em;
		font-weight: bold;
		margin: 64px 0 32px;
	}

	.content :global(h2) {
		font-size: 1.4em;
		font-weight: bold;
		margin: 56px 0 28px;
	}

	.content :global(h3) {
		font-size: 1.2em;
		font-weight: bold;
		margin: 48px 0 24px;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
    margin-top: 20px;
	}

	.content :global(li) {
		display: flex;
		margin-bottom: 10px;

		&::before {
			content: '';
			flex-shrink: 0;
			width: 8px;
			height: 8px;
			margin-top: 10px;
			margin-right: 8px;
			background: url('/icon_list.svg') no-repeat left top;
		}
	}

	.content :global(a) {
		color: $color-link;
		text-decoration: underline;
	}

	.content :global(img) {
		width: 100%;
	}

	.content :global(strong) {
		font-weight: bold;
	}

	.content :global(blockquote) {
		border-left: 4px solid $color-border;
		padding-left: 16px;
		color: $color-text-hint;
		font-style: italic;
		margin-top: 24px;
	}
</style>

<div class="content">
	{@html richText}
</div>