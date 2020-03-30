<template>
	<span @click="discussSubject" class="TagCloudWord" :style="wordStyle">
		{{ subject.body }}
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
			let size = this.subject.frequency / this.maxFrequency
			size = 30 * size

			style['font-size'] = `${size}pt`

			if (this.maxFrequency === this.subject.frequency)
				style['font-weight'] = 'bold'

			return style
		}
	},
	methods: {
		discussSubject() {
			this.$router.push({
				path: '/discuss',
				query: { subject: encodeURIComponent(this.subject.body) }
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
