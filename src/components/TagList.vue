<template>
	<div class="TagList">
		<h2>Popular subjects</h2>
		<div class="subject-container">
			<span
				v-for="subject in sortedSubjects"
				:key="subject.value"
				@click="clickHandler(subject.value)"
			>
				<span style="color: black">"</span>{{ subject.value
				}}<span style="color: black">"</span>
			</span>
		</div>
	</div>
</template>

<script>
function byFrequency(s1, s2) {
	if (s1.frequency < s2.frequency) return 1
	if (s1.frequency > s2.frequency) return -1

	return 0
}

export default {
	name: 'TagList',
	props: {
		subjects: Array
	},
	computed: {
		sortedSubjects() {
			return [...this.subjects].sort(byFrequency)
		}
	},
	methods: {
		clickHandler(subject) {
			this.$router.push({
				path: '/discuss',
				query: { subject: encodeURIComponent(subject) }
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/theme.scss';

.TagList {
	height: 100%;
}

.subject-container {
	display: grid;
	grid-template-columns: auto auto;
	grid-column-gap: 1em;
	grid-row-gap: 2em;

	color: $primary-color;
}

h2 {
	margin: 0;
}
</style>
