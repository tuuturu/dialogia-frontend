import { nanoid } from 'nanoid'

export const CLIENT_EVENTS = Object.freeze({
	// From server
	CONNECT: 'connect',
	ERROR: 'error',
	MESSAGE: 'message',
	PARTICIPANT_COUNT: 'participantCount',

	// Local only
	PARTNER_CONNECT: 'partnerConnected',
	PARTNER_DISCONNECT: 'partnerDisconnected'
})

const defaultOptions = Object.freeze({
	nick: 'Anonymous',
	subject: 'anything'
})

export class Client {
	constructor(options = {}) {
		const actualOptions = Object.assign(defaultOptions, options)

		this.websocket = null
		this.id = nanoid()
		this.nick = actualOptions.nick
		this.subject = actualOptions.subject
		this.participantCount = 0

		this.handlers = {}
	}

	__sendToServer(clientEvent) {
		this.websocket.send(JSON.stringify(clientEvent))
	}

	__participantCountChange(newValue, oldValue) {
		console.log('Found participant change: ', newValue, oldValue)
		if (oldValue === 0 && newValue === 1) return

		if (newValue > oldValue) this.emit(CLIENT_EVENTS.PARTNER_CONNECT)
		else if (newValue < oldValue) this.emit(CLIENT_EVENTS.PARTNER_DISCONNECT)
	}

	on(event_name, handler) {
		if (!this.handlers[event_name]) this.handlers[event_name] = []

		this.handlers[event_name].push(handler)
	}
	emit(event_name, args) {
		if (!this.handlers[event_name] || this.handlers[event_name].length === 0)
			return

		this.handlers[event_name].map(handler => handler(args))
	}

	connect(url) {
		this.websocket = new WebSocket(url)

		this.websocket.onerror = error => {
			this.emit(CLIENT_EVENTS.ERROR, error)
		}

		this.websocket.onopen = () => {
			const clientInfo = {
				type: 'register',
				clientName: this.id,
				subject: this.subject,
				nick: this.nick
			}

			this.__sendToServer(clientInfo)

			this.emit(CLIENT_EVENTS.CONNECT)
			this.emit(CLIENT_EVENTS.PARTNER_CONNECT)
		}

		this.websocket.onclose = () => {
			this.websocket = null
		}

		this.websocket.onmessage = event => {
			const serverEvent = JSON.parse(event.data)

			switch (serverEvent.type) {
				case CLIENT_EVENTS.PARTICIPANT_COUNT:
					this.__participantCountChange(
						serverEvent.count,
						this.participantCount
					)
					this.participantCount = serverEvent.count
					break
				case CLIENT_EVENTS.MESSAGE:
					this.emit(CLIENT_EVENTS.MESSAGE, serverEvent)
					break
			}
		}
	}

	sendChatMessage({ message }) {
		const clientEvent = {
			type: 'message',
			message
		}

		this.__sendToServer(clientEvent)
	}
}
