<script context="module" lang="ts">
	export async function load({ page, fetch }) {
		const res = await fetch(`/${page.params.slug}.json`).then((r) => r.json());

		return {
			props: {
				post: res
			}
		};
	}
</script>

<script lang="ts">
	import Article from '../components/Article.svelte';
	import type { article } from '../types';
	export let post: article;
</script>

<svelte:head>
	<title>{post.title}｜柴田 和祈</title>
	<meta name="description" content={post.description} />
	<meta property="og:url" content={`https://www.mythinkings.net/${post.id}/`} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={`${post.title}｜柴田 和祈`} />
  <meta property="og:description" content={post.description} />
  <meta property="og:site_name" content="mythinkings." />
	<meta property="og:image" content={post.ogimage && post.ogimage.url} />
	<meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@shibe97" />
	<link rel="canonical" href={`https://www.mythinkings.net/${post.id}/`}>
</svelte:head>

<Article post={post} />