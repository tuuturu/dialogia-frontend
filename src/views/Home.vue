<template>
	<div class="Home">
		<SubjectSearchBox placeholder="What do you want to talk about?" />
	</div>
</template>

<script>
import SubjectSearchBox from '@/components/SubjectSearchBox'

export default {
	name: 'Home',
	components: {
		SubjectSearchBox
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

.SubjectSearchBox {
	width: 25%;
}
</style>
