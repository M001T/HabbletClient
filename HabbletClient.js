const WebSocket = require("ws");
const ByteBuffer = require("./ByteBuffer");
const Parser = require("./Parser");
const OutgoingHeaders = require("./OutgoingHeaders");
const IncomingHeaders = require("./IncomingHeaders");
const Incoming = require("./packets/incoming/Incoming");
const RoomEnterComposer = require("./packets/outgoing/RoomEnterComposer");
const {EventEmitter} = require("events");

let pattern = "{c*:version,c*:type,i:unknown1,i:unknown2}";
Parser.RegisterPattern(pattern, OutgoingHeaders.RELEASE_VERSION);
pattern = "{c*:unknown,c*:id}";
Parser.RegisterPattern(pattern, OutgoingHeaders.MACHINE_ID);
pattern = "{c*:ssoTicket,i:unknown}";
Parser.RegisterPattern(pattern, OutgoingHeaders.SECURE_LOGIN);

Incoming.RegisterPackets();

class HabbletClient extends EventEmitter {

	Connection;

	constructor(ssoTicket){
		super();

		this.Connection = new WebSocket("wss://proxy.habblet.com.br:2083/", {
			origin: "https://www.habblet.city"
		});

		this.Connection.on("open", () => {
			console.log("[info]: Sending release...")
			this.Connection.send(Parser.Encode([
				"PRODUCTION-202101271337-HTML5",
				"HTML5",
				2,
				1
			], OutgoingHeaders.RELEASE_VERSION).compose());

			console.log("[info]: Sending machine-id...")
			this.Connection.send(Parser.Encode([
				"",
				"HWID-2175538651",
			], OutgoingHeaders.MACHINE_ID).compose());

			console.log("[info]: Sending sso ticket...")
			this.Connection.send(Parser.Encode([
				ssoTicket,
				0x00008882,
			], OutgoingHeaders.SECURE_LOGIN).compose());
		});

		this.Connection.on("message", message => {
			let data = new ByteBuffer(message);

			// let length = data.readInt();
			// let header = data.readShort();

			let check = Incoming.Parse(data, this);

			if(!check.success)
				console.log(`[Unknown Packet]: ${check.header}`);
		});

		this.Connection.on("close", () => {
			console.log("Closed.")
		});

	}

	EnterRoom(roomId){
		this.Connection.send(new RoomEnterComposer(roomId).compose());
	}

}

module.exports = HabbletClient;