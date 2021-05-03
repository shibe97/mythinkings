<script context="module" lang="ts">
	export const prerender = true;
	export async function load({ fetch }) {
		const res = await fetch('/index.json').then((r) => r.json());

		return {
			props: {
				contents: res.contents
			}
		};
	}
</script>

<script lang="ts">
	import Meta from '../components/Meta.svelte';
	import type { article } from '../types';
	export let contents: article[];
</script>

<style lang="scss">
	.list {
		display: flex;
		border-bottom: 1px solid #ccc;
		padding: 40px 0 32px;
		font-size: 20px;
		font-weight: bold;
	}
	.imageLink {
		display: block;
		width: 200px;
		height: 105px;
		margin-right: 40px;
	}
	.image {
		width: 200px;
		height: 105px;
	}
	.content {
		flex: 1;
	}
	.title {
		display: block;
		padding-bottom: 4px;
	}
	@media (max-width: 640px) {
		.list {
			display: block;
		}
		.imageLink {
			display: block;
			width: 100%;
			height: auto;
			margin-right: 0;
			margin-bottom: 4px;
		}
		.image {
			width: 100%;
			height: auto;
		}
	}
</style>

<svelte:head>
	<title>mythinkings.</title>
	<meta name="description" content="会社と自己を成長させるための思考メモ" />
	<meta property="og:url" content="https://www.mythinkings.net/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="mythinkings." />
  <meta property="og:description" content="会社と自己を成長させるための思考メモ" />
  <meta property="og:site_name" content="mythinkings." />
	<meta property="og:image" content="https://www.mythinkings.net/ogp.png" />
	<meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@shibe97" />
	<link rel="canonical" href="https://www.mythinkings.net/" />
</svelte:head>

<ul>
	{#each contents as post}
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
						srcset={`${post.ogimage.url}?fm=webp&fit=crop&w=200&h=105 1x, ${post.ogimage.url}?fm=webp&fit=crop&w=200&h=105&dpr=2 2x`}
					/>
					<img src={post.ogimage.url} alt="" class="image" />
				</picture>
			</a>
			<div class="content">
				<a href={`${post.id}`} class="title">
					{post.title}
				</a>
				<Meta post={post} />
			</div>
		</li>
	{/each}
</ul>
