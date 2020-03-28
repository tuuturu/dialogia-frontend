<template>
	<div class="Chat">
		<ChatWindow :message-events="message_events" />
		<textarea
			aria-label="message input"
			class="input-box"
			v-model="inputBuffer"
			@keyup.enter="sendMessage"
		/>
	</div>
</template>

<script>
import ChatWindow from '@/components/ChatWindow'
import { mockMessageEvents } from '@/store/mockData'

export default {
	name: 'Discuss',
	components: {
		ChatWindow
	},
	data: () => ({
		subject: '',
		inputBuffer: '',
		message_events: mockMessageEvents
	}),
	methods: {
		sendMessage() {
			const pkg = {
				message: this.inputBuffer + ''
			}

			this.inputBuffer = ''

			console.log(`Sending msg: ${pkg.message}`)
		}
	},
	mounted() {
		document.title = sanitize(this.$route.query.subject)
	}
}

function sanitize(text) {
	console.log('sanitize')
	return decodeURIComponent(text)
}
</script>

<style lang="scss" scoped>
@import '~@/assets/theme.scss';

.Chat {
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.ChatWindow {
	height: 50%;
	width: 50%;

	margin-bottom: 1em;
}

.input-box {
	height: 72px;
	width: 50%;

	padding: 1em;

	border: 2px solid $primary-color;

	resize: none;
}
</style>
