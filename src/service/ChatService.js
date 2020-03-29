const defaultOptions = {
	nick: 'partner'
}

export class Client {
	constructor(options = {}) {
		const actualOptions = Object.assign(defaultOptions, options)

		this.websocket = null
		this.nick = actualOptions.nick

		this.handlers = {}
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

			this.emit('error', error)
		}

		this.websocket.onopen = () => {
			console.log('WebSocket connection established')
			const clientInfo = {
				type: 'register',
				clientName: this.nick
			}

			this.sendToServer(clientInfo)
			this.emit('connect')
		}

		this.websocket.onclose = () => {
			console.debug('WebSocket connection closed')
			this.websocket = null
		}

		this.websocket.onmessage = event => {
			console.debug('Receive message:', event.data)

			const serverEvent = JSON.parse(event.data)

			this.emit('message', serverEvent)
		}
	}

	sendToServer(clientEvent) {
		console.debug('Sending', clientEvent)

		this.websocket.send(JSON.stringify(clientEvent))
	}
}
