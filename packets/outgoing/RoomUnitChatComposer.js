let ByteBuffer = require("../../ByteBuffer");
let OutgoingHeaders = require("../../OutgoingHeaders");

class RoomUnitChatComposer extends ByteBuffer {

	constructor(message, bubbleId=0){
		super();

		this.writeShort(OutgoingHeaders.UNIT_CHAT);
		this.writeString(message);
		this.writeInt(bubbleId);

	}

}

module.exports = RoomUnitChatComposer;