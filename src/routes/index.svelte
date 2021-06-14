<script context="module" lang="ts">
	export const prerender = true;
	export async function load({ fetch }) {
		const res = await fetch('/index.json').then((r) => r.json());

		return {
			props: {
				contents: res.contents,
				totalCount: res.totalCount
			}
		};
	}
</script>

<script lang="ts">
	import Meta from '../components/Meta.svelte';
	import Pagination from '../components/Pagination.svelte';
	import type { article } from '../types';
	import { LIMIT } from '../constants';
	export let contents: article[];
	export let totalCount: number;
	export let pages = Array.from({ length: Math.ceil(totalCount / LIMIT)}).map((_, i) => i + 1);
	export let firstContent = contents[0];
</script>

<svelte:head>
	<title>mythinkings.</title>
	<meta name="description" content="会社と自己を成長させるための思考メモ" />
	<meta property="og:url" content="https://www.mythinkings.net" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="mythinkings." />
  <meta property="og:description" content="会社と自己を成長させるための思考メモ" />
  <meta property="og:site_name" content="mythinkings." />
	<meta property="og:image" content="https://www.mythinkings.net/ogp.png" />
	<meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@shibe97" />
	<link rel="canonical" href="https://www.mythinkings.net" />
</svelte:head>

<div>
	<a sveltekit:prefetch href={`${firstContent.id}`} class="ogimage">
		<picture>
			<source
				type="image/webp"
				media="(max-width: 640px)"
				srcset={`${firstContent.ogimage.url}?fm=webp&w=414 1x, ${firstContent.ogimage.url}?fm=webp&w=414&dpr=2 2x`}
			/>
			<source
				type="image/webp"
				srcset={`${firstContent.ogimage.url}?fm=webp&fit=crop&w=800&h=420 1x, ${firstContent.ogimage.url}?fm=webp&fit=crop&w=800&h=420&dpr=2 2x`}
			/>
			<img src={firstContent.ogimage.url} alt="" />
		</picture>
	</a>
	<div class="firstContent">
		<a href={`${firstContent.id}`} class="firstTitle">
			{firstContent.title}
		</a>
		<Meta post={firstContent} />
		<p class="description">{firstContent.description}</p>
	</div>
</div>

<ul>
	{#each contents.filter((_, i) => i > 0) as post}
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

<Pagination pages={pages} current={1} />

<style lang="scss">
	@import '../../styles/variables.scss';
	.ogimage {
		display: block;
		margin: 0 -40px 40px;
		&:hover {
			opacity: 0.8;
		}

		img {
			width: 100%;
		}
	}
	.firstTitle {
		display: block;
		padding-bottom: 4px;
		line-height: 1.8;
		font-size: 2em;
		font-weight: bold;
		&:hover {
			text-decoration: underline;
		}
	}
	.firstContent {
		margin: 0 -40px;
		border-bottom: 1px solid #ccc;
	}
	.description {
		font-size: 14px;
		margin: 20px 0 60px;
		color: $color-text-sub;
	}
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
		&:hover {
			opacity: 0.8;
		}
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
		line-height: 1.8;
		&:hover {
			text-decoration: underline;
		}
	}
	@media (max-width: 640px) {
		.ogimage {
			display: block;
			margin: 0 0 16px;

			img {
				width: 100%;
			}
		}
		.firstTitle {
			display: block;
			padding-bottom: 16px;
			line-height: 1.6;
			font-size: 2em;
			font-weight: bold;
		}
		.firstContent {
			margin: 0;
			border-bottom: 1px solid #ccc;
		}
		.description {
			font-size: 14px;
			margin: 20px 0 40px;
			color: $color-text-sub;
		}
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