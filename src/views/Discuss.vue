<template>
	<div class="Chat">
		<ChatWindow
			:message-events="message_events"
			:local-id="client.id"
			:ready="hasPartner"
		/>
		<textarea
			aria-label="message input"
			class="input-box"
			:class="{ 'read-only': !hasPartner }"
			v-model="inputBuffer"
			@keyup.enter="sendMessage"
			:readonly="!hasPartner"
		/>
	</div>
</template>

<script>
import { nanoid } from 'nanoid'

import ChatWindow from '@/components/ChatWindow'
import { Client, CLIENT_EVENTS } from '@/service/ChatService'

export default {
	name: 'Discuss',
	components: {
		ChatWindow
	},
	data: () => ({
		client: null,
		subject: '',
		inputBuffer: '',
		message_events: [],
		hasPartner: false
	}),
	methods: {
		sendMessage() {
			const message = this.inputBuffer + ''

			this.inputBuffer = ''

			this.message_events.push({
				id: nanoid(),
				from: this.client.id,
				message
			})

			this.client.sendChatMessage({ message })
		},
		generateSystemMessage(message) {
			this.message_events.push({
				id: nanoid(),
				from: 'system',
				message
			})
		}
	},
	created() {
		this.client = new Client()
		this.client.subject = sanitize(this.$route.query.subject)

		this.client.on(CLIENT_EVENTS.MESSAGE, event => {
			this.message_events.push({ ...event, id: nanoid() })
		})

		this.client.on(CLIENT_EVENTS.PARTNER_CONNECT, () => {
			this.generateSystemMessage('A partner has arrived 😁')
			this.hasPartner = true
		})
		this.client.on(CLIENT_EVENTS.PARTNER_DISCONNECT, () => {
			this.generateSystemMessage('A partner has left 🧐')
		})
	},
	mounted() {
		document.title = `Discussing ${this.client.subject}`

		this.client.connect(process.env.VUE_APP_CHATSERVER_URL)

		this.generateSystemMessage(
			`Looking for a partner to discuss ${this.client.subject}`
		)
	}
}

function sanitize(text) {
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

	@media only screen and (max-width: 600px) {
		justify-content: flex-start;
	}
}

.ChatWindow {
	height: 50%;
	width: 50%;

	margin-bottom: 1em;

	@media only screen and (max-width: 600px) {
		height: 95%;
		width: 100%;
		padding: 1em 0.5em 0.5em 0.5em;

		margin: 0;
	}
}

.input-box {
	height: 96px;
	width: 50%;

	padding: 1em;

	border: 2px solid $primary-color;

	resize: none;

	@media only screen and (max-width: 600px) {
		width: 100%;
		border: 0;
	}
}

.read-only {
	background-color: #ebebeb;
}
</style>
