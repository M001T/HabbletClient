let ByteBuffer = require("../../ByteBuffer")
let OutgoingHeaders = require("../../OutgoingHeaders")

class RoomEnterComposer extends ByteBuffer {

	constructor(roomId, password){
		super();

		this.writeShort(OutgoingHeaders.ROOM_ENTER);
		this.writeInt(roomId);
		this.writeString(password);

	}



}

module.exports = RoomEnterComposer;