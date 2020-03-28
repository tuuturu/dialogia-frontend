<template>
	<label>
		<datalist ref="searchData" id="searchData">
			<option
				v-for="option in options"
				:key="option.value"
				:value="option.value"
			></option>
		</datalist>
		<input
			class="SubjectSearchBox"
			type="search"
			list="searchData"
			@keyup.enter="discussSubject"
			@input="refreshOptions"
			v-model="query"
			v-bind="$attrs"
			v-on:="$listeners"
		/>
	</label>
</template>

<script>
const MINIMUM_SUBJECT_LENGTH = 4
const SEARCH_DELAY = 100

function byFrequency(s1, s2) {
	return s1.frequency + s2.frequency
}

export default {
	name: 'SubjectSearchBox',
	data: () => ({
		searchTimeout: null,
		options: [],
		query: ''
	}),
	methods: {
		discussSubject() {
			if (this.query.length < MINIMUM_SUBJECT_LENGTH) return

			this.$router.push({
				path: '/discuss',
				query: { subject: encodeURIComponent(this.query) }
			})
		},
		async refreshOptions() {
			if (this.searchTimeout) clearTimeout(this.searchTimeout)

			this.searchTimeout = setTimeout(async () => {
				const options = await this.$store.dispatch('searchForSubjects', {
					query: this.query
				})

				this.options = options.sort(byFrequency)
			}, SEARCH_DELAY)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/theme.scss';

.SubjectSearchBox {
	width: 75%;

	border: 2px solid $primary-color;
	border-radius: 4px;

	min-height: 72px;

	padding: 1em;
}
</style>
