<script lang="ts">
	import { InfoIcon } from 'svelte-feather-icons'
	export let type;
	export let text;
</script>

{#if type !== undefined && text !== undefined}
<div class="container">
	<InfoIcon size="24" class="icon" />
	<p class="text">{text}</p>
</div>
{/if}

<style lang="scss">
	@import '../../styles/variables.scss';

	@media (min-width: 641px) {
		.container {
			display: flex;
			align-items: flex-start;
			background-color: $color-bg-sub;
			border-radius: 8px;
			padding: 24px;
			margin: 24px 0;

			:global(svg) {
				stroke: $color-accent;
				margin-top: 4px;
				margin-right: 16px;
			}
		}

		.text {
			flex: 1;
		}
	}

	@media (max-width: 640px) {
		.container {
			display: flex;
			align-items: flex-start;
			background-color: $color-bg-sub;
			border-radius: 8px;
			padding: 16px;
			margin: 24px 0;

			:global(svg) {
				stroke: $color-accent;
				margin-top: 4px;
				margin-right: 8px;
			}
		}

		.text {
			flex: 1;
		}
	}
</style>