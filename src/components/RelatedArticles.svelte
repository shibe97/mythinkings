<script lang="ts">
	import Tags from './Tags.svelte';
	import type { article } from '../types';
	export let articles: article[];
</script>

<style lang="scss">
	@import '../../styles/variables.scss';
	.container {
		width: 100vw;
		margin-left: calc(360px - 50vw);
		background-color: $color-bg-sub;
		padding: 48px;
		box-sizing: border-box;
		overflow: auto;
	}
	.label {
		font-weight: bold;
		padding-bottom: 16px;
	}
	.lists {
		display: flex;
	}
	.list {
		width: 240px;
		padding-right: 48px;
	}
	.title {
		display: flex;
		font-weight: bold;
		font-size: 18px;
		line-height: 1.8;
		padding: 8px 0;
	}
	.image {
		width: 240px;
	}

	@media (max-width: 800px) {
		.container {
			width: 100vw;
			margin-left: -24px;
			background-color: $color-bg-sub;
			padding: 24px;
			box-sizing: border-box;
			overflow: auto;
		}
		.lists {
			display: block;
		}
		.list {
			width: 100%;
			padding-bottom: 24px;
		}
		.image {
			width: 100%;
		}
	}
</style>

{#if articles.length > 0}
<section class="container">
	<h3 class="label">Recommended</h3>
	<ul class="lists">
		{#each articles as post}
			<li class="list">
				<a sveltekit:prefetch href={`${post.id}`} class="imageLink">
					<picture>
						<source
							type="image/webp"
							media="(max-width: 640px)"
							srcset={`${post.ogimage.url}?fm=webp&w=414 1x, ${post.ogimage.url}?fm=webp&w=414&dpr=2 2x`}
						/>
						<source
							type="image/webp"
							srcset={`${post.ogimage.url}?fm=webp&fit=crop&w=400&h=210 1x, ${post.ogimage.url}?fm=webp&fit=crop&w=800&h=420&dpr=2 2x`}
						/>
						<img src={post.ogimage.url} alt="" class="image" />
					</picture>
				</a>
				<div class="content">
					<a href={`${post.id}`} class="title">
						{post.title}
					</a>
					{#if post.tags.length > 0}
						<Tags tags={post.tags} />
					{/if}
				</div>
			</li>
		{/each}
	</ul>
</section>
{/if}