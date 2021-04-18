<script lang="ts">
	import { CalendarIcon } from 'svelte-feather-icons'
	export let publishedAt: Date;
</script>

<style lang="scss">
	@import '../../styles/variables.scss';
	.container {
		display: flex;
		align-items: center;
		font-size: 16px;
		font-weight: normal;
		margin-bottom: 8px;

		:global(svg) {
			stroke: $color-accent;
		}
	}

	.time {
		white-space: nowrap;
    margin-left: 10px;
    margin-right: 30px;
  }
</style>

<div class="container">
	<CalendarIcon size="24" class="icon" />
	<time
		class="time"
	>
		{publishedAt}
	</time>
</div>