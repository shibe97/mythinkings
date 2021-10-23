<script context="module" lang="ts">
	import { format } from 'date-fns';
	import { utcToZonedTime } from 'date-fns-tz';
  import { isAuthenticated, authToken } from '../../store';
	console.log(authToken);
	export async function load({ page, fetch }) {
		const post = await fetch(`/private/${page.params.slug}.json`, {
			headers: {
				authorization: 'test'
			}
		}).then((r) => r.json());
		// const post = await fetch(`https://shibe97.microcms.io/api/v1/blog/${page.params.slug}`, {
		// 	headers: { "X-API-KEY" : '99a2f198-c8dd-4e34-b37b-ca44b6fd89ad' }
		// })
		// 	.then((res) => res.json())
		// 	.then(async (res) => {
		// 		const utcDate = new Date(res.publishedAt);
		// 		const jstDate = utcToZonedTime(utcDate, 'Asia/Tokyo');
		// 		const jstString = format(jstDate, 'd MMMM, yyyy');
		// 		const body = await Promise.all(
		// 			(res.body || []).map(async (item) => {
		// 				if (item.fieldId === 'linkCard') {
		// 					const ogp = await fetch(item.url)
		// 						.then(res => res.text())
		// 						.then(res => {
		// 							const metas = res.match(/<meta.+?>/g);
		// 							return metas.map(m => {
		// 								const propertyStr = m.match(/property=".+?"/);
		// 								const property = propertyStr && propertyStr[0].trim().replace(/"/g, '').replace('og:', '').split('=')[1];
		// 								const contentStr = m.match(/content=".+?"/);
		// 								const content = contentStr && contentStr[0].trim().replace(/"/g, '').split('=')[1];
		// 								return {
		// 									property, content
		// 								};
		// 							}).filter(m => m.property && m.content).reduce((prev, ogp) => {
		// 								return {
		// 									...prev,
		// 									[ogp.property]: ogp.content
		// 								};
		// 							}, {});
		// 						})
		// 					return {
		// 						...item,
		// 						ogp,
		// 					}
		// 				}
		// 				return item;
		// 			})
		// 		);
		// 		return {
		// 			...res,
		// 			body,
		// 			publishedAt: jstString
		// 		};
		// 	})
		// 	.catch(() => null);
		if (!post) {
			return null;
		}
		//const { contents } = await fetch('/allArticles.json').then((r) => r.json());
		const { contents } = await fetch(`https://shibe97.microcms.io/api/v1/blog/?limit=20&fields=id,ogimage,title,tags,publishedAt`, {
			headers: { "X-API-KEY" : '99a2f198-c8dd-4e34-b37b-ca44b6fd89ad' }
		})
			.then((res) => res.json())
			.then((res) => {
				return {
					...res,
					contents: res.contents.map(content => {
						const utcDate = new Date(content.publishedAt);
						const jstDate = utcToZonedTime(utcDate, 'Asia/Tokyo');
						const jstString = format(jstDate, 'd MMMM, yyyy');
						return {
							...content,
							publishedAt: jstString,
						}
					})
				}
			})
			.catch(() => null);
		const tagIds = post.tags.map(tag => tag.id);
		const relatedArticles = contents.filter((item) => {
			return item.tags.some(tag => tagIds.includes(tag.id)) && item.id !== post.id
		});
		return {
			props: {
				post,
				relatedArticles,
			}
		};
	}
</script>

<script lang="ts">
	import Article from '../../components/Article.svelte';
	import RelatedArticles from '../../components/RelatedArticles.svelte';
	import type { article } from '../../types';
	export let post: article;
	export let relatedArticles: article[];
</script>

<svelte:head>
	<title>{post.title}｜柴田 和祈</title>
	<meta name="description" content={post.description} />
	<meta property="og:url" content={`https://www.mythinkings.net/${post.id}`} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={`${post.title}｜柴田 和祈`} />
  <meta property="og:description" content={post.description} />
  <meta property="og:site_name" content="mythinkings." />
	<meta property="og:image" content={post.ogimage && post.ogimage.url} />
	<meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@shibe97" />
	<link rel="canonical" href={`https://www.mythinkings.net/${post.id}`}>
</svelte:head>

{#if $isAuthenticated === true}
<Article post={post} />
<RelatedArticles articles={relatedArticles} />
{:else}
<div>
	ログインすれば読むことができます
</div>
{/if}