<template>
	<div class="TagCloud">
		<TagCloudWord
			v-for="subject in subjects"
			class="item"
			:key="subject.value"
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
	display: grid;

	grid-template-columns: auto auto auto auto auto;
	grid-row-gap: 4em;

	color: $primary-color;
}
</style>
