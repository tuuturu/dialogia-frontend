<template>
	<div class="Home">
		<div class="container">
			<SubjectSearchBox placeholder="What do you want to talk about?" />

			<TagList v-if="isMobile" :subjects="popularSubjects" />
			<TagCloud v-else :subjects="popularSubjects" />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

import SubjectSearchBox from '@/components/SubjectSearchBox'
import TagCloud from '@/components/TagCloud'
import TagList from '@/components/TagList'

export default {
	name: 'Home',
	components: {
		TagList,
		SubjectSearchBox,
		TagCloud
	},
	computed: {
		...mapState(['popularSubjects'])
	},
	async created() {
		await this.$store.dispatch('refreshPopularSubjects')
	},
	methods: {
		isMobile() {
			return true
		}
	}
}
</script>

<style lang="scss" scoped>
.Home {
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
}

.container {
	width: 50%;

	@media only screen and (max-width: 600px) {
		width: 100%;
		padding: 1em 0.5em 0.5em 0.5em;
	}
}

.TagCloud {
	width: 100%;

	margin-top: 4em;
}

.TagList {
	margin-top: 2em;
}
</style>
