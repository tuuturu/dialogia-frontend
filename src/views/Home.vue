<template>
	<div class="Home">
		<div class="container">
			<SubjectSearchBox placeholder="What do you want to talk about?" />

			<TagCloud :subjects="popularSubjects" />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

import SubjectSearchBox from '@/components/SubjectSearchBox'
import TagCloud from '@/components/TagCloud'

export default {
	name: 'Home',
	components: {
		SubjectSearchBox,
		TagCloud
	},
	computed: {
		...mapState(['popularSubjects'])
	},
	async created() {
		await this.$store.dispatch('refreshPopularSubjects')
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

	@media only screen and (max-width: 600px) {
		align-items: flex-start;
	}
}

.container {
	width: 50%;
	display: flex;
	flex-direction: column;

	align-items: center;

	@media only screen and (max-width: 600px) {
		width: 100%;
		padding: 1em 0.5em 0.5em 0.5em;
	}
}

.SubjectSearchBox {
	width: 75%;

	@media only screen and (max-width: 600px) {
		width: 100%;
	}
}

.TagCloud {
	width: 100%;

	margin-top: 4em;

	@media only screen and (max-width: 600px) {
		margin-top: 2em;
	}
}
</style>
