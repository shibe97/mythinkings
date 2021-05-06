<script lang="ts">
	import Meta from '../components/Meta.svelte';
	import RichText from '../components/RichText.svelte';
	import TextWithRightImage from '../components/TextWithRightImage.svelte';
	import Book from '../components/Book.svelte';
	import Author from '../components/Author.svelte';
	import type { article } from '../types';
	export let post: article;
</script>

<style lang="scss">
	@import '../../styles/variables.scss';
	.title {
		font-size: 2.4em;
		font-weight: bold;
		line-height: 1.8;
		padding-bottom: 10px;
	}

	.ogimage {
		margin: 40px -40px;

		img {
			width: 100%;
		}
	}

	.share {
		display: flex;
		align-items: center;
		margin-top: 60px;
		:global(svg) {
			stroke: $color-accent;
		}
	}

	.shareTitle {
		margin-right: 24px;
		font-size: 14px;
		font-weight: bold;
	}

	.shareLists {
		display: flex;
		align-items: center;
	}

	.shareList {
		margin-right: 24px;
	}

	.shareLink {
		display: flex;
		align-items: center;
	}

	.shareIcon {
		max-width: 24px;
		max-height: 24px;
	}

	.books {
		margin-top: 60px;
	}

	@media (max-width: 640px) {
		.title {
			font-size: 2em;
			line-height: 1.8;
		}
		.ogimage {
			margin: 40px -24px;
		}
	}
</style>

<h1 class="title">{post.title}</h1>

<Meta post={post} />

{#if post.ogimage !== null && post.ogimage !== undefined}
	<div class="ogimage">
		<picture>
			<source
				type="image/webp"
				media="(max-width: 640px)"
				srcset={`${post.ogimage.url}?fm=webp&w=414 1x, ${post.ogimage.url}?fm=webp&w=414&dpr=2 2x`}
			/>
			<source
				type="image/webp"
				srcset={`${post.ogimage.url}?fm=webp&fit=crop&w=800&h=420 1x, ${post.ogimage.url}?fm=webp&fit=crop&w=800&h=420&dpr=2 2x`}
			/>
			<img src={post.ogimage.url} alt="" />
		</picture>
	</div>
{/if}

{#if post.body !== null && post.body !== undefined}
	{#each post.body as item}
		{#if item.fieldId === 'richText'}
			<RichText richText={item.richText} />
		{/if}
		{#if item.fieldId === 'textWithRightImage'}
			<TextWithRightImage richText={item.text} image={item.image} caption={item.caption} />
		{/if}
	{/each}
{/if}

{#if post.books !== null && post.books !== undefined}
	<div class="books">
		{#each post.books as book}
			<Book book={book} />
		{/each}
	</div>
{/if}

<dl class="share">
	<dt class="shareTitle">Share</dt>
	<dd>
		<ul class="shareLists">
			<li class="shareList">
				<a class="shareLink" href={`https://twitter.com/intent/tweet?text=${post.title}｜柴田 和祈&url=https://www.mythinkings.net/${post.id}/`} target="twitter">
					<img class="shareIcon" src="/icon_twitter.svg" alt="Twitter" />
				</a>
			</li>
			<li class="shareList">
				<a class="shareLink" href={`https://b.hatena.ne.jp/entry/https://www.mythinkings.net/${post.id}/`} target="hatena">
					<img class="shareIcon" src="/icon_hatena.svg" alt="はてなブックマーク" />
				</a>
			</li>
			<li class="shareList">
				<a class="shareLink" href={`https://www.facebook.com/sharer/sharer.php?u=https://www.mythinkings.net/${post.id}/`} target="facebook">
					<img class="shareIcon" src="/icon_facebook.svg" alt="Facebook" />
				</a>
			</li>
		</ul>
	</dd>
</dl>

{#if post.author !== null && post.author !== undefined}
	<Author author={post.author} />
{/if}