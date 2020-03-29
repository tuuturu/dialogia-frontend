<template>
	<div class="ChatWindow">
		<ul>
			<li
				v-for="event in messageEvents"
				:key="event.message"
				:class="{ local: isLocalEvent(event) }"
			>
				<IconUser :alt="event.from" v-if="!isLocalEvent(event)" />
				<p>{{ event.message }}</p>
				<IconUser :alt="event.from" v-if="isLocalEvent(event)" />
			</li>
		</ul>
	</div>
</template>

<script>
import IconUser from '@/components/icons/IconUser'

export default {
	name: 'ChatWindow',
	props: {
		messageEvents: Array
	},
	components: {
		IconUser
	},
	methods: {
		isLocalEvent(event) {
			return event.from === 'me'
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/theme.scss';

.ChatWindow {
	border: 2px solid $primary-color;
	border-radius: 4px;

	display: flex;
	align-items: flex-end;

	overflow-x: scroll;

	padding: 0.5em;
}

ul {
	list-style: none;

	padding: 0;
	margin: 0;

	width: 100%;
}

li {
	display: flex;
}
.local {
	justify-content: flex-end;
}

.IconUser {
	width: 78px;
	height: 78px;

	color: $primary-color;
}
</style>
