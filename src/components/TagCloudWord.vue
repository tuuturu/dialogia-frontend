<template>
	<span @click="discussSubject" class="TagCloudWord" :style="wordStyle">
		{{ subject.value }}
	</span>
</template>

<script>
export default {
	name: 'TagCloudWord',
	props: {
		subject: Object,
		maxFrequency: Number
	},
	computed: {
		wordStyle() {
			const style = {}
			const size = this.subject.frequency / this.maxFrequency

			style['font-size'] = `${Math.pow(2 + size, 2) + 12}pt`

			if (this.maxFrequency === this.subject.frequency)
				style['font-weight'] = 'bold'

			return style
		}
	},
	methods: {
		discussSubject() {
			this.$router.push({
				path: '/discuss',
				query: { subject: encodeURIComponent(this.subject.value) }
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/theme.scss';

.TagCloudWord:hover {
	cursor: pointer;
	outline: 2px solid $primary-color;
}
</style>
