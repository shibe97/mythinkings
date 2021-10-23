<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { format } from 'date-fns';
	import { utcToZonedTime } from 'date-fns-tz';
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

	type Params = {
		slug?: string;
		draftKey?: string;
	}

	const getParams = () => {
		const qs = location.search && location.search.substring(1);
		const params: Params = qs.split('&').reduce((prev, set) => {
			const [key, value] = set.split('=');
			return {
				...prev,
				[key]: value
			};
		}, {});
		return params;
	}
	async function load() {
		const { slug, draftKey } = getParams();
    const response = await fetch(`https://shibe97.microcms.io/api/v1/blog/${slug}?draftKey=${draftKey}`, {
    	headers: { "X-MICROCMS-API-KEY" : import.meta.env.VITE_API_KEY }
    })
			.then(res => res.json())
			.then(async (res) => {
				const utcDate = new Date(res.updatedAt);
				const jstDate = utcToZonedTime(utcDate, 'Asia/Tokyo');
				const jstString = format(jstDate, 'd MMMM, yyyy');
				const body = await Promise.all(
					(res.body || []).map(async (item) => {
						if (item.fieldId === 'linkCard') {
							const ogp = await fetch(item.url)
								.then(res => res.text())
								.then(res => {
									const metas = res.match(/<meta.+?>/g);
									return metas.map(m => {
										const propertyStr = m.match(/property=".+?"/);
										const property = propertyStr && propertyStr[0].trim().replace(/"/g, '').replace('og:', '').split('=')[1];
										const contentStr = m.match(/content=".+?"/);
										const content = contentStr && contentStr[0].trim().replace(/"/g, '').split('=')[1];
										return {
											property, content
										};
									}).filter(m => m.property && m.content).reduce((prev, ogp) => {
										return {
											...prev,
											[ogp.property]: ogp.content
										};
									}, {});
								})
							return {
								...item,
								ogp,
							}
						}
						return item;
					})
				);
				return {
					...res,
					body,
					publishedAt: jstString
				};
			})
			.catch(() => null);

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