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
}

.container {
	width: 50%;
}

.SubjectSearchBox {
	width: 75%;

	margin-bottom: 5em;
}

.TagCloud {
	width: 100%;
}
</style>
