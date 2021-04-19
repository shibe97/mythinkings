<script lang="ts">
	import { onMount } from 'svelte';
	import queryString from 'query-string';
	import Article from '../components/Article.svelte';
	import type { article } from '../types';

	export let post: article = {
		id: '',
		title: '',
		description: '',
		tags: [],
		ogimage: null,
		body: [],
		books: [],
		author: null,
	};
	async function load() {
		const { slug, draftKey } = queryString.parse(location.search);
    const response = await fetch(`https://shibe97.microcms.io/api/v1/blog/${slug}?draftKey=${draftKey}`, {
      headers: { "X-API-KEY" : '99a2f198-c8dd-4e34-b37b-ca44b6fd89ad' }
    })
			.then(res => res.json())

    post = response || {};
	}
	
  onMount(() => {
    load();
  })
</script>

<svelte:head>
	<title>下書き｜{post.title}｜mythinkings.</title>
	<meta name=”robots” content=”noindex”>
</svelte:head>

<Article post={post} />