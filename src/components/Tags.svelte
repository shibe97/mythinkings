<script lang="ts">
	import { TagIcon } from 'svelte-feather-icons'
	import type { tag } from '../types';
	export let tags: tag[];
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
  
  .tags {
    margin-left: 10px;
    display: flex;
    align-items: center;
  }

  .tag {
		white-space: nowrap;

    &::after {
      content: ',';
      margin-right: 10px;
    }
    &:last-child::after {
      content: '';
      margin-right: 0;
    }
  }
</style>

<div class="container">
	{#if tags.length > 0}
		<TagIcon size="24" class="icon" />
		<ul class="tags">
			{#each tags as tag}
				<li class="tag">{tag.name}</li>
			{/each}
		</ul>
	{/if}
</div>