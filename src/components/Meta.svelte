<script lang="ts">
	import PublishedAt from './PublishedAt.svelte';
	import Tags from './Tags.svelte';
	import type { article } from '../types';
	export let post: article;
</script>

<style lang="scss">
	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
</style>

<div class="meta">
	<PublishedAt publishedAt={post.publishedAt} />
	{#if post.tags.length > 0}
		<Tags tags={post.tags} />
	{/if}
</div>