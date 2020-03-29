<template>
	<div class="ChatWindow" :class="{ connected: ready }">
		<ul>
			<li
				v-for="event in messageEvents"
				:key="event.id"
				:class="{ local: isLocalEvent(event), system: isSystemEvent(event) }"
			>
				<IconUser
					:alt="event.from"
					v-if="!isSystemEvent(event) && !isLocalEvent(event)"
				/>
				<p>{{ event.message }}</p>
				<IconUser
					class="local-icon"
					:alt="event.from"
					v-if="!isSystemEvent(event) && isLocalEvent(event)"
				/>
			</li>
		</ul>
	</div>
</template>

<script>
import IconUser from '@/components/icons/IconUser'

export default {
	name: 'ChatWindow',
	props: {
		localId: String,
		messageEvents: Array,
		ready: Boolean
	},
	components: {
		IconUser
	},
	methods: {
		isLocalEvent(event) {
			return this.localId === event.from
		},
		isSystemEvent(event) {
			return event.from === 'system'
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/theme.scss';

.ChatWindow {
	border: 2px solid grey;
	border-radius: 4px;

	display: flex;
	align-items: flex-end;

	overflow-x: scroll;

	padding: 0.5em;
}
.connected {
	border: 2px solid $primary-color;

	@media only screen and (max-width: 600px) {
		border: 0;
		border-radius: 0;
		border-bottom: 2px solid $primary-color;
	}
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
.system {
	justify-content: center;
}

.IconUser {
	width: 78px;
	height: 78px;

	color: $primary-color;
}
.local-icon {
	color: #558564;
}
</style>
