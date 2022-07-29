// Here we setup our server connecting our whatsapp web chatbot server to whatsapp through QR code
const { Client, LocalAuth } = require("whatsapp-web.js")
const qrcode = require("qrcode-terminal") // ->To display the actual QR code in the terminal and not the textual form

// To ensure our session continues affter we restart the server
const client = new Client({
	authStrategy: new LocalAuth(),
})

// Starting a new session i.e connecting to whatsapp for the first time
// QR code is generated on the terminal to be scanned on your whatsapp account.
client.on("qr", (qr) => {
	qrcode.generate(qr, { small: true })
})
// After the QR code and the whatsapp account is linked this is displayed to notify success
client.on("ready", () => {
	console.log("Client is ready!")

	// To send a message to a specific chat.
	client.getChats().then((chats) => {
		// Finding the chat we intend to send a message to
		const botChat = chats.find((chat) => chat.name === "Whatsapp Automation bot")
		// We send  message to the group specifying the chat's id and the message
		client.sendMessage(
			botChat.id._serialized,
			"Hello, This is an Automated message"
		)
        console.log('Message sent') 

		// To schedule a message
		console.log('Message scheduled')
		setTimeout(() => {
		    client.sendMessage(botChat.id._serialized, "From Your baby's code, Tell your proud bum bum i said Hi")
		}, 20000); // -> 20000 here indicates After 20 seconds
	})
})

/**Configuring Automated responses
 * The client listens to a message event, contanined n this event is the body which contains the actual text.
 * Responses can then be configured for the text recieved with an if condition. */ 

client.on('message', message => {
	if(message.body === 'Hey') {
		message.reply(`Hello, Welcome to this Services, How can i help you`);
	}
});

client.initialize()
