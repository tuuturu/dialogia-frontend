import { nanoid } from 'nanoid'

export const CLIENT_EVENTS = Object.freeze({
	CONNECT: 'connect',
	ERROR: 'error',
	MESSAGE: 'message'
})

const defaultOptions = {
	nick: 'partner'
}

export class Client {
	constructor(options = {}) {
		const actualOptions = Object.assign(defaultOptions, options)

		this.websocket = null
		this.nick = actualOptions.nick

		this.handlers = {}
		this.localMessageIds = {}
	}

	__sendToServer(clientEvent) {
		console.log('Sending', clientEvent)

		this.websocket.send(JSON.stringify(clientEvent))
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
			console.error('WebSocket error')

			this.emit(CLIENT_EVENTS.ERROR, error)
		}

		this.websocket.onopen = () => {
			console.log('WebSocket connection established')
			const clientInfo = {
				type: 'register',
				clientName: this.nick
			}

			this.__sendToServer(clientInfo)
			this.emit(CLIENT_EVENTS.CONNECT)
		}

		this.websocket.onclose = () => {
			console.debug('WebSocket connection closed')
			this.websocket = null
		}

		this.websocket.onmessage = event => {
			console.log('Receive message:', event.data)

			const serverEvent = JSON.parse(event.data)

			this.emit(CLIENT_EVENTS.MESSAGE, serverEvent)
		}
	}

	sendChatMessage({ message }) {
		const id = nanoid()

		this.localMessageIds[id] = true

		const clientEvent = {
			type: 'message',
			id,
			message
		}

		this.__sendToServer(clientEvent)
	}
}
