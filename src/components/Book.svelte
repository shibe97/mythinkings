<script lang="ts">
	import type { book } from '../types';
	export let book: book;
</script>

<style lang="scss">
	@import '../../styles/variables.scss';

	@media (min-width: 641px) {
		.container {
			display: flex;
			background-color: $color-bg-white;
			border-radius: 8px;
			padding: 32px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
			margin: 20px -32px 0;
		}

		.image {
			height: 144px;
			margin-right: 24px;
		}

		.title {
			font-size: 18px;
			font-weight: bold;
			margin-bottom: 8px;
		}

		.author {
			color: $color-text-sub;
		}
	}

	@media (max-width: 640px) {
		.container {
			display: flex;
			background-color: $color-bg-white;
			border-radius: 8px;
			padding: 16px;
			box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
			margin-top: 20px;
		}

		.image {
			height: 108px;
			margin-right: 16px;
		}

		.title {
			font-size: 14px;
			font-weight: bold;
			margin-bottom: 8px;
		}

		.author {
			color: $color-text-sub;
			font-size: 12px;
		}
	}
</style>

<a href={book.url} class="container" target="_blank" rel="noopener noreferrer">
	<img src={book.image && book.image.url} alt="" class="image" />
	<dl>
		<dt class="title">{book.title}</dt>
		<dd class="author">著: {book.author}</dd>
	</dl>
</a>