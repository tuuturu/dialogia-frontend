<template>
	<div class="chat">
		<h1>Chat page</h1>
		Nick: <input type="text" id="nick" disabled /><br />
		Subject:
		<input
			type="text"
			id="subject"
			:value="subject"
		/>

		<h2>Send message</h2>

		<input type="text" id="sendMessageText" />
		<input type="button" id="sendButton" value="Send" onclick="sendMessage()" />

		<h2>Messages</h2>
		<textarea id="chatWindow" readonly></textarea>
	</div>
</template>

<script>
export default {
	name: 'Discuss',
	components: {},
	//data: () => ({ subject: sanitize(this.$route.query.subject) }),
	computed: {
		subject: sanitize(this.$route.query.subject)
	},
	async mounted() {
	}
}

function sanitize(text) {
	console.log("sanitize")
	return text
}

</script>

<style>
input[type='text'] {
	width: 500px;
}

textarea {
	-webkit-transition: all 0.3s ease-in-out;
	-moz-transition: all 0.3s ease-in-out;
	-ms-transition: all 0.3s ease-in-out;
	-o-transition: all 0.3s ease-in-out;
	outline: none;
	padding: 3px 0px 3px 3px;
	margin: 5px 1px 3px 0px;
	border: 1px solid #dddddd;
	width: 60%;
	height: 20%;
}
</style>
