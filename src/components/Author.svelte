<script lang="ts">
	import type { author } from '../types';
	export let author: author;
</script>

<style lang="scss">
	@import '../../styles/variables.scss';

	@media (min-width: 641px) {
		.container {
			display: flex;
			margin-top: 60px;
			border-top: 1px solid $color-text-sub;
			padding: 40px 0;
		}

		.image {
			width: 96px;
			height: 96px;
			margin-right: 40px;
			border-radius: 48px;
		}

		.name {
			display: flex;
			align-items: center;
			font-weight: bold;

			span {
				margin-right: 8px;
			}
		}

		.link {
			display: flex;
			width: 16px;
			height: 16px;
			margin-left: 8px; 
		}

		.icon {
			width: 16px;
			height: 16px;
		}

		.profile {
			font-size: 14px;
			color: $color-text-sub;
			margin-top: 10px;
		}
	}

	@media (max-width: 640px) {
		.container {
			display: flex;
			margin-top: 60px;
			border-top: 1px solid $color-text-sub;
			padding: 24px 0;
		}

		.image {
			width: 48px;
			height: 48px;
			margin-right: 24px;
			border-radius: 24px;
		}

		.name {
			display: flex;
			align-items: center;
			font-weight: bold;

			span {
				margin-right: 8px;
			}
		}

		.link {
			display: flex;
			width: 16px;
			height: 16px;
			margin-left: 8px; 
		}

		.icon {
			width: 16px;
			height: 16px;
		}

		.profile {
			font-size: 12px;
			color: $color-text-sub;
			margin-top: 8px;
		}
	}
</style>

<div class="container">
	<img src={author.image && author.image.url} alt="" class="image" />
	<dl>
		<dt class="name">
			<span>{author.name}</span>
			{#if author.twitter !== null}
				<a class="link" href={`https://twitter.com/${author.twitter}`} target="twitter">
					<img class="icon" src="/icon_twitter.svg" alt="Twitter" />
				</a>
			{/if}
			{#if author.github !== null}
				<a class="link" href={`https://github.com/${author.github}`} target="github">
					<img class="icon" src="/icon_github.png" alt="GitHub" />
				</a>
			{/if}
		</dt>
		<dd class="profile">{author.profile}</dd>
	</dl>
</div>