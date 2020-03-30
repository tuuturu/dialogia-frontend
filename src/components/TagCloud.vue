<template>
	<div class="TagCloud">
		<TagCloudWord
			v-for="subject in subjects"
			class="item"
			:key="subject.body"
			:subject="subject"
			:max-frequency="maxFrequency"
		/>
	</div>
</template>

<script>
import TagCloudWord from '@/components/TagCloudWord'

export default {
	name: 'TagCloud',
	props: {
		subjects: {
			type: Array
		}
	},
	components: {
		TagCloudWord
	},
	computed: {
		maxFrequency() {
			const frequencies = this.subjects.map(item => item.frequency)

			return Math.max(...frequencies)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/theme.scss';

.TagCloud {
	max-width: 1200px;
	margin: 3rem auto;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-row-gap: 2em;

	@media only screen and (max-width: 600px) {
		grid-row-gap: 0;
	}

	@media screen and(min-width: 1000px) {
		grid-template-columns: repeat(5, 1fr);
	}

	:nth-child(3n-2) {
		grid-column: 1;
	}
	:nth-child(3n-1) {
		grid-column: 3;
	}
	:nth-child(3n) {
		grid-column: 2;
	}
	@media screen and (min-width: 1000px) {
		:nth-child(5n-4) {
			grid-column: 1;
		}
		:nth-child(5n-3) {
			grid-column: 3;
		}
		:nth-child(5n-2) {
			grid-column: 5;
		}
		:nth-child(5n-1) {
			grid-column: 2;
		}
		:nth-child(5n) {
			grid-column: 4;
		}
	}
}
.TagCloudWord {
	color: $primary-color;
}
</style>
