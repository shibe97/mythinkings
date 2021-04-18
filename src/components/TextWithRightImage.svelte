<script lang="ts">
	import RichText from './RichText.svelte';
	import type { image } from '../types';
	export let richText: HTMLElement;
	export let image: image;
	export let caption: string;
</script>

<style lang="scss">
	@import '../../styles/variables.scss';

	@media (min-width: 641px) {
		.container {
			margin-top: 40px;

			&::after {
				content: '';
				display: block;
				clear: both;
			}
		}

		.figure {
			float: right;
			width: calc(50% + 80px);
			margin-left: 40px;
			margin-bottom: 40px;
			margin-right: -120px;
		}

		.image {
			width: 100%;
		}

		.caption {
			color: $color-text-sub;
			font-size: 14px;
		}
	}

	@media (max-width: 640px) {
		.figure {
			width: 100%;
			margin: 40px 0;
		}

		.image {
			width: 100%;
		}

		.caption {
			color: $color-text-sub;
			font-size: 14px;
		}
	}
</style>

<div class="container">
	<figure class="figure">
		<img src={image && image.url} alt="" class="image" />
		{#if caption}
			<figcaption class="caption">{caption}</figcaption>
		{/if}
	</figure>
	<RichText richText={richText} />
</div>