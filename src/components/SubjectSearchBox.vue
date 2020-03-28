<template>
	<input
		@keyup.enter="discussSubject"
		class="SubjectSearchBox"
		v-model="query"
	/>
</template>

<script>
const MINIMUM_SUBJECT_LENGTH = 4

export default {
	name: 'SubjectSearchBox',
	data: () => ({
		query: ''
	}),
	methods: {
		discussSubject() {
			if (this.query.length < MINIMUM_SUBJECT_LENGTH) return

			this.$router.push({
				path: '/discuss',
				query: { subject: encodeURIComponent(this.query) }
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/theme.scss';

.SubjectSearchBox {
	border: 2px solid $primary-color;
	border-radius: 4px;

	min-height: 72px;

	padding: 1em;
}
</style>
